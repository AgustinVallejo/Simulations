var asteroid;
var fire;

let t = 0;
let rotAngle = 0;

let atmosY;
let groundY;
let a = 0; // Fire alpha channel
let aa = 0; // Final text alpha channel
let collision = false;

let inAtmosphere = false;

function setup() {
	let canvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
	canvas.parent("game");
	background(0);
	textSize(64);
	
	headsX = 0.1*width;
	headsY = 0.9*height - 45;
	starsY = 0.2*height;
	atmosY = 0.4*height;
	groundY = 0.9*height;
	
	for (i = 0; i < NStars; i++) {
		stars.push([random(width),random(height)]);
	}
	
	imageMode(CENTER);
	textAlign(LEFT);
	astSize = 100;
	fireSize = astSize*2;
  asteroid = loadImage('Asteroid.png');
  fire = loadImage('Fire.png');
}

function draw() {
	noCursor();
	background(50);
	twinklingStars();
	airAndGround();
	observer(headsX, headsY);
	drawAsteroid();
	collisionAnim();
	t++;
}

function drawAsteroid(){
	push();
	translate(mouseX,mouseY);
	
	// Direction of Movement
	mouse = createVector(mouseX,mouseY);
	pmouse = createVector(pmouseX,pmouseY);
	diff = mouse.sub(pmouse);
	if ( diff.mag() !== 0 ){
		console.log( diff )
		angle = diff.heading();
		rotAngle = lerp(rotAngle,angle,0.1);
	}
	rotate(rotAngle - PI/4);

	if ( collision ) { 
		pop();
		return;
	 }
	
	// Drawing
	if (mouseY > atmosY*0.9){
		a = (mouseY/(atmosY*0.9) - 1)* 255;
		tint(255, a);
		image(fire,-astSize/3,-astSize/4,fireSize,fireSize);
		textSize(32);
		inAtmosphere = true;
	}
	else {
		inAtmosphere = false;
	}
	
	tint(255, 255);
	image(asteroid,0,0,astSize,astSize);
	pop();
	
	if (inAtmosphere){
		fill(255,a);
		stroke(0,a);
		text("Meteoro",mouseX+width*0.05,mouseY+0.04*height);
	}
	else{
		a = (1 - mouseY/(atmosY*0.9))* 255;
		fill(255,a);
		stroke(0,a);
		text("Meteoroide",mouseX+width*0.05,mouseY+0.04*height);
	}
}

function collisionAnim(){
	if ((mouseY > groundY*0.9) & !collision){
		collision = true;
		t = 0;
		aa = 0;
		collisionX = mouseX
	}
	if (collision){
		fill(255);
		noStroke();
		circle(collisionX,groundY,t*15);
		
		Tmax = 100
		fill(0,aa);
		textSize(100);
		textAlign(CENTER);
		aa = map(t,50,Tmax*2,0,255);
		text("¡Meteorito!",width/2,height/2);
		textSize(20);
		text("Haz clic para reiniciar",width/2,height/2+100);
	}
}

function mouseClicked(){
	t = 0;
	textSize(64);
	textAlign(LEFT);
	collision = false;
}
