let az = 0;
let h = 45;
let dec = 45;
let ra = -45;
let kra = 0.01;
let r;

let px = 0;
let py = 0;

let R = 40;

function all_telescopes(){
    strokeWeight(2)
    horizontalMount(0.3*width,0.8*height)
    equatorialMount(0.7*width,0.8*height)
}

function telescope(x=0,y=0){
    fill(200);
    rect(x+40,y+0,100,20)
}

function horizontalMount(x,y){
    stroke(255)
    push()
    translate(x, y)

    push()
    legs()
    fill(200);
    textSize(0.5);
    textAlign(CENTER);
    noStroke()
    text("Montura Horizontal",0,1.95)
    if (!equatorialON){
        noStroke();
        fill(255,255,0,100)
        ellipse(0,1,3,1)
    }
    pop()

    rectMode(CENTER)

    fill(80);
    rect(0,0,30,5)
    rect(15,-10,5,30)
    rect(-15,-10,5,30)
    translate(0,-15)

    let angle = radians(-90)
    if (!equatorialON){
        angle = atan2(py-y,px-x)
    }
    rotate(angle);
    telescope()
    pop()

    let w = 100
    if (((x - w < mouseX) && (mouseX < x + w)) && ((y - w < mouseY) && (mouseY < y + w)) && (equatorialON)) {
        cursor(HAND);
        message("Cambiar montura")
        if (clicked) {
            equatorialON = false
        }
    }
    else{
        cursor(ARROW);
    }

}

function equatorialMount(x,y){
    stroke(255)
    push()
    translate(x, y)

    push()
    legs()
    fill(200);
    textSize(0.5);
    textAlign(CENTER);
    noStroke()
    text("Montura Ecuatorial",0,1.95)
    if (equatorialON){
        noStroke();
        fill(255,255,0,100)
        ellipse(0,1,3,1)
    }
    pop()

    rectMode(CENTER)

    fill(80);
    rect(0,0,30,5)
    
    push()
    rotate(radians(phi))
    rect(0,-20,20,50)
    pop()
    translate(30*sin(radians(phi)),-35*cos(radians(phi)))
    
    let angle = radians(-90)
    if (equatorialON){
        angle = atan2(py-y,px-x)
    }
    rotate(angle)
    translate(0, 0)
    rect(0,0,5,60)
    rect(0,-40,20,20)
    telescope(-20,30)
    pop()

    let w = 100
    if (((x - w < mouseX) && (mouseX < x + w)) && ((y - w < mouseY) && (mouseY < y + w)) && (!equatorialON)) {
        cursor(HAND);
        message("Cambiar montura")
        if (clicked) {
            equatorialON = true
        }
    }
}

function legs(){
    let s = 50
    scale(s);
    strokeWeight(5/s)
    line(0,0,-0.8,1)
    line(0,0,0,1.3)
    line(0,0,0.8,1)
}

function pointing(){
    if (key === "ArrowLeft") {
        if (!equatorialON){
            if (az>-90){
                az--
            }
        }
        else if (((px<width/2)&&(py<0.8*height-R))||(px>width/2)){
            ra--
        }
    } else if (key === "ArrowRight") {
        if (!equatorialON){
            if (az<90){
                az++
            }
        }
        else if (((px>width/2)&&(py<0.8*height-R))||(px<width/2)){
            ra++
        }
    }
    else if (key === "ArrowUp") {
        if (!equatorialON){
            if (h<90){
                h++
            }
        }
        else{
            if (dec>0){
                dec--
            }
        }
    } 
    else if (key === "ArrowDown") {
        if (!equatorialON){
            if (h>0){
                h--
            }
        }
        else{
            if (dec<90){
                dec++
            }
        }
    }

    if (play){
        ra-= Wsky/kra
    }
    if (ra<0){
        ra += 2*PI/kra
    }
    if (ra*kra>2*PI){
        ra -= 2*PI/kra
    }

    noFill();
    stroke(255,0,0,100)
    strokeWeight(10)
    if (!equatorialON){
        px = map(az,-90,90,0+R,width-R,true)
        py = map(h,0,90,0.8*height-R,0+R,true)
    }
    else{
        r = map(dec,0,90,height*0.8,0,true)
        px = r*cos(ra*kra) + width/2
        py = r*sin(ra*kra) + y0
    }
    push()
    circle(px,py,2*R)
    pop()
}

function keyReleased() {
    key = ""
  }
