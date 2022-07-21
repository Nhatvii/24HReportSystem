import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class IconAndNumber extends StatelessWidget {
  final double height;
  final double width;
  final Widget icon;
  final Text text;
  const IconAndNumber(
      {Key? key,
      required this.height,
      required this.width,
      required this.icon,
      required this.text})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(left: 10.w),
      constraints: BoxConstraints(
        maxHeight: height,
        minWidth: width,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          icon,
          SizedBox(
            width: 5.w,
          ),
          text
        ],
      ),
    );
  }
}
