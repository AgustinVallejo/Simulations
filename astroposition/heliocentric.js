dists = [0.4, 0.7, 1, 1.5, 5.2, 9.5] // Planets distances to the Sun in AU
angles = [0, 0, 0, 0, 0, 0] // Initial angles of the planets
cols = ["#aaaaaa","#ffcc4f","#28a9ff","#ff0000","#af6c00", "#d9ce6c"] // Colors of the planets
geocentric = false // Determines if the simulation is geocentric or heliocentric
distances_known = false // Changes the type of geocentric simulation
t = 0 // Time
f = 0.5 // Size scale
sun = 10 // Sun's size
planet = 3 // Planets size

function setup() {
	var canvas = createCanvas(600, 600);
	canvas.parent("game")
	background(0);
	noStroke();
}

function draw() {
	fill(0,5); // The background is a little bit transparent
	rect(0,0,width,height); // This is the fake background
	if (geocentric){
		draw_geocentric()
	}
	else{
		draw_heliocentric()
	}
	top_text()
}

function top_text(){
	fill(100)
	textSize(20)
	textAlign(CENTER)
	text("Press Spacebar",width/2,height*0.1)
}
        
function draw_geocentric(){
	earth_dth = 0.01 // Angular speed of earth
	
	// MOVE REFERENCE 
	push()
	translate(width/2,height/2)
	
	i = 2 // Index of Earth
	th = angles[i] // Angle of position of Earth
	R = height*dists[i]*f/5.2 // Distance of earth in screen
	earth_pos = createVector(R*cos(th),R*sin(th))
	fill(cols[i])
	circle(0,0,sun)
	ii = 0
	for (let i = 0; i < angles.length; i++){
		th = angles[i]
		R = height*dists[i]*f/5.2
		pos_vec = createVector(R*cos(th), R*sin(th)).sub(earth_pos)
		if (i != 2){
			fill(cols[i])
			if (!distances_known){
				pos_vec.normalize()
				pos_vec.mult(height*(0.2+ii/40))
			}
			circle(pos_vec.x,pos_vec.y,planet)
			ii += 1
		}
		else{
				fill(255,255,0)
				circle(-earth_pos.x,-earth_pos.y,sun)
		}
		angles[i] -= earth_dth*dists[i]**(-3/2)
	}
	pop()
	fill("#28a9ff")
	textSize(32)
	textAlign(CENTER)
	text("GEOCENTRIC",width/2,height*0.95)
}
    
function draw_heliocentric(){
    earth_dth = 0.01
    push()
    translate(width/2,height/2)
    fill(255,255,0)
    circle(0,0,sun)
    for (let i = 0; i < angles.length; i++){
        th = angles[i]
        fill(cols[i])
        R = height*dists[i]*f/5.2
        circle(R*cos(th),R*sin(th),planet)
        angles[i] -= earth_dth*dists[i]**(-3/2)
		}
    pop()
	fill(255,255,0)
	textSize(32)
	textAlign(CENTER)
	text("HELIOCENTRIC",width/2,height*0.95)
}
    
function keyPressed(){
    if (key == " "){
        background(0)
				if (geocentric){
					if (!distances_known){
						geocentric = false
					}
					distances_known = false
				}
        else {
					geocentric = true
					distances_known = true
				}
		}
}

function mouseClicked(){
	background(0)
	if (geocentric){
		if (!distances_known){
			geocentric = false
		}
		distances_known = false
	}
	else {
		geocentric = true
		distances_known = true
	}
}