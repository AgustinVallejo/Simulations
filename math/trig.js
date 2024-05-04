radio = 0.3 // fracción del ancho de la pantalla que será el radioio del círculo
lineWeight = 4
textWeight = 0.1

function setup() {
	//createCanvas(600, 600)
	BACKGROUND = color(230,230,250)
	X_width = min(windowWidth,600)
	X_height = min(windowHeight,600)
	var canvas = createCanvas(X_width, X_height);
	canvas.parent("game")
	background(BACKGROUND) // El fondo crema es porque tiene un poco más de RG que de B
	translate(width / 2, height / 2) // Esto mueve el origen de la esquina sup izquierda al centro
	radio = radio * width
}

function draw() {
	// CALCULOS
	lineaRadio = createVector(mouseX - width / 2, mouseY - height / 2)
	lineaRadio.mult(radio / lineaRadio.mag())
	angulo = -asin(lineaRadio.y / radio)
	if (lineaRadio.x < 0) {
		angulo = PI - angulo
	}
	if (angulo < 0) {
		angulo += 2 * PI
	}
	// DIBUJOS
	background(BACKGROUND)
	translate(width / 2, height / 2) // Esto mueve el origen de la esquina sup izquierda al centro

	// Líneas centrales
	stroke(10) // El color de la línea(stroke) es negro
	strokeWeight(lineWeight*0.5) // El ancho de la línea es 5 px
	line(-radio, 0, radio, 0)
	line(0, -radio, 0, radio)

	// Angulito interno
	textSize(20)
	fill(0)
	da = angulo / 2
	dr = 0.3
	strokeWeight(textWeight)
	text("x", cos(angulo - da) * radio * dr * 0.6, -sin(angulo - da) * radio * dr * 0.6)
	noFill()
	strokeWeight(lineWeight)
	arc(0, 0, dr * radio, dr * radio, 2 * PI - angulo, 2 * PI)

	// Círculo Unitario
	strokeWeight(5)
	circle(0, 0, 2 * radio)

	// Valor de x en el tope de la pantalla
	fill(0)
	textSize(30)
	textAlign(CENTER)
	strokeWeight(textWeight)
	text("x =" + str(int(angulo * 180 / PI))+"°", 0, -1.2 * radio)

	// RADIO
	stroke(0, 0, 255) // El color de la línea (stroke) es azul
	strokeWeight(lineWeight)
	line(0, 0, lineaRadio.x, lineaRadio.y)

	// SENO
	stroke(255, 0, 0)
	strokeWeight(lineWeight)
	line(lineaRadio.x, 0, lineaRadio.x, lineaRadio.y)
	fill(255, 0, 0)
	textSize(20)
	textAlign(LEFT)
	strokeWeight(textWeight)
	text("sin(x)=" + str(round(sin(angulo),2)), lineaRadio.x + 10, lineaRadio.y / 2)
	stroke(100)
	strokeWeight(lineWeight*3)
	line(0.9 * width / 2, 0, 0.9 * width / 2, lineaRadio.y)

	// COSENO
	stroke(0, 200, 0)
	strokeWeight(lineWeight)
	line(0, 0, lineaRadio.x, 0)
	fill(0, 200, 0)
	textSize(20)
	textAlign(CENTER)
	strokeWeight(textWeight)
	text("cos(x)=" + str(round(cos(angulo),2)), lineaRadio.x / 2, +20)
	stroke(100)
	strokeWeight(lineWeight*3)
	line(0, 0.9 * width / 2, lineaRadio.x, 0.9 * width / 2)
}