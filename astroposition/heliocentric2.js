dists = [0.4, 0.7, 1, 1.5, 5.2, 9.5] // Planets distances to the Sun in AU
angles = [0, 0, 0, 0] // Initial angles of the planets
cols = ["#aaaaaa","#ffcc4f","#28a9ff","#ff0000","#af6c00", "#d9ce6c"] // Colors of the planets
geocentric = false // Determines if the simulation is geocentric or heliocentric
distances_known = true // Changes the type of geocentric simulation
t = 0 // Time
f = 0.5 // Size scale
sun = 15 // Sun's size
planet = 8 // Planets size
earth_dth = 0.005 // Angular speed of earth
scalefactor = 2

function setup() {
	var canvas = createCanvas(1200, 600);
	canvas.parent("game2")
	background(0);
	noStroke();
}

function draw() {
	fill(0,5); // The background is a little bit transparent
	rect(0,0,width,height); // This is the fake background
	draw_geocentric()
	draw_heliocentric()

	stroke(255)
	line(width/2,0,width/2,height)
	noStroke()
}
        
function draw_geocentric(){
	
	// MOVE REFERENCE 
	push()
	translate(width/4,height/2)
	
	i = 2 // Index of Earth
	th = angles[i] // Angle of position of Earth
	R = height*dists[i]*f/scalefactor // Distance of earth in screen
	earth_pos = createVector(R*cos(th),R*sin(th))
	fill(cols[i])
	circle(0,0,sun)
	ii = 0
	for (let i = 0; i < angles.length; i++){
		th = angles[i]
		R = height*dists[i]*f/scalefactor
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
	text("GEOCÉNTRICO",width/4,height*0.95)

	textSize(20)
	text("Tierra",width/4,height*0.55)
}
    
function draw_heliocentric(){
    push()
    translate(3*width/4,height/2)
    fill(255,255,0)
    circle(0,0,sun)
    for (let i = 0; i < angles.length; i++){
        th = angles[i]
        fill(cols[i])
        R = height*dists[i]*f/scalefactor
        circle(R*cos(th),R*sin(th),planet)
        angles[i] -= earth_dth*dists[i]**(-3/2)
		}
    pop()
	fill(255,255,0)
	textSize(32)
	textAlign(CENTER)
	text("HELIOCÉNTRICO",3*width/4,height*0.95)

	textSize(20)
	text("Sol",3*width/4,height*0.55)
}

function mouseClicked(){
	if ( earth_dth ) {
		earth_dth = 0
	}
	else {
		earth_dth = 0.005
	}
}