// El conjunto de las estrellas de fondo
let stars = [];
let stars2 = [];
let NStars = 200;
let twinkling = true;

let atm0 = 0.6
let D = 1

function createStars() {
    D = 1.4*width/2 // Random range for background stars

	for (i = 0; i < NStars; i++) {
		x = random(-D,D)
		y = random(-D,D)
		stars.push([x,y]);
		x = random(-D,D)
		y = random(-D,D)
		stars2.push([x,y]);
	}
}

function twinkle(y){
	let mag = 4
	return map(2*(y/D)-(phi/90),-0.8,0,0,mag,true)
}

function twinklingStars(){
	push()

	fill(255)
	x = width/2
	y0 = map(phi,0,90,0.8*height-R,0+R)
	
	translate(x, y0)
	fill(70);
	noStroke();
	rotate(H);
	for (i = 0; i < NStars; i++) {
		x = stars[i][0];
		y = stars[i][1];
		z = atan2(y,x)
		rr = createVector(x, y).mag()
		
		push()
		translate(x,y)
		rotate(-H)
		if (!atmosphereON) {atm=0}
		else {atm = twinkle(rr*sin(z+H))}
		star(0,0,10+10*(noise(0.1*t0+10*i)*atm + (1-atm)/3),2+5*(noise(0.01*t0+10*i)*atm + (1-atm)/3),4);
		pop()
		
        x = stars2[i][0];
		y = stars2[i][1];
		z = atan2(y,x)
		rr = createVector(x, y).mag()

		push()
		translate(x,y)
		rotate(-H)
		if (!atmosphereON) {atm=0}
		else {atm = twinkle(rr*sin(z+H))}
		star(0,0,4+5*(noise(0.1*t0+10*i)*atm + (1-atm)/3),1+ 2*(noise(0.01*t0+10*i)*atm + (1-atm)/3),4);
		pop();
	}
	fill(255)
	if (!atmosphereON) {atm=0}
	else {atm = twinkle(0)}
	rotate(-H);
	star(0,0,10+10*(noise(0.1*t0+10*i)*atm + (1-atm)/3),2+5*(noise(0.01*t0+10*i)*atm + (1-atm)/3),4);
	pop()
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