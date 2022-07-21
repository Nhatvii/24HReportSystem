import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class RoundedTextIcon extends StatelessWidget {
  final double height;
  final double width;
  final double radius;
  final TextEditingController controller;
  final IconData? icon;
  final String search;
  final Function function;
  const RoundedTextIcon({
    Key? key,
    required this.height,
    required this.width,
    required this.radius,
    required this.controller,
    this.icon,
    required this.search,
    required this.function,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: height,
        width: width,
        child: TextFormField(
          controller: controller,
          textAlignVertical: TextAlignVertical.center,
          decoration: InputDecoration(
            isCollapsed: true,
            enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(radius),
                borderSide: const BorderSide(color: Colors.black)),
            focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(radius),
                borderSide: BorderSide(color: Colors.grey.shade300)),
            prefixIcon: Icon(
              icon,
              size: 25.sp,
              color: Colors.blue,
            ),
          ),
          onFieldSubmitted: (search) {
            function(search);
          },
        ));
  }
}
