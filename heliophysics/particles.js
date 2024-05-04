class Particle {
  constructor( pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.alive = true;
    this.i = 0; // Index along the track of the road

  }

  draw() {
    strokeWeight(1);
    stroke(255, 255, 0);

    point(this.pos.x , this.pos.y);
  }

  update() {
    this.pos.add(this.vel).add( createVector( random(), random()));

    // If the particle is out of the screen, kill it
    if (this.pos.mag > width) {
      this.alive = false;
    }
  }
}

class Particles{
  constructor(N){
    this.particles = [];

    for (let i = 0; i < N; i++) {
      const x = random(width);
      const y = random(height);
      const vx = random(-1, 1) * 5;
      const vy = random(-1, 1) * 5;
      this.particles.push(new Particle(x, y, vx, vy));
    }
  }

  draw(){
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw();
    }
  }

  update(){
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (!this.particles[i].alive) {
        this.particles.splice(i, 1);
      }
    }
  }
}