import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class RoundedText extends StatelessWidget {
  final TextEditingController controller;
  final double height;
  final double width;
  final double radius;
  final int maxLines;
  final String hintText;
  const RoundedText(
      {Key? key,
      required this.controller,
      required this.height,
      required this.width,
      required this.radius,
      required this.maxLines,
      required this.hintText})
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
            isDense: true,
            contentPadding: EdgeInsets.symmetric(horizontal: 0.02.sh, vertical: 0.012.sh),
            enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(radius),
                borderSide: const BorderSide(color: Colors.grey)),
            focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(radius),
                borderSide: const BorderSide(color: Colors.black)),
                hintText: hintText,
          ),
        ));
  }
}
