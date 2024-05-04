function preload(){
  theShader = loadShader("main.vert","main.frag");
}

function setup() {
  let canvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
  canvas.parent("game")
  canvas2 = createGraphics(width, height, WEBGL);
}

function draw() {
  // Set general sim uniforms
  theShader.setUniform("u_resolution",[width,height])
  theShader.setUniform("u_pixelDensity",pixelDensity())
  theShader.setUniform("u_mouse",[mouseX/width, map(mouseY,0,height,1,0)])
  
  background(0);
  canvas2.shader(theShader);
  canvas2.rect(0,0,width,height);
  image(canvas2,0,0)
}

function windowResized(){
  resizeCanvas(windowWidth*0.8, windowHeight*0.8);
  canvas2.resizeCanvas(windowWidth*0.8, windowHeight*0.8);
}