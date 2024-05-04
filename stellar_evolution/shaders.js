
let vertShader = `
precision highp float;

attribute vec3 aPosition;

void main() {
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    gl_Position = positionVec4;
}
`;

let fragShader = `
precision highp float;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelDensity;

uniform int u_N;
uniform vec3 u_stars[${MAX_STAR_COUNT}];
uniform vec3 u_colors[${MAX_STAR_COUNT}];

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy/u_pixelDensity;
  float X = u_resolution.x/u_resolution.y;
  st.x *= X;

  gl_FragColor = vec4(0.0);

  float brightness = 200.;
  
  for (int i = 0; i < ${MAX_STAR_COUNT}; i++) {
      if (i < u_N) {
          vec3 star = u_stars[i];
          star.x *= X;
          float r = star.z/5.;
          vec3 color = u_colors[i];

          float d = distance(st,star.xy);
          float glow = 0.0;
          if (d<r){
              glow += brightness*r;
          }
          else {
              glow += 0.5*brightness*exp(-pow((d-r),1.)*150.)*r;
          }

          gl_FragColor += vec4(color*glow,glow);
      }
  }
}
`;