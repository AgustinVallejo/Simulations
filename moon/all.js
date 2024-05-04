function setup() {
    var canvas = createCanvas(1000, 700);
    canvas.parent("game")
    initializeFields();
    background(0);
    createStars();

    // Cargo la Imagen de la Tierra desde Arriba
    IMG = loadImage("polar.png");
    smooth();

    Rearth = 100;
}

function draw() {
    let angle = 0
    if (!play) {
      Amoon = atan2(mouseY - height/2, mouseX - width/2)
    }
    angle = Amoon
    background(20);
    twinklingStars();
    sun();

    if (tidesON){
      tides(500, angle);
    }

    if (shadowsON) {
      switch (scenario*cos(Amoon)/abs(cos(Amoon))){
        case 0:
          earth();
          earth_shadow();
          moon(angle);
          moon_shadow();
          eclipse = true
          break;
        case -1: // Under
          moon(angle);
          moon_shadow();
          earth();
          earth_shadow();
          eclipse = false
          break;
        case 1: // Over
          earth();
          earth_shadow();
          moon(angle);
          moon_shadow();
          eclipse = false
          break;
      }
    }
    else {
      earth();
      moon(angle);
    }

    if (phasesON){
      phases(angle);
    }

    change();

    control_buttons();
    sims_buttons();
    clicked = false;
    t0++
}