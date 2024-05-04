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

function other_buttons(){
  let dx = width*0.15;
  let y0 = 0.99*(height) - 40;

  createStars(dx,y0);
  toggleFlags(width-dx,y0);
  colorMode(RGB,1);
}

function createStars(x0,y0){
  let texto = "Crear Estrellas"

  colorMode(RGB,255);
  fill(50);
  stroke(200);
  strokeWeight(2);

  push();
  translate(x0,y0);
  rectMode(CENTER)
  
  textSize( 20 );
  let w = textWidth(texto)*0.7;
  let h = 30 ;

  rect(0, 0, 2*w, 2*h, 5)
  textAlign(CENTER, CENTER);
  fill(150);
  noStroke();


  if (((x0 - w < mouseX) && (mouseX < x0 + w)) && ((y0 - h < mouseY) && (mouseY < y0 + h))) {
    cursor(HAND);
    hovering = true;
    if (clicked) {
      if (stars.stars.length < MAX_STAR_COUNT){
        let N = int(random(1,CREATED_STARS))
        let origin = createVector(width*(0.5 + random(-0.3,0.3)), height*(0.5 + random(-0.3,0.3)));
        for (let i = 0; i < N; i++){
          stars.push(new Star(origin.x, origin.y, 1/N));
        }
      }
    }
    if (mouseIsPressed) {
      fill(255)       
    }
  }
  text(texto,0,0);

  pop();
}

function toggleFlags(x0,y0){
  let texto = "Etiquetas"

  colorMode(RGB,255);
  fill(50);
  stroke(200);
  strokeWeight(2);

  push();
  translate(x0,y0);
  rectMode(CENTER)
  
  textSize(20);
  let w = textWidth(texto)*0.7;
  let h = 30;

  rect(0, 0, 2*w, 2*h, 5)
  textAlign(CENTER, CENTER);

  fill(150);
  noStroke();
  if (showFlags) {
    fill(255)
  }
  text(texto,0,0);

  pop();

  if (((x0 - w < mouseX) && (mouseX < x0 + w)) && ((y0 - h < mouseY) && (mouseY < y0 + h))) {
    cursor(HAND);
    hovering = true;
    if (showFlags) {
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
