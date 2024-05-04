// Relative sizes of the simulation with respect to the window
const relativeWidth = 0.7;
const relativeHeight = 0.8;

let sun, earth, jupiter;
let magneticField;
let particles;

const sunXPosition = 0.0;
const earthXPosition = 0.5;
const JupiterXPosition = 0.8;

function setup() {
  // Create main canvas and shader canvas
  let canvas = createCanvas(
    windowWidth * relativeWidth,
    windowHeight * relativeHeight
  );
  cloudCanvas = createGraphics(width, height, WEBGL);
  canvas2 = createGraphics(width, height, WEBGL);
  canvas.parent("game");
  noStroke();
  sun = new Sun();
  magneticField = new MagneticField();
  background(0);
}

function draw() {
  translate(width / 2, height / 2);
  // Transparent rectangle
  fill(0, 0, 0, 10);
  rect(-width / 2, -height / 2, width, height);

  magneticField.draw();
  sun.draw();
}

function windowResized() {
  resizeCanvas(windowWidth * relativeWidth, windowHeight * relativeHeight);
  canvas2.resizeCanvas(
    windowWidth * relativeWidth,
    windowHeight * relativeHeight
  );
  cloudCanvas.resizeCanvas(
    windowWidth * relativeWidth,
    windowHeight * relativeHeight
  );
}

class MagneticField {
  constructor() {
    this.paths = [];

    const N = 60; // Number of lines
    const NN = 200; // Number of points in each line
    const R = 200;

    const dx = (1.2 * width) / 2 / NN;
    for (let i = 0; i < N; i++) {
      this.paths.push(new MagneticFieldLine());

      const theta = map(i, 0, N, -TWO_PI, TWO_PI);
      let x = 0;
      let y = 0;
      for (let j = 0; j < NN; j++) {
        this.paths[i].addPoint(createVector(x, y));

        y += 0.4 * dx * tan(theta) * (1 - min(abs(x) / R, 1)); // First section of the field: radial lines
        y *= 1 - min(abs(x) / R / 50, 1); // Lowers the strength of of that section
        y += (1 - min(abs(x) / R / 50, 1)) * tan(theta); // Second section of the field: horizontal lines
        x += (dx * abs(theta)) / theta; // Horizontal movement, the angle stuff sets the direction

        if (abs(y) > height / 2 + 50) {
          break;
        }
      }
    }
  }

  draw() {
    stroke(0, 255, 255);
    noFill();
    this.paths.forEach((path, n) => {
      // path.draw();
      path.updateParticles();
    });
  }

  update() {}

  interact(particle) {}
}


class MagneticFieldLine {
  constructor() {
    this.points = [];
    this.particles = [];
  }

  addPoint(point) {
    this.points.push(point);
  }

  draw() {
    stroke(0, 255, 255);
    noFill();
    beginShape();
    this.points.forEach((point, i) => {
      // For each point in the path
      vertex(point.x, point.y);
    });
    endShape(OPEN);
  }

  updateParticles() {
    this.particles.forEach((particle, i) => {
      if (particle.i < this.points.length - 1) {
        particle.vel = p5.Vector.sub(
          this.points[particle.i],
          particle.pos
        ).mult(.9);
        // particle.pos = this.points[particle.i];
        if (random() < 0.1 ) {
          particle.i++;
        }
      } else {
        particle.alive = false;
      }
      particle.update();
      particle.draw();
    });

    // Remove dead particles
    this.particles = this.particles.filter((p) => p.alive);

    // Add new particles at random
    if (random() < 0.1 && this.points.length > 0) {
      const rand = random(-30, 30);
      const newParticle = new Particle( this.points[0].add( createVector( rand, rand )), createVector(0, 0))
      this.particles.push(newParticle);
    }
  }
}

class Sun {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 50;
    this.color = color(255, 255, 0);
  }
  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}