import 'dart:ui';

import 'package:flutter/material.dart';

late FragmentProgram fragmentProgram;

Future<void> main() async {
  fragmentProgram =
      await FragmentProgram.fromAsset('assets/shaders/first_shader.frag');
  runApp(const MyApp());
  ;
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: CustomPaint(
      painter: MyPainter(
        Colors.red,
        shader: fragmentProgram.fragmentShader(),
      ),
    ));
  }
}

class MyPainter extends CustomPainter {
  MyPainter(this.color, {required this.shader});

  final Color color;
  final FragmentShader shader;

  @override
  void paint(Canvas canvas, Size size) {
    shader.setFloat(0, color.red.toDouble() / 255);
    shader.setFloat(1, color.green.toDouble() / 255);
    shader.setFloat(2, color.blue.toDouble() / 255);
    shader.setFloat(3, color.alpha.toDouble() / 255);
    shader.setFloat(4, size.width);
    shader.setFloat(5, size.height);
    canvas.drawRect(
      Rect.fromLTWH(0, 0, size.width, size.height),
      Paint()..shader = shader,
    );
  }

  @override
  bool shouldRepaint(MyPainter oldDelegate) {
    return oldDelegate.color != color;
  }
}
