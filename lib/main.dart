import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_shaders/flutter_shaders.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Simple Shader Demo',
      theme: ThemeData(
        colorSchemeSeed: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: RadarWidget(),
    );
  }
}

class RadarWidget extends StatefulWidget {
  const RadarWidget({super.key});

  @override
  State<RadarWidget> createState() => _RadarWidgetState();
}

class _RadarWidgetState extends State<RadarWidget>
    with SingleTickerProviderStateMixin {
  late Ticker _ticker;

  Duration _currentTime = Duration.zero;

  @override
  void initState() {
    super.initState();
    _ticker = createTicker((Duration elapsed) {
      setState(() {
        _currentTime = elapsed;
      });
    });
    _ticker.start();
  }

  @override
  Widget build(BuildContext context) {
    return ShaderBuilder(
      assetKey: 'assets/shaders/radar.frag',
      (context, shader, child) => CustomPaint(
        size: MediaQuery.of(context).size,
        painter: ShaderPainter(
          shader: shader,
          timer: _currentTime,
        ),
      ),
      child: const Center(
        child: CircularProgressIndicator(),
      ),
    );
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }
}

class ShaderPainter extends CustomPainter {
  ShaderPainter({required this.shader, required this.timer});
  ui.FragmentShader shader;
  Duration timer;

  @override
  void paint(Canvas canvas, Size size) {
    shader.setFloat(0, size.width);
    shader.setFloat(1, size.height);
    shader.setFloat(2, timer.inMilliseconds.toDouble());
    final paint = Paint()..shader = shader;
    canvas.drawRect(
      Rect.fromLTWH(0, 0, size.width, size.height),
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}
