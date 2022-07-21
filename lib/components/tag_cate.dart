import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class TagCate extends StatelessWidget {
  const TagCate({
    Key? key,
    required this.text,
    required this.isBeingSelected,
  }) : super(key: key);

  final String text;
  final bool isBeingSelected;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 0.035.sw,),
      margin: EdgeInsets.only(right: 0.03.sw),
      alignment: Alignment.center,
      decoration: isBeingSelected
          ? BoxDecoration(
              gradient: const LinearGradient(colors: <Color>[
                Color(0xFF56CCF2),
                Color(0xFF2F80ED),
              ]),
              borderRadius: BorderRadius.circular(10.r),
            )
          : BoxDecoration(
              color: Colors.white,
              border: Border.all(color: Colors.black),
              borderRadius: BorderRadius.circular(10.r),
            ),
      constraints: BoxConstraints(
        maxHeight: 0.043.sh,
      ),
      child: isBeingSelected
          ? Text(
              'Lừa Đảo Qua $text',
              style: TextStyle(color: Colors.white, fontSize: 13.sp),
            )
          : Text(
              'Lừa Đảo Qua $text',
              style: TextStyle(color: Colors.black, fontSize: 13.sp),
            ),
    );
  }
}
