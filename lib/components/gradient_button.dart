import 'package:flutter/material.dart';

class GradientButton extends StatelessWidget {
  final double height;
  final double width;
  final List<Color> colors;
  final double radius;
  final Widget child;
  // final TextStyle style;
  const GradientButton({
    Key? key,
    required this.height,
    required this.width,
    required this.colors,
    required this.radius,
    required this.child,
    // required this.style,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      width: width,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: colors),
        borderRadius: BorderRadius.circular(radius),
      ),
      child: child,
    );
  }
}
