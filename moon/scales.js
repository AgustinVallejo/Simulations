big = true;
changing = false;
ts = 0;
TS = 100;



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
    let angle = set_angle();
    background(20);
    twinklingStars();
    sun();
    earth(t);
    stickman(t, angle);
    moon(angle);
    // phases(angle);
    buttons();
    change();
    if (play) {
      t++;
    }
}

function change() {
  let Rearth_small = 10
  let Rmoon_small = 2.6
  if (changing) {
    ts++;
    if (big) {
      Rearth = lerp(100,Rearth_small,ts/TS)
      Rsun = lerp(1.5*width,100,ts/TS)
      Rmoon = lerp(50,Rmoon_small,ts/TS)
    }
    else {
      Rearth = lerp(Rearth_small,100,ts/TS)
      Rsun = lerp(100,1.5*width,ts/TS)
      Rmoon = lerp(Rmoon_small,50,ts/TS)
    }
  }

  if (ts >= TS) {
    changing = false;
    ts = 0;
    big = !big
  }
}