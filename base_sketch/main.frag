precision mediump float;

// declare a uniform vec2 variable. We use a vec2 because the mouse has both x and y
// p5 will send data to this variable
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelDensity;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy/u_pixelDensity;
    float X = u_resolution.x/u_resolution.y;
    st.x *= X;

    gl_FragColor = vec4( 1.0 );
}