let stars = [];
let NStars = 100;
let twinkling = true;
let t = 0;

let starsY;
let headsY;
let headsX;
let atmosY;

function setup() {
	var canvas = createCanvas(1000, 600);
	canvas.parent("game");
	background(0);
	
	headsX = 0.1*width;
	headsY = 0.9*height - 45;
	starsY = 0.2*height;
	atmosY = 0.4*height;
	
	for (i = 0; i < NStars; i++) {
		stars.push([random(width),random(height)]);
	}
}

function draw() {
	background(50);
	twinklingStars();
	airAndGround();
	observer(headsX, headsY);
	movingStar();
	lightToAtmosphere();
	t++;
}

function airAndGround(){
	fill(0,0,255,70);
	noStroke();
	rect(0,atmosY,width,height);
	
	fill(0,40,0);
	noStroke();
	rect(0,0.9*height,width,height);
}

function observer(x,y){
	translate(x,y);
	stroke(255);
	strokeWeight(3);
	rect(-5,5,10,20);
	circle(0,0,15);
	line(-5,25,-5,40);
	line(5,25,5,40);
	translate(-x,-y);
}

function movingStar(){
	fill(255)
	star(mouseX,starsY,20,5,4);
}

function lightToAtmosphere(){
	// Big transparent light
	strokeWeight(15);
	stroke(255,10);
	line(mouseX, starsY, headsX, headsY);
	
	// Linear calculations
	atmosX = intersection(mouseX, starsY, headsX, headsY,atmosY);
	
	// Small space light
	strokeWeight(5);
	stroke(255);
	line(mouseX, starsY, atmosX, atmosY);
	
	// Twinkling
	strokeWeight(5);
	stroke(255);
	Nlines = 20;
	m = slope(mouseX, starsY, headsX, headsY);
	X0 = atmosX;
	Y0 = atmosY;
	for (i = 0; i < Nlines ; i++){
		K2 = (headsX - atmosX)/(Nlines);
		P = 1;
		P2 = 0.1;
		X1 = X0 + K2 + P*(1/m+P2)*(noise(0.05*t) - 0.5);
		Y1 = Y0 + m*(K2) + P*(1/m+P2)*(noise(0.05*t + 50) - 0.5);
		line(X0,Y0,X1,Y1);
		X0 = X1;
		Y0 = Y1;
	}
	
	// Dotted distance line
	strokeWeight(4);
	stroke(100,100,255);
	Nlines = 15;
	m = slope(mouseX, starsY, headsX, headsY);
	for (i = 0; i < Nlines ; i++){
		K2 = (headsX - atmosX)/(2*Nlines);
		K = K2*i*2;
		dK = 50;
		line(headsX-K+dK, headsY-m*K, headsX-(K+K2)+dK, headsY-m*(K+K2));
	}
}

function intersection(X1,Y1,X2,Y2,Y3){
	m = (Y2-Y1)/(X2-X1);
	b = m*X1-Y1;
	X3 = (Y3+b)/m;
	return X3;
}

function slope(X1,Y1,X2,Y2){
	m = (Y2-Y1)/(X2-X1);
	return m;
}

function twinklingStars(){
	fill(70);
	noStroke();
	for (i = 0; i < NStars; i++) {
		x = stars[i][0];
		y = stars[i][1];
		star(x,y,10+noise(0.01*t+10*i)*10,2+noise(0.01*t+10*i)*5,4);
	}
}

function star(x, y, radius1, radius2, npoints) {
  angle = TWO_PI / npoints;
  halfAngle = angle/2.0;
	da = PI/4 //0.001*mouseX
  beginShape();
  for (a = 0; a < TWO_PI; a += angle) {
    sx = x + cos(a + da) * radius2;
    sy = y + sin(a + da) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle + da) * radius1;
    sy = y + sin(a+halfAngle + da) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}