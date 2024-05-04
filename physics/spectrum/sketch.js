let theShader;
let canvas2;

let t = 0;

let clicked = false;
let whiteLight = false;
let colorLight = true;
let mainLine = 0;
let gasALines = [0.1,0.5,0.7];
let gasBLines = [0.3,0.85,0.95];
let gasA, gasB;

let whiteButton, colorButton, gasAButton, gasBButton;
let AplusButton, AminusButton, BplusButton, BminusButton;

let graph;
let showGraph = true;

function preload(){
    theShader = loadShader("shader.vert","shader.frag");
}

function initializeFields(){
    // Creating GasTube elements
    gasA = new GasTube(gasALines,0.35*width, height/2,0.1*width, 0.8*height, "A", color(255,255,0));
    gasB = new GasTube(gasBLines,0.5*width, height/2,0.1*width, 0.8*height, "B", color(0,255,255));

    // Setting up buttons
    whiteButton = new Button("Luz Blanca",0.1*width,0.8*height,enableWhiteLights, whiteLight)
    colorButton = new Button("Color Manual",0.117*width,0.92*height,enableColors, colorLight)
    gasAButton = new Button("Gas A",0.35*width,0.92*height,toggleGasA, gasA.enabled, color(255,255,0));
    gasBButton = new Button("Gas B",0.5*width,0.92*height,toggleGasB, gasB.enabled, color(0,255,255));
    
    AminusButton = new Button("  -  ",0.31*width,0.05*height,() => { gasA.pop() }, true);
    AplusButton = new Button("  +  ",0.35*width,0.05*height,() => { gasA.add() }, true);
    AElectrifyButton = new Button("  E  ",0.395*width,0.05*height,() => { gasA.electrify() }, gasA.electrified);
    BminusButton = new Button("  -  ",0.46*width,0.05*height,() => { gasB.pop() }, true);
    BplusButton = new Button("  +  ",0.50*width,0.05*height,() => { gasB.add() }, true);
    BElectrifyButton = new Button("  E  ",0.545*width,0.05*height,() => { gasB.electrify() }, gasB.electrified);
    
}

function setup(){
    let canvas = createCanvas(1200, 500);
    canvas.parent("game")
    canvas2 = createGraphics(width, height, WEBGL);
    textFont("Roboto Slab");
    initializeFields();
    
    graph = new Graph(0.27,0.4,"Espectro","Longitud de Onda","Intensidad");
}

function draw(){
    cursor(ARROW);

    mainLine = map(mouseY,0,height,1,0);
    
    // Set general sim uniforms
    theShader.setUniform("u_resolution",[width,height])
    theShader.setUniform("u_pixelDensity",pixelDensity())
    theShader.setUniform("u_time",millis()*1e-3)
    theShader.setUniform("u_mouse",[mouseX/width, mainLine])
    theShader.setUniform("u_whiteLight",whiteLight)
    theShader.setUniform("u_colorLight",colorLight)
    
    // Uniforms for gasA
    theShader.setUniform("u_lines1",invertLines(gasALines))
    theShader.setUniform("u_gasAON",gasA.enabled)
    theShader.setUniform("u_lineStrength1",gasA.lineStrength)
    theShader.setUniform("u_electrified1",gasA.electrified)
    
    // Uniforms for gasB
    theShader.setUniform("u_lines2",invertLines(gasBLines))
    theShader.setUniform("u_gasBON",gasB.enabled)
    theShader.setUniform("u_lineStrength2",gasB.lineStrength)
    theShader.setUniform("u_electrified2",gasB.electrified)
    
    
    canvas2.shader(theShader);
    canvas2.rect(0,0,width,height);
    image(canvas2,0,0)
    
    push()
    translate(0.75*width,height/2)
    fill(255*0.1)
    stroke(30)
    strokeWeight(5)
    rectMode(CENTER)
    rect(0, 0, 0.1*width, 0.15*width)
    stroke(255)
    pop()
    
    if (gasA.enabled){
        gasA.draw();
        AplusButton.draw();
        AminusButton.draw();
        // AElectrifyButton.draw();
    }
    if (gasB.enabled){
        gasB.draw();
        BplusButton.draw();
        BminusButton.draw();
        // BElectrifyButton.draw();
    }
    if (showGraph){
        graph.draw();
    }
    
    whiteButton.draw();
    colorButton.draw();
    gasAButton.draw();
    gasBButton.draw();
    clicked = false;
    t++;
}

function invertLines(lines){
    newlines = []
    lines.forEach(line => {newlines.push(1-line)})
    return newlines
}

function enableWhiteLights(){
    whiteLight = !whiteLight;
    whiteButton.toggled = !whiteButton.toggled;
    
    colorLight = false;
    colorButton.toggled = false;
}

function enableColors(){
    whiteLight = false;
    whiteButton.toggled = false;
    
    colorLight = !colorLight;
    colorButton.toggled = !colorButton.toggled;
}

function toggleGasA(){
    gasA.enabled = !gasA.enabled;
    gasAButton.toggled = gasA.enabled;
}

function toggleGasB(){
    gasB.enabled = !gasB.enabled;
    gasBButton.toggled = gasB.enabled;
}

function windowResized(){
    resizeCanvas(windowWidth*0.8, windowHeight*0.8);
    canvas2.resizeCanvas(windowWidth*0.8, windowHeight*0.8);
    initializeFields()}

function keyPressed(){
    // Press a to toggle shaded mode
    if (key == "g"){
        showGraph = !showGraph;
    }
}