import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class UnderlineTextIcon extends StatelessWidget {
  final double height;
  final double width;
  final TextEditingController controller;
  final bool obscureText;
  final String text;
  final Function() function;
  final Widget icon;
  const UnderlineTextIcon({
    Key? key,
    required this.height,
    required this.width,
    required this.controller,
    required this.obscureText,
    required this.text,
    required this.function,
    required this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      width: width,
      child: TextFormField(
          style: TextStyle(fontSize: 16.sp),
          controller: controller,
          obscureText: obscureText,
          decoration: InputDecoration(
              enabledBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: Colors.grey, width: 0.5.w),
              ),
              focusedBorder: UnderlineInputBorder(
                borderSide: BorderSide(color: Colors.black, width: 0.5.w),
              ),
              border: UnderlineInputBorder(
                borderSide: BorderSide(color: Colors.grey, width: 0.5.w),
              ),
              labelText: text,
              labelStyle: TextStyle(
                fontSize: 18.sp,
                color: Colors.grey,
              ),
              suffixIcon: GestureDetector(onTap: function, child: icon))),
    );
  }
}
