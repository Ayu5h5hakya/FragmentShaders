#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 palette(float t) {
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.5);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a +b*cos(6.28318*(c*t+d));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st -= vec2(0.5);
    st *= 2.0;
    st.x *= u_resolution.x/ u_resolution.y;
    vec2 st0 = st;
    vec3 final = vec3(0.0);

    for(float i = 0.0; i <3.0;i++) {
            st = fract(st*1.5)-0.5;
    float d = length(st);

    vec3 col = vec3(d);

    d = cos((d+u_time*0.4)*8.0)/8.0;
    d = abs(d);

    d = .01/d;

    final += col * d;
    }

    gl_FragColor = vec4(final, 1.0);
}
