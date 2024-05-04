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

function coordinates(){
    fill(50);
    stroke(200);
    strokeWeight(2);
    strokeJoin(ROUND);
    rectMode(CORNERS)
    rect(0.01*width, 0.02*height, 250, 120,10)


    fill(255)
    noStroke()
    textSize(30);
    textAlign(LEFT);
    text("Coordenadas",0.015*width,0.07*height)
    textSize(20);
    if (!equatorialON){
        text("Acimut: "+az+"°\nAltura: "+h+"°",0.02*width,0.07*height + 30)
    }
    else{
        let dth = 0
        if (ra*kra - H < 0){dth = 2*PI}
        let raa = floor(map(ra*kra - H + dth,0,2*PI,0,360))
        text("Ascención Recta: "+raa+"°\nDeclinación: "+dec+"°",0.02*width,0.07*height + 30)
    }
}

function control_buttons(){
    fill(50);
    stroke(200);
    strokeWeight(2);
    strokeJoin(ROUND);
    rectMode(CORNERS)

    let w = 40; //px, width of the button
    let dx = width*0.01;
    let x0 = width*0.5-2*w-dx;
    let y0 = 0.99*height - w;

    play_button(x0,y0,w);
    pause_button(x0 + w + dx, y0, w);
    slower(x0 + 2*(w + dx), y0, w);
    faster(x0 + 3*(w + dx), y0, w);
}

function latitude_buttons() {
    fill(50);
    stroke(200);
    strokeWeight(2);
    strokeJoin(ROUND);
    rectMode(CORNERS)

    let w = 40; //px, width of the button
    let dx = width*0.01;
    let x0 = width*0.01;
    let y0 = 0.5*height - 2*w - dx;

    plus(x0,y0,w);
    zero(x0, y0 + w + dx, w);
    minus(x0, y0 + 2*(w + dx), w);
    
    fill(255);
    textSize(30);
    textAlign(LEFT);
    text("Latitud:",x0,y0 - 2*w + dx)
    text(phi+"°N",x0,y0 - w + dx)
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
        message("Play")
        if (clicked) {
            play = true;
            Wsky = 2*PI*1e-4;
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
        message("Pause")
        if (clicked) {
            play = false;
            // t = 0;
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
    vertex(0.4, 0.2);
    vertex(0.7, 0.5);
    vertex(0.4, 0.8);
    endShape();
    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        message("Lento")
        if (clicked) {
            Wsky /= 1.5;
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
        message("Rápido")
        if (clicked) {
            Wsky *= 1.5;
        }
    }
}

function plus(x0,y0,w){
    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    scale(w);

    strokeWeight(5/w)
    line(0.5,0.2,0.5,0.8)
    line(0.2,0.5,0.8,0.5)

    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        message("Aumentar Latitud")
        if (clicked&&(phi<90)) {
            phi += 15;
        }
    }
    stroke(200);
    strokeWeight(2);

}
function zero(x0,y0,w){
    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    scale(w);

    strokeWeight(5/w)
    noFill()
    ellipse(0.5, 0.5, 0.4, 0.6)

    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        message("Latitud 0°")
        if (clicked) {
            phi = 0;
        }
    }
    stroke(200);
    strokeWeight(2);

}

function minus(x0,y0,w){

    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    scale(w);

    strokeWeight(5/w)
    line(0.2,0.5,0.8,0.5)

    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        message("Disminuir latitud")
        if (clicked&&(phi>0)) {
            phi -= 15;
        }
    }
    stroke(200);
    strokeWeight(2);
}


function inclination(x0,y0,w, h){
    stroke(200);
    strokeWeight(2);
    push();
    translate(x0,y0);
    rect(0,0,w,h,5)
    strokeWeight(0.01)
    scale(w);

    let dth = 0

    switch (scenario){
        case 0:
            dth = PI/2
            break;
        case 1:
            dth = PI
            break;
        case 2:
            dth = 0
            break;
    }

    if (sin(Amoon) > 0){
        noStroke()
        fill(100,150,150)
        circle(0.5,(h/w)*0.5,30/w)
        fill(200)
        circle(0.5 + 0.4*cos(Amoon),(h/w)*(0.5 +  0.4*cos(-Amoon + dth)*sin(PI/5)),15/w)
        noFill();
    }
    else {
        noStroke()
        fill(200)
        circle(0.5 + 0.4*cos(Amoon),(h/w)*(0.5 +  0.4*cos(-Amoon + dth)*sin(PI/5)),15/w)
        fill(100,150,150)
        circle(0.5,(h/w)*0.5,30/w)
        noFill();
    }
    
    stroke(255)
    strokeWeight(1/w)
    beginShape();
    for (let n = 0; n < 50; n++){
        th = n*2*PI/50
        vertex(0.5 + 0.4*cos(th),(h/w)*(0.5 +  0.4*cos(th+dth)*sin(PI/5)))
    }
    endShape(CLOSE);
    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + h))) {
        cursor(HAND);
        message("Cambiar inclinación")
        if (clicked) {
            scenario += 1
            if (scenario == 2) {
                scenario = -1
            }
        }
    }

}