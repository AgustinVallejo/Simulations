function mouseClicked(){
  clicked = true
}

function message(msg) {
  let middle = createVector(width/2,height/2)
  let mouse = createVector(mouseX,mouseY)
  
  let head = p5.Vector.sub(mouse, middle)
  head.mult(0.9)
  head.add(middle)
  
  fill(255)
  stroke(0)
  textAlign(LEFT)
  textSize(15);
  let w = textWidth(msg)
  rect(head.x-10,head.y-20,head.x+w+10,head.y+10)
  noStroke()
  fill(0);
  text(msg,head.x,head.y)
  fill(50);
  stroke(200);

}

function control_buttons(){
  
  let w = 40; //px, width of the button
  let dx = width*0.01;
  let x0 = width*0.5 - w;
  let y0 = 0.99*height - w;

  colorMode(RGB,255);
  textSize(14)
  noStroke();
  fill(255)
  text(int(30*t / 1000) + " mil millones de años", x0, y0 - 10)

  fill(50);
  stroke(200);
  strokeWeight(2);
  strokeJoin(ROUND);
  rectMode(CORNERS)
  
  reset_button(x0 - 1*(w + dx), y0, w);
  play_button (x0 + 0*(w + dx), y0, w);
  pause_button(x0 + 1*(w + dx), y0, w);
  slower      (x0 + 2*(w + dx), y0, w);
  faster      (x0 + 3*(w + dx), y0, w);

  colorMode(RGB,1);
}

function reset_button(x0,y0,w){
  push();
  translate(x0,y0);
  rect(0,0,w,w,5)
  scale(w);
  strokeWeight(2/w)

  translate(0.5,0.5)
  rotate(-PI/2 )
  let r = 0.3;
  let th = 0.2*PI;
  arc(0,0,2*r,2*r,th,-th,OPEN)
  line(r*cos(th),r*sin(th),1.5*r*cos(th+0.4),1.5*r*sin(th+0.4))
  line(r*cos(th),r*sin(th),0.5*r*cos(th+0.4),0.5*r*sin(th+0.4))

  pop();

  if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
      cursor(HAND);
      hovering = true;
      message("Reset")
      if (clicked) {
        play = true;
        t = 0;
        stars.stars = [];
        stars.supernovae = [];
        stars.blackHoles = [];
      }
  }
}

function play_button(x0,y0,w){
  // Draw Button
  push();
  translate(x0,y0);
  rect(0,0,w,w,5)
  scale(w);
  strokeWeight(2/w)
  if (play) {
      fill(255);
  }
  triangle(0.2,0.2,0.8,0.5,0.2,0.8)
  pop();

  if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
      cursor(HAND);
      hovering = true;
      message("Play")
      if (clicked) {
        play = true;
        dt = 1;
      }
  }
}

function pause_button(x0,y0,w){
  // Draw Button
  push();
  translate(x0,y0);
  rect(0,0,w,w,5)
  scale(w);
  strokeWeight(2/w)
  if (!play) {
      fill(255);
  }
  rect(0.2,0.2,0.4,0.8)
  rect(0.6,0.2,0.8,0.8)
  pop();

  if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
      cursor(HAND);
      hovering = true;
      message("Pause")
      if (clicked) {
        play = false;
        dt = 0;
      }
  }
}

function slower(x0,y0,w) {
  // Draw Button
  push();
  translate(x0,y0);
  rect(0,0,w,w,5);
  scale(w);
  strokeWeight(2/w)

  beginShape();
  vertex(0.5, 0.2);
  vertex(0.2, 0.5);
  vertex(0.5, 0.8);
  endShape();

  beginShape();
  vertex(0.7, 0.2);
  vertex(0.4, 0.5);
  vertex(0.7, 0.8);
  endShape();

  pop();

  if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
      cursor(HAND);
      hovering = true;
      message("Lento")
      if (clicked) {
        dt /= 2;
      }
  }
}

function faster(x0,y0,w) {
  // Draw Button
  push();
  translate(x0,y0);
  rect(0,0,w,w,5);
  scale(w);
  strokeWeight(2/w)
  noFill()

  beginShape();
  vertex(0.3, 0.2);
  vertex(0.6, 0.5);
  vertex(0.3, 0.8);
  endShape();

  beginShape();
  vertex(0.5, 0.2);
  vertex(0.8, 0.5);
  vertex(0.5, 0.8);
  endShape();
  pop();

  if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
      cursor(HAND);
      hovering = true;
      message("Rápido")
      if (clicked) {
        dt *= 2;
      }
  }
}