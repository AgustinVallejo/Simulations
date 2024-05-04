precision mediump float;

// declare a uniform vec2 variable. We use a vec2 because the mouse has both x and y
// p5 will send data to this variable
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_pixelDensity;

// Blackbody uniforms
uniform vec3 u_color;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy/u_pixelDensity;
    float X = u_resolution.x/u_resolution.y;
    st.x *= X;

    vec2 star = vec2(0.7*X, 0.7);
    float d = distance(st,star);
    float glow = 0.;
    if (d<0.3){
        glow = 10.;
    }
    else {
        glow = 10.*exp(-d*10. + 3.);
    }

    gl_FragColor = vec4(u_color*(smoothstep(0.3,0.29,d)+glow), 1.0 );
}