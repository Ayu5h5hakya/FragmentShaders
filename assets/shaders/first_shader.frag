#version 460 core

#include <flutter/runtime_effect.glsl>

precision mediump float;

uniform vec2 resolution;
uniform float time;
out vec4 fragColor;

#define PI 3.1415926535897932384626433832795
#define TIME_SCALE 0.0005

float vectorAngleInDegrees(vec2 coord) {
  float scaledTime = time * TIME_SCALE;
  vec2 ref = vec2(cos(scaledTime), sin(scaledTime));
  float dot = dot(coord, ref);
  float det = coord.x*ref.y - coord.y*ref.x;
  float angle = (atan(det,dot)) * 180./PI;
  return angle;
}

vec2 centeredCoordinates() {
  vec2 st = FlutterFragCoord().xy / resolution.xy;
  vec2 screen = (st - vec2(0.5)) * 2.0;
  screen.y *= resolution.y/ resolution.x;
  return screen;
}

float rimPct(float rad) {
    float pct1 = step(rad, 0.7);
    float pct2 = step(rad, 0.68);
    return pct1 * (1 - pct2);
}

float stepPct(float st, float rad) {
  float pct1 = step(rad, st);
  float pct2 = step(rad, st - 0.02);
  return pct1 * (1 - pct2);
}

void main() {

  float lineWidth = 0.01;
  float spreadAngle = 90.0;
  vec3 rimColor = vec3(1.,1.,0.);
  vec3 stepColor = vec3(0.1);

  vec2 coord = centeredCoordinates();

  float dist = length(coord);

  float rimPct = rimPct(dist);
  
  float stepPct = stepPct(0.1, dist) + stepPct(0.3, dist) + stepPct(0.5, dist);

  float xPct = 0.0;
  if(abs(coord.x) < lineWidth && dist < 0.7) xPct = 1.0;

  float yPct = 0.0;
  if(abs(coord.y) < lineWidth && dist < 0.7) yPct = 1.0;
  
  vec3 color = rimColor * rimPct;
  
  if(stepPct != 0.0 || rimPct != 0.0) {
    color += stepColor*stepPct;
  } else {
    color += xPct*stepColor + yPct*stepColor;
  }

  float angle = vectorAngleInDegrees(coord);
  if(angle >= 0.0 && angle <=spreadAngle && dist <0.682) {
    fragColor = vec4(mix(vec3(.7,.7,0.),color,smoothstep(0., spreadAngle, angle)),1.);
  } else {
    fragColor = vec4(color,1.);
  
  }
}