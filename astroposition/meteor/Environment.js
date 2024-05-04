let stars = [];
let NStars = 100;
let twinkling = true;

let starsY;
let headsY;
let headsX;

function airAndGround(){
	fill(0,0,255,70);
	noStroke();
	rect(0,atmosY,width,height);
	
	fill(0,40,0);
	noStroke();
	rect(0,groundY,width,height);
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