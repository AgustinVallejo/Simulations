let stars = [];
let NStars = 200;
let twinkling = true;
let t_stars = 0;

function createStars() {
	for (i = 0; i < NStars; i++) {
		stars.push([random(width),random(height)]);
	}
}

function twinklingStars(){
	fill(60);
	noStroke();
	for (i = 0; i < NStars; i++) {
		x = stars[i][0];
		y = stars[i][1];
		star(x,y,8+noise(0.01*t_stars+10*i)*8,1+noise(0.01*t_stars+10*i)*4,4);
	}

  t_stars += 1;
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