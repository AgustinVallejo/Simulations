// El conjunto de las estrellas de fondo
let stars = [];
let stars2 = [];
let NStars = 100;
let twinkling = true;

function createStars() {
	for (i = 0; i < NStars; i++) {
		stars.push([random(width),random(height)]);
		stars2.push([random(width),random(height)]);
	}
}

function twinklingStars(){
	fill(70);
	noStroke();
	for (i = 0; i < NStars; i++) {
		x = stars[i][0];
		y = stars[i][1];
		star(x,y,10+noise(0.1*t0+10*i)*10,2+noise(0.01*t0+10*i)*5,4);

        x = stars2[i][0];
		y = stars2[i][1];
		star(x,y,4+noise(1*t0+10*i)*5,1+noise(0.01*t0+10*i)*2,4);
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