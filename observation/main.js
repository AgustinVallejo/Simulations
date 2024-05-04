let t0 = 0
let y0 = 0;
let Wsky;
let Xpos
let H;
let atmosphereON = true
let equatorialON = false
let phi = 45
let play = false
let clicked = false


function initializeFields(){
    Xpos = 0.1*width
    Wsky = 2*PI*1e-4; // Sky Angular motion
    H = 2*PI; // Sky position angle
    map(dec,0,90,height*0.7,0,true);
    textFont('Roboto Slab')

}

function keyPressed(){
    if (key == " "){
        play = !play
    }
    if (keyCode == ENTER) {
        equatorialON = !equatorialON
    }
    if (key == "a"){
        atmosphereON = !atmosphereON
    }
}

function guide(){
    stroke(255,0,0,100)
    strokeCap(SQUARE);
    strokeWeight(10)
    noFill();

    if (!equatorialON){
        line(0,py,px-R,py)
        line(px+R,py,width,py)
        line(px,0,px,py-R)
        line(px,py+R,px,height)
    }
    else{
        push()
        translate(width/2, y0)
        let v = createVector(px,py)
        if (r>R){
            arc(0,0, 2*r, 2*r,ra*kra+R/r,ra*kra-R/r)
            line(10*cos(ra*kra),10*sin(ra*kra),(r-R)*cos(ra*kra),(r-R)*sin(ra*kra));
        }
        line((r+R)*cos(ra*kra),(r+R)*sin(ra*kra),width*cos(ra*kra),width*sin(ra*kra));
        pop();
    }
    strokeCap(ROUND);

}

function mountains(){
    fill(0);
    noStroke();
    beginShape();
    vertex(0,height);
    let N = 1000; // Number of horizontal points
    for (let n = 0; n <= N; n++){
        let x = n*width/N
        vertex(x,0.6*height + 120*noise(n/100));
    }
    vertex(width,height);
    endShape(CLOSE);
}

function foreground(){
    fill(10,20,10);
    noStroke();
    let y = 0.8*height
    rect(0,y,width,height)

    fill(80,100,80)
    textSize(50)
    textAlign(CENTER)
    text("N",0.5*width,y)
    text("E",0.95*width,y)
    text("W",0.05*width,y)

}


function stickman(eyes = 0) {
    // El muñequito y su rotación
    var y = 0.8  * height;
    var dEyes = 5;
    push();
    translate(Xpos,y)
    scale(0.5);
    ellipseMode(CENTER);
    stroke(128);
    strokeWeight(10);
    fill(255);
    ellipse(0, -90, 50, 50);
    push();
    translate(dEyes*cos(eyes),dEyes*sin(eyes))
    point(-10, -90);
    point(10, -90);
    pop();
    rectMode(CENTER);
    rect(0, -15, 50, 100);
    line(-25, -65, -50, 10);
    line(25, -65, 50, 10);
    line(-20, 35, -20, 100);
    line(-20, 100, -25, 100);
    line(20, 35, 20, 100);
    line(20, 100, 25, 100);
    fill(200, 200, 255, 100);
    ellipse(0, -95, 80, 80);
    pop();
}