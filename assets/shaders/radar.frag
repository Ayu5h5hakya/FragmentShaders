#version 460 core

#include <flutter/runtime_effect.glsl>

precision mediump float;

uniform vec2 resolution;
uniform float time;
out vec4 fragColor;

#define PI 3.1415926535897932384626433832795
#define TIME_SCALE 0.0005

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
}