import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class UnderlineText extends StatelessWidget {
  final TextEditingController controller;
  final String text;
  final double height;
  final double width;
  final bool enabled;
  final bool isDense;
  final EdgeInsets contentPadding;
  final bool focus;
  final TextInputType inputType;
  const UnderlineText(
      {Key? key,
      required this.controller,
      required this.text,
      required this.height,
      required this.width,
      required this.enabled,
      required this.isDense,
      required this.contentPadding,
      required this.focus,
      required this.inputType})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      width: width,
      child: TextFormField(
          autofocus: focus,
          keyboardType: inputType,
          style: TextStyle(fontSize: 16.sp),
          controller: controller,
          enabled: enabled,
          decoration: InputDecoration(
            isDense: isDense,
            contentPadding: contentPadding,
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
              fontSize: 16.sp,
              color: Colors.grey,
            ),
          )),
    );
  }
}
