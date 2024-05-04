function setup() {
    var canvas = createCanvas(1000, 700);
    canvas.parent("game")
    initializeFields();
    background(0);
    createStars();


    // Cargo la Imagen de la Tierra desde Arriba
    IMG = loadImage("polar.png");
    smooth();

    Wearth = PI / 500;
    Wmoon = Wearth / 10;
}

function draw() {
    let angle = set_angle();
    background(0);
    twinklingStars();
    sun();
    stickman(t, angle);
    moon(angle);
    tides(500, angle);
    earth(t);
    buttons()
    if (play) {
        t++;
      }
}

function tides(N, objAngle) {
    // Función que crea las mareas
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(89, 183, 255, 128);
    scale(Rearth)
    beginShape();
    for (var i = 0; i < N; i++) {
        var th = map(i, 0, N, 0, 2 * PI);
        // Efecto del Sol en las mareas
        var drSOL = tidalForceObj(th, 'S', 0);
        // Efecto de la Luna en las mareas
        var drLUNA = tidalForceObj(th, 'L', objAngle);
        // La altura R de la marea en un ángulo th
        var R = 0.6  + drSOL + drLUNA;
        var x = R * cos(th);
        var y = R * sin(th);
        // Crea el vector de la figura
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
}

function tidalForceObj(angle, obj, objAngle) {
    // Ejerce la fuerza según el objeto que se esté usando. S para SOL y L para LUNA
    var MOONTIDE = 0.1;
    var SUNTIDE = 0.06;
    switch(obj) {
        case 'S':
            return tidalForce(angle, SUNTIDE, 0);
        case 'L':
            return tidalForce(angle, MOONTIDE, objAngle);
        default:
            return 0;
    }
}

function tidalForce(angle, G, objAngle) {
    // El desplazamiento vertical según la posición del lugar y el objeto que perturba
    var dr = G * (1 + cos(2 * (angle - objAngle))) ;
    return dr;
}