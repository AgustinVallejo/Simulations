/**
 * STELLAR EVOLUTION MODEL
 * Agustin Vallejo
 * 2022
 * 
 */


let stars = new Stars(); // Class that manages the list of stars
let shaded = true;
let t = 0; // Time
let T = 500; // Reference halflife
let dt = 0.5; 
let play = true; // Animation is playing
let hovering = false; // Mouse is hovering a button
let clicked = false;
let showFlags = false;
let showHR = false;
let autoEvolve = false;

const CREATED_STARS = 20; // Max number of stars that may appear when clicked
const MAX_STAR_COUNT = 500; // Max number of stars
const minMass = 10/CREATED_STARS; // Minimum star mass

let HR; // HR Diagram variable

function preload(){
  // Preload the shaders
  theShader = new p5.Shader(this.renderer, vertShader, fragShader);
  cloudShader = new p5.Shader(this.renderer, cloudVertShader, cloudFragShader);
}

function setup() {
  // Create main canvas and shader canvas
  let canvas = createCanvas(windowWidth*0.7, windowHeight*0.8);
  cloudCanvas = createGraphics(width, height, WEBGL);
  canvas2 = createGraphics(width, height, WEBGL);
  canvas.parent("game")
  noStroke();
  // Define HR variable as a Graph
  HR = new Graph(0.27,0.5,"Diagrama HR","+ Temperatura -"," - Luminosidad +");
}

function windowResized(){
  resizeCanvas(windowWidth*0.7, windowHeight*0.8);
  canvas2.resizeCanvas(windowWidth*0.7, windowHeight*0.8);
  cloudCanvas.resizeCanvas(windowWidth*0.7, windowHeight*0.8);
  HR.windowResized();
}

function draw() {
  cursor(ARROW);
  hovering = false;

  stars.move();
  stars.evolve();
  t += dt;
  
  background(0);
  if (shaded){
    // Set general sim uniforms
    theShader.setUniform("u_resolution",[width,height]);
    theShader.setUniform("u_pixelDensity",pixelDensity());
    theShader.setUniform("u_mouse",[mouseX/width, map(mouseY,0,height,1,0)]);
    cloudShader.setUniform("u_resolution",[width,height]);
    cloudShader.setUniform("u_pixelDensity",pixelDensity());
    cloudShader.setUniform("u_time",t/100);
    
    // Send Star data
    let data = serializeSketch()
    theShader.setUniform("u_N",stars.stars.length);
    theShader.setUniform("u_stars",data.stars);
    theShader.setUniform("u_colors",data.colors);

    blendMode( BLEND )

    cloudCanvas.shader(cloudShader);
    cloudCanvas.rect(0,0,width,height);
    image(cloudCanvas,0,0);

    canvas2.shader(theShader);
    canvas2.rect(0,0,width,height);
    image(canvas2,0,0);
    stars.draw();
  }
  else {
    stars.draw();
  }

  // UI
  control_buttons();
  other_buttons();
  if (showHR){
    HR.display();
  }
  clicked = false;
}

function mousePressed(){
  // Create new Stars
  if (!hovering){
    if (stars.stars.length < MAX_STAR_COUNT){
      let N = int(random(1,CREATED_STARS))
      for (let i = 0; i < N; i++){
        stars.push(new Star(mouseX, mouseY, 1/N));
      }
    }
  }
}

function keyPressed(){
  // Press a to toggle shaded mode
  if (key == "a"){
    shaded = !shaded;
  }
  else if (key=="h") {
    showHR = !showHR;
  }
}


function serializeSketch() {
  // Transform data into uniform type information
  data = {"stars": [], "colors": []};
  let STARS = stars.stars;
  
  for (let i = 0; i < STARS.length; i++) {
      data.stars.push(
          map(STARS[i].pos.x, 0, width, 0.0, 1.0), 
          map(STARS[i].pos.y, 0, height, 1.0, 0.0),
          map(STARS[i].r, 0, height*0.5, 0.0, 1.0))

      data.colors.push(
        red(STARS[i].col),
        green(STARS[i].col),
        blue(STARS[i].col),
      )
  }
  
  return data;
}