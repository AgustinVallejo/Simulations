let t0, t, play
let Rearth, Rmoon,Aearth,Amoon, Wearth, Wmoon;
let moonLoc;
let moonOrbit, earthOrbit;
let Rsun,Xsun;

// All simulations variables
let phasesON = false;
let shadowsON = false;
let tidesON = false;
let changing = false;

let eclipse = false;
let clicked = false;
let scenario = 0;

var IMG, font;

function keyPressed(){
    if (key == " "){
        play = !play
    }
}

function initializeFields() {
    // Time variables
    t = 0;
    t0 = 0;
    play = false;

    // Physical Properties
    Rearth = 200;
    Rmoon = 50;
    Rsun = 1.5*width;
    Xsun = 1.2;
    moonOrbit = 300;
    earthOrbit = Xsun*width;

    Aearth = 0
    Amoon = PI/2
    Wearth = PI / 50;
    Wmoon = Wearth / 28;
    moonLoc = createVector(1,0);

    loc = null;
    size = 0;
    col = 0;

    IMG = null;
    font = textFont('Roboto Slab');
}


function earth() {
    if (play) {
        Aearth -= Wearth
    }
    push();
    translate(width / 2, height / 2);
    push();
    // La tierra también rota según t
    rotate(Aearth + 1.2 * PI / 2);
    imageMode(CENTER);

    noStroke();
    fill(100,150,150)
    circle(0,0,Rearth)

    // Dibujo la Tierra
    IMG.resize(width,width);
    scale(Rearth/width);
    tint(200);
    image(IMG, 0, 0);
    pop();
    
    // Órbita Lunar
    noFill();
    stroke(100);
    strokeWeight(1);
    circle(0, 0, 2 * moonOrbit);
    
    pop();
    stickman(t, eyes = 0)
}

function moon(angle) {
    // Pone la Luna en la dirección del Mouse
    // Tamaño de la órbita
    if (play){
        Amoon -= Wmoon
        angle = Amoon
    }
    moonLoc = createVector(1,0);
    moonLoc.setHeading(angle)
    moonLoc.mult(moonOrbit);
    push();
    translate(width / 2, height / 2);
    // Luna y Lado Iluminado
    noStroke();
    fill(255);
    if (shadowsON && eclipse && moonLoc.x<0 && abs(moonLoc.y) < Rearth/2){
        let r = map(abs(moonLoc.y),0,Rearth/2,100,255)
        fill(255,r,r)
      }
    circle(moonLoc.x, moonLoc.y, Rmoon);

    // Lado oscuro
    fill(0,50,50)
    arc(moonLoc.x, moonLoc.y, Rmoon, Rmoon, PI / 2, -PI / 2, CHORD);
    pop();

    // Manchitas

    var moonAngle = moonLoc.heading();
    return moonAngle;
}

function sun() {
    // Pone las flechas y pone el texto
    textSize(32);
    fill(255, 255, 0);
    // text("Al Sol", 0.9 * width, 0.15 * height);
    // Cantidad de flechas
    var n = 8;
    for (var i = 0; i < n; i++) {
        var ypos = map(i, 0, n, 0.2 * height, 0.8 * height);
        stroke(100, 100, 0);
        strokeWeight(10);
        arrow(0.99 * width, ypos, 0.9 * width, ypos);
    }
    noStroke();
    fill(255,255,0);
    circle((0.5+Xsun)*width, height/2, Rsun)
    fill(255,255,200);
    circle((0.5+Xsun)*width, height/2, 0.97*Rsun)
}

function arrow(x1, y1, x2, y2) {
    // Dibuja una Flecha
    line(x1, y1, x2, y2);
    push();
    translate(x2, y2);
    var a = atan2(x1 - x2, y2 - y1);
    rotate(a);
    line(0, 0, -10, -10);
    line(0, 0, 10, -10);
    pop();
}

function stickman(t, eyes = 0) {
    eyes += t*Wmoon;
    // El muñequito y su rotación
    var s = 0.3 * Rearth/100;
    var y = -0.65 * Rearth / s;
    var dEyes = 5;
    push();
    translate(width / 2, height / 2);
    scale(s);
    rotate(Aearth);
    ellipseMode(CENTER);
    stroke(128);
    strokeWeight(10);
    fill(255);
    ellipse(0, -90 + y, 50, 50);
    push();
    translate(dEyes*cos(eyes),dEyes*sin(eyes))
    point(-10, -90 + y);
    point(10, -90 + y);
    pop();
    rectMode(CENTER);
    rect(0, -15 + y, 50, 100);
    line(-25, -65 + y, -50, 10 + y);
    line(25, -65 + y, 50, 10 + y);
    line(-20, 35 + y, -20, 100 + y);
    line(-20, 100 + y, -25, 100 + y);
    line(20, 35 + y, 20, 100 + y);
    line(20, 100 + y, 25, 100 + y);
    fill(200, 200, 255, 100);
    ellipse(0, -95 + y, 80, 80);
    pop();
}