import 'package:flutter/material.dart';

class RoundButtonIcon extends StatelessWidget {
  final double height;
  final double width;
  final Color color;
  final Widget icon;
  final bool isShadow;
  const RoundButtonIcon(
      {super.key,
      required this.height,
      required this.width,
      required this.color,
      required this.icon,
      required this.isShadow});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      width: width,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
        boxShadow: [
          isShadow
              ? BoxShadow(
                  color: Colors.grey.withOpacity(0.5),
                  spreadRadius: 1,
                  blurRadius: 2,
                  offset: const Offset(0, 2))
              : const BoxShadow(),
        ],
      ),
      child: icon,
    );
  }
}
