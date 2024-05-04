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
    textSize(15);
    let w = textWidth(msg)
    rect(head.x-10,head.y-20,head.x+w+10,head.y+10)
    noStroke()
    fill(0);
    text(msg,head.x,head.y)
    fill(50);
    stroke(200);

}

function buttons() {
    fill(50);
    stroke(200);
    strokeWeight(2);
    strokeJoin(ROUND);
    rectMode(CORNERS)

    let x0 = 0.01*width;
    let y0 = 0.01*height;

    let dx = x0;
    let w = 40; //px, width of the button

    play_button(x0,y0,w);
    mouse_button(x0 + w + dx, y0, w);
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
    mouse_button(x0 + w + dx, y0, w);
    slower(x0 + 2*(w + dx), y0, w);
    faster(x0 + 3*(w + dx), y0, w);
}

function sims_buttons() {
    fill(50);
    stroke(200);
    strokeWeight(2);
    strokeJoin(ROUND);
    rectMode(CORNERS)

    let w = 60; //px, width of the button
    let dx = width*0.01;
    let x0 = width*0.01;
    let y0 = 0.5*height - 2*w - dx;

    phases_button(x0,y0,w);
    tides_button(x0, y0 + w + dx, w);
    shadows_button(x0, y0 + 2*(w + dx), w);
    scales_button(x0, y0 + 3*(w + dx), w);
    inclination(x0, height - 100 - dx, 240, 100)
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
            Wearth = PI / 50;
            Wmoon = Wearth / 28;
        }
    }
    else{
        cursor(ARROW);
    }
}

function mouse_button(x0,y0,w){
    // Draw Button
    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    scale(w);
    strokeWeight(2/w)
    if (!play) {
        fill(255)
    }
    beginShape();
    vertex(0.3, 0.2);
    vertex(0.3, 0.7);
    vertex(0.4, 0.6);
    vertex(0.55, 0.8);
    vertex(0.6, 0.78);
    vertex(0.5, 0.55);
    vertex(0.7, 0.55);
    vertex(0.3, 0.2);
    endShape(CLOSE);
    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        message("Mouse")
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
            Wearth /= 1.5;
            Wmoon /= 1.5;
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
            Wearth *= 1.5;
            Wmoon *= 1.5;
        }
    }
}

function phases_button(x0,y0,w){
    if (phasesON){
        strokeWeight(3);
        stroke(255,255,0);
    }
    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    scale(w);

    noStroke();
    fill(200)
    arc(0.4, 0.5, 0.7, 0.7, -PI / 2, PI / 2, CHORD);
    fill(50)
    arc(0.4, 0.5, 0.4, 0.7, -PI / 2, PI / 2, CHORD);

    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        message("Fases")
        if (clicked) {
            phasesON = !phasesON;
        }
    }
    stroke(200);
    strokeWeight(2);

}
function tides_button(x0,y0,w){
    if (tidesON){
        strokeWeight(3);
        stroke(255,255,0);
    }

    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    scale(w);


    noStroke();
    fill(150,150,255,200)
    ellipse(0.5,0.5,0.7,0.4)
    fill(200)
    circle(0.5,0.5,0.3)

    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        message("Mareas")
        if (clicked) {
            tidesON = !tidesON;
        }
    }
    stroke(200);
    strokeWeight(2);

}

function shadows_button(x0,y0,w){
    if (shadowsON){
        strokeWeight(3);
        stroke(255,255,0);
    }
    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    scale(w);


    noStroke();
    fill(20);
    rect(0.01,0.375,0.7,0.6)
    fill(200)
    circle(0.7,0.5,0.25)

    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        message("Sombras")
        if (clicked) {
            
            shadowsON = !shadowsON;
        }
    }
    stroke(200);
    strokeWeight(2);
}

function scales_button(x0,y0,w){
    if (changing){
        strokeWeight(3);
        stroke(255,255,0);
    }
    push();
    translate(x0,y0);
    rect(0,0,w,w,5)
    strokeWeight(0.01)
    scale(w);

    noStroke();
    fill(200)
    circle(0.5,0.5,0.7)
    fill(100)
    circle(0.7,0.7,0.3)

    pop();

    if (((x0 < mouseX) && (mouseX < x0 + w)) && ((y0 < mouseY) && (mouseY < y0 + w))) {
        cursor(HAND);
        message("Cambiar escala")
        if (clicked) {
            if (!changing) {
                changing = true
              }
        }
    }

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