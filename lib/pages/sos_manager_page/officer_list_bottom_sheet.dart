import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class OfficerListBottomSheet extends StatefulWidget {
  const OfficerListBottomSheet({super.key});

  @override
  State<OfficerListBottomSheet> createState() => _OfficerListBottomSheetState();
}

class _OfficerListBottomSheetState extends State<OfficerListBottomSheet> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 0.6.sh,
      width: 1.sw,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(25.r)),
      ),
    );
  }
}
