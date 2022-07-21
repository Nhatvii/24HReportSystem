import 'package:flutter/material.dart';

class AvatarName extends StatelessWidget {
  final double height;
  final double width;
  final double radius;
  final String text;
  final double fontSize;
  const AvatarName({
    Key? key,
    required this.height,
    required this.width,
    required this.radius,
    required this.text,
    required this.fontSize,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      width: width,
      alignment: Alignment.center,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(radius),
          gradient: text != 'User'
              ? const LinearGradient(colors: [
                  Color(0xFF56CCF2),
                  Color(0xFF2F80ED),
                ])
              : const LinearGradient(colors: [
                  Color(0xFFE5E4E2),
                  Color(0xFFDBC1AC),
                ])),
      child: Text(
        text.substring(text.lastIndexOf(' ') + 1).substring(0, 1).toUpperCase(),
        style: TextStyle(
            fontSize: fontSize,
            color: Colors.white,
            fontWeight: FontWeight.w500),
      ),
    );
  }
}
