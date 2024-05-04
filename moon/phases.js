function setup() {
    var canvas = createCanvas(1000, 700);
    canvas.parent("game")
    initializeFields();
    background(0);
    createStars();

    // Cargo la Imagen de la Tierra desde Arriba
    IMG = loadImage("polar.png");
    smooth();

    Rearth = 100;
}

function draw() {
    let angle = set_angle();
    background(0);
    twinklingStars();
    sun();
    earth(t);
    stickman(t, angle);
    moon(angle);
    phases(angle);
    buttons()
    if (play) {
      t++;
    }
}

function phases(a) {
    // Based on the code of https://github.com/Pole11/moon-phases
    let phasex = width/2;
    let phasey = height/2 + 100;
    let Rmoon0 = 100;
    let rotation = 0
    
    push();
    translate(phasex,phasey);

    rectMode(CENTER);
    stroke(150);
    strokeWeight(3);
    fill(0);
    rect(0,0.25*Rmoon0,1.5*Rmoon0,2*Rmoon0,10);
    noStroke();
    
    phaseText(a, Rmoon0);
    
    if (a < -PI) {
      a += 2*PI
    }
    
    if (a > 0) {
      a = map(a,0,PI,-PI,0);
      rotation = 0
    }
    else {
      a = map(a,0,-PI,-PI,0);
      rotation = PI       
    }
    
    //stroke(255,0,255);
    line(phasex, 0, phasex, height);
    
    noStroke();
    let bg_color = color(0,25,25); // Dark side color
    let light_color = color(255,255,255); // Light color
    if (shadowsON && eclipse && moonLoc.x<0 && abs(moonLoc.y) < Rearth/2){
      let r = map(abs(moonLoc.y),0,Rearth/2,100,255)
      light_color = color(255,r,r) // Lunar eclipse color
    }
    
    let color1 = light_color;
    let color2 = light_color;
    let color3 = light_color;
    let color4 = light_color;

    if (-PI/2 < a && a < 0) {
      color1 = light_color;
      color2 = bg_color;
      color3 = light_color;
      color4 = light_color;
    } else if (-PI < a && a < -PI/2) {
      color1 = light_color;
      color2 = bg_color;
      color3 = bg_color;
      color4 = bg_color;
    } else if (-3*PI/2 < a && a < -PI) {
      color1 = bg_color;
      color2 = light_color;
      color3 = bg_color;
      color4 = bg_color;
    } else if (-2*PI < a && a < -3*PI/2) {
      color1 = bg_color;
      color2 = light_color;
      color3 = light_color;
      color4 = color(0,255,0,0);
    }
    
    push();
    rotate(rotation);
    ellipseMode(CENTER);
    fill(color1);
    //let widthMoonPhase = map(Math.sin(a), -1, 1, -Rmoon0, Rmoon0);
    arc(0, 0, Rmoon0, Rmoon0, PI/2, 3 * PI/2);
    fill(color2);
    arc(0, 0, Rmoon0, Rmoon0, 3 * PI/2, PI/2);
    
    let heightPhase = Rmoon0;
    let widthPhase = map(Math.cos(a), 0, 1, 0, Rmoon0);
    
    fill(color3);
    arc(0, 0, widthPhase - 2, heightPhase + 1, PI/2, 3 * PI/2);
    fill(color4);
    arc(0, 0, widthPhase - 2, heightPhase + 1, 3 * PI/2, PI/2);
    pop(); // Pop rotation
    surface(Rmoon0);
    pop();
}

function surface(r) {
  fill(150);
  push();
  blendMode(DARKEST)
  scale(r);
  translate(-0.5,-0.5)
  circle(0.3,0.3,0.4);
  circle(0.5,0.25,0.3);
  circle(0.3,0.55,0.3);
  circle(0.4,0.5,0.3);
  circle(0.3,0.7,0.2);
  circle(0.7,0.3,0.2);
  circle(0.75,0.5,0.2);
  circle(0.9,0.5,0.1);
  circle(0.8,0.6,0.1);
  circle(0.5,0.9,0.1);
  
  fill(255);
  circle(0.4,0.4,0.1);
  
  pop();
}

function phaseText(a, Rmoon0) {
  let phase = ""
  let threshold = 0.75
  if (cos(a) > threshold) {
    phase = "Luna\nNueva"  
  }
  else if (cos(a) < -threshold) {
    phase = "Luna\nLlena"  
  }
  if (sin(a) > threshold) {
    phase = "Luna\nMenguante"  
  }
  else if (sin(a) < -threshold) {
    phase = "Luna\nCreciente"  
  }
  a = 4*a - 3.2*PI/4
  
  textFont('Roboto Slab');
  stroke(255*pow(1-cos(a),3));
  if (shadowsON && eclipse && abs(moonLoc.y) < Rearth/2){
    if (moonLoc.x < 0) {
      stroke(255*pow(1-cos(a),3),0,0);
      phase = "Eclipse\nLunar"  
    }
    else if (moonLoc.x > 0) {
      stroke(255*pow(1-cos(a),3),255*pow(1-cos(a),3),0);
      phase = "Eclipse\nSolar"  
    }
  }
  textAlign(CENTER);
  textSize(25)
  text(phase,0,0.8*Rmoon0);
  noStroke();
}