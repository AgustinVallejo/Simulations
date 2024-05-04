class GasTube{
    constructor(gasLines, x0, y0, w, h, name, col){
        this.name = name; // Lines' triangle name
        this.color = col;
        this.gasLines = gasLines; // Array with the lines position (0.0 to 1.0)
        this.x0 = x0;
        this.y0 = y0;
        this.w = w;
        this.h = h;
        this.lineStrength = [0,0,0];
        this.enabled = false;
        this.electrified = false;

        this.N = 60; // Number of molecules/atoms   
        this.molecules = [];
        for (let i = 0; i < this.N; i++){
            this.molecules.push( new GasMolecule(w, h) )
        }

        this.t = 0; // Time
    }

    add(){
        for (let i = 0; i < 10; i++){
            this.molecules.push( new GasMolecule(this.w, this.h) )
        }
    }

    pop(){
        for (let i = 0; i < 10; i++){
            this.molecules.pop(i)
        }
    }

    electrify(){
        this.electrified = !this.electrified;
    }

    draw(){
        push();

        // Draw bounding box
        translate(this.x0, this.y0); // Move to center of screen
        noFill();
        stroke(200);
        strokeWeight(8);
        rectMode(CENTER)
        rect(0, 0, this.w, this.h, 5);

        strokeWeight(2)
        colorMode(HSB)
        this.lineStrength = [0,0,0]; // Reset lines strength
        this.molecules.forEach(molecule => {
            if ((abs(molecule.y) < 0.15*height) && (random() > 0.995)){ // Molecule inside ray?
                if (whiteLight){ // White light logic
                    let colorID = int(random(3)) // Assign molecule to a random line
                    molecule.excited = true;
                    molecule.t0 = this.t;
                    molecule.colorID = colorID; // Tell molecule which color it is
                    molecule.color = color((1-this.gasLines[colorID])*255, 100, 255); // Paint the molecule
                }
                else if (colorLight){ // Color light logic
                    for (let i=0; i<3; i++){
                        let line = this.gasLines[i];
                        let colorID = i;
                        if (abs(mouseY/height - line) < 0.04){
                            molecule.excited = true;
                            molecule.t0 = this.t;
                            molecule.colorID = colorID; // Tell molecule which color it is
                            molecule.color = color((1-line)*255, 100, 255);
                        }
                        
                    }
                }
            }
            molecule.draw(this.t);
            if ((molecule.excited)&&(molecule.colorID != 3)){
                this.lineStrength[molecule.colorID] += 3/this.N;
            }
        })
        pop();

        this.gasLines.forEach(line => {
            fill(this.color);
            noStroke();
            triangle(0.95*width,line*height,0.98*width,line*height-10,0.98*width,line*height+10)
            textSize(20);
            textAlign(LEFT, CENTER);
            text(this.name, 0.985*width, line*height)
        })
        this.t++;
    }
}

class GasMolecule{
    constructor(w, h){
        this.colorID = 3;
        this.excited = false;
        this.t0 = 0;
        this.color = color(255);

        this.w = w;
        this.h = h;
        this.x = (-1 + 2*noise(this.i))*this.w/2;
        this.y = (-1 + 2*noise(this.i))*this.h;
        this.i = random(10);
    }

    draw(t) {
        fill(0);
        noStroke();
        stroke(50);
        if (this.excited) {
            if (t - this.t0 < 300){
                fill(this.color);
            }
            else {
                this.excited = false;
                this.t0 = 0;
                this.colorID = 3;
            }
        }
        circle(this.x, this.y, 10);

        this.x = (-1 + 2*noise(this.i + t*0.001))*this.w/2;
        this.y = (-1 + 2*noise(this.i + t*0.001 + 20))*this.h/2;
    }


}