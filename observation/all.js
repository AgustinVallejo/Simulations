function setup() {
    let canvas = createCanvas(1200,700);
    canvas.parent("game");
    initializeFields();
    createStars();
}

function draw() {
    background(20);
    twinklingStars();
    guide();
    mountains();
    foreground();
    pointing();
    all_telescopes();
    stickman();
    // atmosphere();
    control_buttons();
    latitude_buttons();
    coordinates();
    if (play){
        H -= Wsky
        if (H<0){
            H+=2*PI
        }
    }

    t0++;
    clicked = false;
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);