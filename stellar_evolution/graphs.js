class Graph{
  constructor(y0,h,TITLE="",XLABEL="",YLABEL=""){
    this.h = h*height; // Relative height (and width)
    this.x0 = width - 0.6*this.h;
    this.y0 = y0*height; // Relative vertical position

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
      hovering = true;
      if (mouseIsPressed) {
        this.moving = true;
        this.dx = mouseX - this.x0;
        this.dy = mouseY - this.y0;
      }
    }
  }

  display(){
    this.move();

    rectMode(CENTER);
    push()
    translate(this.x0,this.y0);
    // colorMode(RGB,255);
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
    
    k *= 0.4;
    stars.stars.forEach(star => {
      fill(star.col);
      let HR_COLOR = map(blue(star.col)-red(star.col), -1,1, this.h*k,-this.h*k, true) + 100*noise(star.id)/star.r;
      let HR_R = map(log(star.r), log(100),log(3), -this.h*k,this.h*k, true) +  100*noise(star.id*2)/star.r;
      circle(HR_COLOR, HR_R, star.r);      
    });
    pop()

  }
}