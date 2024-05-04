// Planet class
class Planet {
	constructor(pos0,r,v) {
		// State Vectors
		this.pos = pos0; // Position in canvas
		this.r = r; // Position WRT center
		this.v = v; // Velocity

		// Properties
		this.color = plColor;
		this.size = plSize;
		this.alive = true;

		// Ellipse properties
		let {a, e, w, M0, W} = find_ellipse(r.mult(kR),v.mult(kV));
		this.a = a
		this.e = e
		this.w = w
		this.M0 = M0
		this.W = W
		this.th = r.heading()
		this.t = 0

		if (a < 0) {
			this.alive = false
		}
	}

	move() {
		if (this.alive){
			let nu = this.move_angles()
			this.th = nu + this.w
			let r = ellipse_polar(this.a,this.e,nu)
			this.pos = createVector(r*cos(this.th),r*sin(this.th))
			this.t += 0.1
			}

			if (this.pos.mag() < 0.5*Rsun) {
				this.alive = false
			}
		}

	move_angles() {
		let M = this.M0 + this.W*this.t
		let E1 = M + this.e*sin(M)
		let E2 = M + this.e*sin(E1)
		let E = M + this.e*sin(E2)
		let nu = atan2( pow(1-this.e*this.e,0.5)*sin(E), cos(E) - this.e)
		return nu
	}

	display() {
		if (this.alive){
			push();
			translate(width/2,height/2);
			ellipse_all(this.a,this.e,this.w);
			fill(this.color);
			circle(this.pos.x, this.pos.y, this.size);
			pop();
		}
		
  }
}