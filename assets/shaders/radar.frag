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

void main() {
  float lineWidth = 0.01;
  float spreadAngle = 90.0;
  vec3 rimColor = vec3(1.,1.,0.);
  vec3 stepColor = vec3(0.1);

  vec2 coord = centeredCoordinates();
}