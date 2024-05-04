// https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Book%3A_Celestial_Mechanics_(Tatum)/09%3A_The_Two_Body_Problem_in_Two_Dimensions/9.08%3A_Orbital_Elements_and_Velocity_Vector

// Variable definitions:
// r: position vector
// v: velocity vector
// alpha: heading of r
// beta: heading of v
// a: semimajor axis
// e: excentricity
// nu: true anomaly
// w: argument of periapsis
// M0: Initial mean anomaly
// W: angular velocity


let mu = 1e6;

function find_a(r,v){
	let r_mag = r.mag();
	let v_mag = v.mag();
	
	let a = r_mag * mu / (2*mu - r_mag*pow(v_mag,2));
	return a;
}

function find_e(r,v,a){
	let r_mag = r.mag();
	let v_mag = v.mag();
	let alpha = r.heading();
	let beta = v.heading();
	
	let e = pow(1 - pow(r_mag*v_mag*sin(beta-alpha),2)/(a*mu), 0.5);
	return e;
}

function find_angles(r,v,a,e){
	let r_mag = r.mag()
	// nu comes from the polar ellipse equation
	let nu = acos((1/e)*(a*(1-e*e)/r_mag - 1));

	let alpha = r.heading();
	let beta = v.heading();
	
	let W = -500*pow(a,-3/2)
	if (cos(alpha - beta) > 0){
		nu *= -1
	}
	if (p5.Vector.cross(r, v).z > 0) {
		nu *= -1
		W *= -1
	}

	let E0 = acos((e+cos(nu))/(1+e*cos(nu)))
	if (cos(E0 - nu) < 0){
		E0 *= -1
	}
	let M0 = E0 - e*sin(E0)

	let th = r.heading()
	let w = th - nu
	return {w, M0, W};
}

function find_ellipse(r,v){
	let a = find_a(r,v);
	let e = find_e(r,v,a);
	let {w, M0, W} = find_angles(r,v,a,e);
	return {a, e, w, M0, W};
}

function draw_ellipse(r,v) {
	stroke(100);
	strokeWeight(1)
	let {a,e,w} = find_ellipse(r.mult(kR),v.mult(kV));

	push();
	translate(width/2,height/2);
	ellipse_all(a,e,w);
	pop();
}

function ellipse_all(a,e,w){	
	fill(255);
	let N = 200;
	stroke(255);
	if (a<0) {
		stroke(255,0,0)
	}
	strokeWeight(1);
	noFill();
	beginShape()
	for (let t=0; t<N; t++){
		let th = t*2*PI/N
		let nu = th - w
		let r = ellipse_polar(a,e,nu)
		vertex(r*cos(th),r*sin(th));
	}
	endShape(CLOSE);
	noStroke();
}

function ellipse_polar(a,e,nu){
	return a*(1-e*e)/(1+e*cos(nu));
}