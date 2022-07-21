import 'package:flutter/material.dart';

class RoundedText extends StatelessWidget {
  final TextEditingController controller;
  final double height;
  final double width;
  final double radius;
  final int maxLines;
  final VoidCallback function;
  const RoundedText(
      {Key? key,
      required this.controller,
      required this.height,
      required this.width,
      required this.radius,
      required this.maxLines,
      required this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: height,
        width: width,
        child: TextFormField(
          controller: controller,
          maxLines: maxLines == 0 ? 1 : maxLines,
          decoration: InputDecoration(
            enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(radius),
                borderSide: const BorderSide(color: Colors.grey)),
            focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(radius),
                borderSide: const BorderSide(color: Colors.black)),
          ),
          onTap: function,
        ));
  }
}
