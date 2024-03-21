#version 460 core

#include <flutter/runtime_effect.glsl>

uniform vec4 uColor;
uniform vec2 uSize;

out vec4 FragColor;

void main() {
    FragColor = uColor; 
}