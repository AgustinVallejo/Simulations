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

function strokeFill( color ) {
	stroke( color );
	fill( color );
}

function draw() {
	// CALCULOS
	let xAxis = constrain( abs( mouseX - width / 2 ), 50, 200 );
	let yAxis = constrain( abs( mouseY - height / 2 ), 50, 200 );

	let xAxisBigger = xAxis > yAxis

	let a = xAxisBigger ? xAxis : yAxis;
	let b = xAxisBigger ? yAxis : xAxis;
	let c = sqrt( a**2 - b**2 );

	let e = c / a;

	// DIBUJOS
	fill( 'white' );

	background(BACKGROUND)
	translate(width / 2, height / 2) // Esto mueve el origen de la esquina sup izquierda al centro

	strokeWeight( 3 );
	stroke( 'black' );
	ellipse( 0, 0, 2*xAxis, 2*yAxis );
	strokeWeight( 1.5 );

	// Líneas centrales
	let xStroke = xAxisBigger ? 'blue' : 'red';
	let yStroke = xAxisBigger ? 'red'  : 'blue';
	stroke( xStroke );
	line( 0, 0, xAxis, 0 );
	stroke( yStroke );
	line( 0, 0, 0, -yAxis );

	// Texto
	strokeWeight( 1 );
	textSize( 20 );
	textAlign( CENTER );

	let xLabel = xAxisBigger ? 'a' : 'b';
	let yLabel = xAxisBigger ? 'b' : 'a';

	strokeFill( xStroke );
	text( xLabel, xAxis / 2, 20 );

	strokeFill( yStroke );
	text( yLabel, 10, - yAxis / 2 );

	textAlign( LEFT );

	strokeFill( 'black' );
	text( 'e = c / a = ' + e.toFixed( 2 ), width / 2 / 3 , - height / 2 + 30 );

	strokeFill( 'blue' );
	text( 'a = ' + a.toFixed( 0 ),  - 2 * width / 2 / 3 , - height / 2 + 30 );

	strokeFill( 'red' );
	text( 'b = ' + b.toFixed( 0 ),  - width / 2 / 3 , - height / 2 + 30 );

	strokeFill( 'green' );
	text( 'c = ' + c.toFixed( 0 ),  - 2 * width / 2 / 3 , - height / 2 + 50 );

	// Focos 
	strokeFill( 'green' );
	strokeWeight( 1 );

	if ( xAxisBigger ) {
		line( -c, 0, 0, 0 );
		if ( c > 0 ) {
			text( 'c', -c / 2, 20 );
		}
		strokeWeight( 3 );
		translate( -c, 0 );
		// draw an X shape
		line( -5, -5, 5, 5 );
		line( 5, -5, -5, 5 );
		translate( 2 * c, 0 );
		line( -5, -5, 5, 5 );
		line( 5, -5, -5, 5 );
		translate( -c, 0 );
	}
	else {
		line( 0, c, 0, 0 );
		if ( c > 0 ){
			text( 'c', 10, c / 2 );
		}
		strokeWeight( 3 );
		translate( 0, c );
		// draw an X shape
		line( -5, -5, 5, 5 );
		line( 5, -5, -5, 5 );
		translate( 0, -2 * c );
		line( -5, -5, 5, 5 );
		line( 5, -5, -5, 5 );
		translate( 0, c );
	}
}