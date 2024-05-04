precision mediump float;

// Global uniforms
uniform float u_time;
uniform float u_pixelDensity;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform bool u_whiteLight;
uniform bool u_colorLight;

// Arrays for depths of each line
uniform float u_lineStrength1[3];
uniform float u_lineStrength2[3];

// Lines
uniform float u_lines1[3];
uniform float u_lines2[3];

// GasTubes activated?
uniform bool u_gasAON;
uniform bool u_gasBON;

// GasTubes Electrified
uniform bool u_electrified1;
uniform bool u_electrified2;

float wave (
    in vec2 st,
    in float w, // Width
    in float dt, // Timestep
    in float dy, // Vertical position
    in float f, // Wavelength
    in float A, // Amplitude
    in float phase){
    /**
    * Creates the wave form by multiplying smoothsteps
    */
    float singleWave = A*sin(f*(st.x + dt/100.+phase));
    return (smoothstep(singleWave+dy-w,singleWave+dy,st.y)*
     smoothstep(singleWave+dy+w,singleWave+dy,st.y));
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec3 h2rgb(in float f){
    return hsb2rgb(vec3(f,1.0,0.01));
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float lineProfile(in vec2 st, in float line, in float lineWidth){
    return smoothstep(line - lineWidth, line + lineWidth,st.y)*
            smoothstep(line + lineWidth, line - lineWidth,st.y)*
            step(0.83,st.x)*(1.-step(0.95,st.x));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy/u_pixelDensity;

    vec3 col = vec3(0.0); // Background color

    float lfrac = clamp(0.8*u_mouse.y,0.,0.8); // Mouse position for wavecolor
    vec3 waveColor = hsb2rgb(vec3(lfrac,1.0,1.0));

    // Wave properties
    float A = 0.05; // Amplitude
    float w = 0.01; // Width
    float dt = -20.*u_time; // Timestep
    float dy = 0.5; // Vertical position
    float lambda = map(lfrac, 0.,1., 30.,70.); // Wavelength

    if (u_whiteLight){
        float lightWidth = 0.1; // White lightbar
        col += smoothstep(0.5-lightWidth,0.5+lightWidth,st.y)*
                (1.-smoothstep(0.5-lightWidth,0.5+lightWidth,st.y));

        float ii = 0.; // Counter to differenciate between waves
        float k = 0.008; // Phase difference
        lambda = 30.; // Constant wavelength. If not, they get out of phase very quickly
        ii++;
        col += wave(st,w*3.,dt,dy,lambda,A,k*ii)*vec3(1.,0.,0.);
        ii++;
        col += wave(st,w*3.,dt,dy,lambda,A,k*ii)*vec3(0.,1.,0.);
        ii++;
        col += wave(st,w*3.,dt,dy,lambda,A,k*ii)*vec3(0.,0.,1.);
    }
    else if (u_colorLight) {
        col += wave(st,w,dt,dy,lambda,A,0.)*waveColor;
        col += 0.8*wave(st,w*5.,dt,dy,lambda,A,0.)*waveColor;
        col += 2.*wave(st,w*.5,dt,dy,lambda,A,0.)*vec3(1.);
    }

    col *= (1.0 - step(0.8,st.x)); // Black bar to the right
    col += step(0.8,st.x)*0.1; // Grey area

    col *= (1.-step(0.83,st.x)*(1.-step(0.95,st.x))); // Black bar for spectrum
    float ycolor = map(st.y,0.,1., 0.,0.8); // Constrain colors hue
    float colorWidth = 0.05;

    if (u_whiteLight){
        col += 100.*step(0.83,st.x)*(1.-step(0.95,st.x))*h2rgb(ycolor); // Full color spectrum
    }
    else if (u_colorLight) {
        col += 1000.*step(0.83,st.x)*(1.-step(0.95,st.x))*h2rgb(ycolor)* // Part of spectrum
            smoothstep(u_mouse.y-colorWidth, u_mouse.y+colorWidth, st.y)*
            (1.-smoothstep(u_mouse.y-colorWidth, u_mouse.y+colorWidth, st.y));
    }

    float emisivity = 15.;
    float lineWidth = 0.01;
    if (u_colorLight){
        emisivity *= 1./3.;
    }
    for (int i = 0; i < 3; i++){
        if (u_gasAON){
            lineWidth = 0.015*min(u_lineStrength1[i],1.);
            float lineStrength = 10.*u_lineStrength1[i];
            float line = u_lines1[i];

            col *= 1. - min(1.,lineStrength*lineProfile(st,line,lineWidth));
            col += emisivity*h2rgb(ycolor)*lineStrength*lineProfile(st,line,2.*lineWidth);
        }
        if (u_gasBON){
            lineWidth = 0.015*min(u_lineStrength2[i],1.);
            float lineStrength = 10.*u_lineStrength2[i];
            float line = u_lines2[i];

            col *= 1. - min(1.,lineStrength*lineProfile(st,line,lineWidth));
            col += emisivity*h2rgb(ycolor)*lineStrength*lineProfile(st,line,2.*lineWidth);
        }
    }

    gl_FragColor = vec4(col,0.0);
}