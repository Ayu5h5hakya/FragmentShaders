#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mc = u_mouse.xy/u_resolution;
    float pct = distance(st, mc);
    gl_FragColor = vec4(vec3(smoothstep(0.2,0.3, pct)), 1.0);

}
