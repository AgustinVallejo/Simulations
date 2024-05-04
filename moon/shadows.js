big = true;
changing = false;
ts = 0;
TS = 100;

function earth_shadow() {
  noStroke();
  fill(0,200);
  rectMode(CENTER);
  rect(0,height/2,width,Rearth)
}

function moon_shadow() {
  noStroke();
  fill(0,200);
  if (eclipse && moonLoc.x>0 && abs(moonLoc.y) < Rearth){
    push();
    translate(width/2,height/2)
    beginShape();
    vertex(moonLoc.x,moonLoc.y-Rmoon/2)
    for (let n=0 ; n<50 ; n++){
      let y = map(n,0,50,-Rmoon/2,Rmoon/2)
      if (abs(moonLoc.y+y)<Rearth/2) {
        let th = map((moonLoc.y+y), -Rearth/2, Rearth/2, -PI/2, PI/2)
        vertex(0.25*Rearth*cos(th),moonLoc.y+y)
      }
      else {
        vertex(-width/2,moonLoc.y+y)
      }
    }
    vertex(moonLoc.x,moonLoc.y+Rmoon/2)
    endShape();
    pop();
  }
  else{
    rectMode(CENTER);
    rect(moonLoc.x,moonLoc.y+height/2,width,Rmoon)
  }
}

function sideview() {
  stroke(200);
  fill(20);
  rectMode(CORNER)
  rect(width/2+50,0.8*height,0.8*width/2,0.15*height)

  translate(50 + 0.7*width,0.87*height)
  let N = 50;
  let R = 150
  noFill();
  beginShape();
  for (let n = 0; n < N; n++){
    let th = n*2*PI/N
    vertex(R*cos(th),R*cos(th+t/100)*sin(10*PI/180))
  }
  endShape(CLOSE);
}