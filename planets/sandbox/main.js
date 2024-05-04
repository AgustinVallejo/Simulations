let pressed = false;
let bodies = [];

let plColor, plSize;
let mouse, middle;
let r,v;
let d;

let Rsun = 80;
let kV = 0.5;
let kR = 1;

function setup(){
	let canvas = createCanvas(1200, 700);
	canvas.parent("game")
	middle = createVector(width/2, height/2);
	random_planet();
	createStars();
}

function draw() {
	background(0);
	twinklingStars();
	drawPlanets(!pressed)
	sun();
}

function random_planet(){
	plColor = color(random(255),random(255),random(255));
	plSize = random(10,30);
}

function sun() {
	fill(255,255,0)
	circle(width/2,height/2,Rsun)
}

function mousePressed(){
	if (!pressed){
		pos0 = createVector(mouseX,mouseY);
		pressed = true
	}
}

function mouseDragged(){
	background(0);
	twinklingStars();

	cursor(HAND);
	
	// Dragging Line
	r, v = get_coordinates()
	d = r.mag()
	stroke(255);
	strokeWeight(d/100 + 1);
	arrow(pos0.x,pos0.y,mouse.x,mouse.y);
	draw_ellipse(r,v)
	
	newPlanet();
	drawPlanets(!pressed);
	noLoop();
	sun()

}

function newPlanet(){
	fill(plColor);
	noStroke();
	circle(pos0.x,pos0.y,plSize);
}

function mouseReleased(){
	background(0);
	cursor(ARROW);
	pressed = false;
	mouse = createVector(mouseX,mouseY);
	r, v = get_coordinates()
	let planet = new Planet(pos0, r, v)
	bodies.push(planet);
	random_planet()
	loop();
}


function drawPlanets(moving){
		for (let p = 0; p < bodies.length ; p++){
			bodies[p].display();
			if (moving){
				bodies[p].move();
			}
	}
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

function get_coordinates() {
	mouse = createVector(mouseX,mouseY);
	r = p5.Vector.sub(pos0,middle)
	v = p5.Vector.sub(mouse,pos0)
	return r, v
}