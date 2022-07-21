import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ListTileDrawer extends StatelessWidget {
  final Widget text;
  final Icon icon;
  final Function function;
  const ListTileDrawer(
      {Key? key,
      required this.text,
      required this.icon,
      required this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      dense: true,
      title: Row(
        children: [
          icon,
          SizedBox(
            width: 0.015.sw,
          ),
          text
        ],
      ),
      onTap: () => function(),
    );
  }
}
