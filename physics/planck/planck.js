let N = 200; //Cantidad de puntos en la linea
let xpos;
let col;

let theShader;
let canvas2;

let p1 = 0.2; //Fracción del width donde empieza el visible
let p2 = p1*7.5/3.8; //Fracción del width donde termina el visible
let lfin = 0.38/p1; //Longitud de onda donde termina el gráfico en micrómetros
let dp = p2 - p1; //Ancho del espectro visible
let Temp; //Temperatura inicial
let Tmax = 20000;
let Tmin = 300;
let L;

let frame = 0;

function preload(){
  theShader = loadShader("planck.vert","planck.frag");
}

function setup() {
  let canvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
  canvas.parent("game")
  canvas2 = createGraphics(width, height, WEBGL);

  Temp = 5700;
  L = 1000*2898/Temp; // Longitud de onda

  background(0);
  rainbow();
  go();

  draw_text()
}

function draw_text(){
    fill(255);
    textSize(20);
    stroke(1);
    text("Temperatura", width*0.43, 0.3*height-40); //Pone la Temperatura en Pantalla
    text(int(Temp) + " K", width*0.45, 0.3*height-15); //Pone la Temperatura en Pantalla
    text(int(Temp-273) + "°C", width*0.45, 0.3*height+10); //Pone la Temperatura en Pantalla

    text("Longitud de Onda", width*0.43, 0.3*height+60); //Pone la Longitud de onda Mäxima en Pantalla
    text("λ=" + int(L+200) + " nm", width*0.45, 0.3*height+85); //Pone la Longitud de onda Mäxima en Pantalla
}

function draw() {
  // Set the temperature based on mouse position
  Temp = constrain(map(mouseY,0,height,Tmax,Tmin),Tmin,Tmax);
  L = 1000*2898/Temp;
  
  // Set general sim uniforms
  theShader.setUniform("u_resolution",[width,height])
  theShader.setUniform("u_pixelDensity",pixelDensity())
  theShader.setUniform("u_mouse",[mouseX/width, map(mouseY,0,height,1,0)])
  
  // Set Planck distribution uniforms
  let c1 = I(Temp, (p1*width)); //AZUL
  let c2 = I(Temp, ((p1+dp/2)*width)); //VERDE
  let c3 = I(Temp, (p2*width)); //ROJO
  theShader.setUniform("u_color", [c3, c2, c1])
  
  background(0);
  canvas2.shader(theShader);
  canvas2.rect(0,0,width,height);
  image(canvas2,0,0)

  rainbow();
  go();
  draw_text()

}

function rainbow() { //Dibuja el espectro visible
  colorMode(HSB, 1.5*N, N, N);
  for (let i = 0; i < N; i++) {
    col = color(N-i, N, 0.6*N);
    xpos = map(i, 0, N, p1*width, p2*width);
    stroke(col);
    line(xpos, 0, xpos, height);
  }
}

function star() {
  let thold = 80;
  colorMode(RGB, thold, thold, thold, 2e4);
  let c1 = I(Temp, (p1*width)); //AZUL
  let c2 = I(Temp, ((p1+dp/2)*width)); //VERDE
  let c3 = I(Temp, (p2*width)); //ROJO
  let mx = max(c1, c2, c3);
  c1 = 100*c1/mx;
  c2 = 100*c2/mx;
  c3 = 100*c3/mx;
  col = color(c3, c2, c1, Temp);
  fill(col);
  noStroke();

  let radius = 0.5*height;

  ellipse(0.7*width, 0.3*height, radius, radius);
  ellipse(0.7*width, 0.3*height, 0.9*radius, 0.9*radius);
  ellipse(0.7*width, 0.3*height, 0.8*radius, 0.8*radius);
}

function go() { //Dibuja la función de Planck  
  colorMode(HSB, 1.5*N, N, N);
  let xini = 0;
  let yini = height;

  let ymax = 0;
  let xmax = 0;

  for (let i = 1; i < N; i++) {

    xpos = map(i, 0, N, 0, width);
    let y = I(Temp, xpos);
    let ypos = map(y, 0, 1, height, 0);
    if (y > ymax){
      ymax = y;
      xmax = xpos;
    }

    stroke(N);
    strokeWeight(3);
    line(xini, yini, xpos, ypos);

    xini = xpos;
    yini = ypos;
  }

  if (ymax != 0){
    ymax = map(ymax, 0, 1, height, 0);
  
    line(xmax,ymax - 20, xmax, ymax - 40);
    line(xmax,ymax - 20, xmax - 5, ymax - 25);
    line(xmax,ymax - 20, xmax + 5, ymax - 25);
  }
}

function I(T_, pix_) {
  let T = T_ + 3840;
  let lambda = map(pix_, 0, width, 0, lfin);
  let inn = planck(T, lambda);

  return inn;
}

function planck(T_, lm_) {
  let c = 3e14;
  let h = 6.626e-22;
  let k = 1.38e-11;
  let uno = 2*h*c;
  let dos = pow(lm_, 3);
  let tres = exp((h*c)/(k*T_*lm_))-1;

  return 1e6*uno/(dos*tres);
}

function windowResized(){
  resizeCanvas(windowWidth*0.8, windowHeight*0.8);
  canvas2.resizeCanvas(windowWidth*0.8, windowHeight*0.8);
}