class Graph{
  constructor(y0,h,TITLE="",XLABEL="",YLABEL=""){
    this.h = h*height; // Relative height (and width)
    this.x0 = 0.6*this.h;
    this.y0 = 0.6*this.h - 10; // Relative vertical position

    // Text
    this.title = TITLE;
    this.xlabel = XLABEL;
    this.ylabel = YLABEL;

    // Mouse dragging offset
    this.dx = 0;
    this.dy = 0;

    this.moving = false;
  }

  windowResized() {
    this.x0 = width - 0.6*this.h;
    this.y0 = 0.6*this.h;
  }

  move() {
    if (this.moving) {
      if (mouseIsPressed) {
        cursor(MOVE);
        this.x0 = mouseX - this.dx;
        this.y0 = mouseY - this.dy;
      }
      else {
        this.moving = false;
      }
    }
    else if (((this.x0 - this.h*0.5 < mouseX) && (mouseX < this.x0 + this.h*0.5)) &&
      ((this.y0 - this.h*0.5 < mouseY) && (mouseY < this.y0 + this.h*0.5))) {
      cursor(MOVE);
      if (mouseIsPressed) {
        this.moving = true;
        this.dx = mouseX - this.x0;
        this.dy = mouseY - this.y0;
      }
    }
  }

  draw(){
    this.move();

    rectMode(CENTER);
    push()
    translate(this.x0,this.y0);
    colorMode(RGB,1 );
    strokeWeight(3);
    stroke(0.15);
    fill(0.1);
    rect(0,0,this.h,this.h,50);
    
    noFill();
    stroke(1.0);
    let k = 0.7;
    rect(0,0,this.h*k,this.h*k);

    textAlign(CENTER, CENTER)
    fill(1.0)
    noStroke();
    textSize(25)
    text(this.title,0,-0.6*this.h*k)
    textSize(17)
    text(this.xlabel,0,0.6*this.h*k)

    push()
    rotate(-PI/2)
    text(this.ylabel,0,-0.6*this.h*k)
    pop()

    stroke( 1 )
    strokeWeight( 0.005 );
    scale(this.h*k);
    translate( -0.5, 0.5 );
    const N = 100;
    let dx = 0.0;
    let dy = 0.5;
    const y0 = 0.05;
    noFill();
    beginShape();

    const gaussian = (x, mu, sigma) => {
      return Math.pow( 2, -Math.pow( mu - x, 2) / ( sigma * sigma ) )
    }

    let emisivity = 0.4;
    if (whiteLight){
        emisivity *= 1./3.;
    }

    for (let i = 0; i <= N; i++){
      dx = ( i ) / N;
      dy = whiteLight ? random()*0.02 + 0.5 : y0;

      if ( colorLight ) {
        dy += random()*0.02 + 0.9*(1 - y0)*gaussian( dx, 1 - mainLine, 0.01 );
      }

      [ gasA, gasB ].forEach( (gas) => {
          if (gas.enabled){
            for (let j = 0; j < 3; j++){
              const line = gas.gasLines[j];
              const lineStrength = gas.lineStrength[j];
    
              const lineWidth = 0.015*min(lineStrength,1.);
    
              dy *= 1. - min(1.,lineStrength*gaussian(dx,line,lineWidth));
              dy += emisivity*lineStrength*gaussian(dx,line,2.*lineWidth);
            }
        }
      });

      vertex( dx, -dy );
    }
    endShape();

    pop()
    colorMode(RGB,255);

  }
}