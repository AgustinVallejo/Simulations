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
  colorMode(RGB,255);
  fill(50);
  stroke(200);
  strokeWeight(2);
  strokeJoin(ROUND);
  rectMode(CORNERS)

  let w = 40; //px, width of the button
  let dx = width*0.01;
  let x0 = width*0.25-2*w-dx;
  let y0 = 0.99*height - w;
  
  play_button (x0 + 0*(w + dx), y0, w);
  pause_button(x0 + 1*(w + dx), y0, w);
  slower      (x0 + 2*(w + dx), y0, w);
  faster      (x0 + 3*(w + dx), y0, w);

  textSize(14)
  noStroke();
  fill(255)
  text(int(30*t / 1000) + " mil millones de años", x0, y0 - 10)
  colorMode(RGB,1);

}

function other_buttons(){
  colorMode(RGB,255);
  fill(50);
  stroke(200);
  strokeWeight(2);
  strokeJoin(ROUND);
  rectMode(CORNERS)

  let w = 40; //px, width of the button
  let dx = width*0.01;
  let x0 = width*0.75-2*w-dx;
  let y0 = 0.99*height - w;

  flag_button(x0,y0,w);
  hr_button(x0 + w + dx, y0, w);
  shaded_button(x0 + 2*(w + dx), y0, w);
  autoEvolve_button(x0 + 3*(w + dx), y0, w);
  colorMode(RGB,1);
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

function flag_button(x0,y0,w){
  // Draw Button
  push();
  translate(x0,y0);
  rect(0,0,w,w,5)
  scale(w);
  strokeWeight(2/w)
  if (showFlags) {
      fill(255);
  }
  triangle(0.2,0.2,0.8,0.35,0.2,0.5)
  line(0.2,0.2,0.2,0.8)
  pop();

  if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
      cursor(HAND);
      hovering = true;
      if (showFlags) {
        fill(255);
        message("Apagar Etiquetas")
      }
      else{
        message("Encender Etiquetas")
      }
      if (clicked) {
        showFlags = !showFlags;
      }
  }
}

function hr_button(x0,y0,w){
  // Draw Button
  push();
  translate(x0,y0);
  rect(0,0,w,w,5)
  scale(w);
  strokeWeight(2/w)
  if (showHR) {
      fill(255);
  }
  textSize(20/w)
  textAlign(CENTER,CENTER)
  text("HR",0.5,0.5)
  pop();

  if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
      cursor(HAND);
      hovering = true;
      if (showHR) {
        message("Apagar diagrama HR")
      }
      else{
        message("Encender diagrama HR")
      }
      if (clicked) {
        showHR = !showHR;
      }
  }
}

function shaded_button(x0,y0,w){
  // Draw Button
  push();
  translate(x0,y0);
  rect(0,0,w,w,5)
  scale(w);
  strokeWeight(2/w)
  if (shaded) {
      fill(255);
  }
  star(0.5, 0.5, 0.3, 0.1, 4);
  pop();

  if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
      cursor(HAND);
      hovering = true;
      if (shaded) {
        message("Apagar brillo")
      }
      else{
        message("Encender brillo (Puede bajar rendimiento)")
      }
      if (clicked) {
        shaded = !shaded;
      }
  }
}

function autoEvolve_button(x0,y0,w){
  // Draw Button
  push();
  translate(x0,y0);
  rect(0,0,w,w,5)
  scale(w);
  strokeWeight(2/w)
  if (autoEvolve) {
    fill(255)
    circle(0.5,0.57,0.2)
  }
  line(0.2,0.8,0.4,0.3)
  line(0.5,0.2,0.8,0.65)
  line(0.8,0.8,0.35,0.8)
  line(0.4,0.3, 0.2,0.4)
  line(0.8,0.65,0.85,0.45)
  line(0.35,0.8,0.45,0.9)
  pop();

  if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
      cursor(HAND);
      hovering = true;
      if (autoEvolve) {
        message("Evolución manual")
      }
      else{
        message("Evolución automática")
      }
      if (clicked) {
        autoEvolve = !autoEvolve;
      }
  }
}

function star(x, y, radius1, radius2, npoints) {
  angle = TWO_PI / npoints;
  halfAngle = angle/2.0;
	da = PI/4 //0.001*mouseX
  beginShape();
  for (a = 0; a < TWO_PI; a += angle) {
    sx = x + cos(a + da) * radius2;
    sy = y + sin(a + da) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle + da) * radius1;
    sy = y + sin(a+halfAngle + da) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}