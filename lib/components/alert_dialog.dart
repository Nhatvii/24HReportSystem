import 'package:flutter/material.dart';

class AlertDialogCustom extends StatelessWidget {
  final Widget title;
  final Widget content;
  final Widget confirmFunction;
  final Widget cancelFunction;
  const AlertDialogCustom(
      {Key? key,
      required this.title,
      required this.content,
      required this.confirmFunction,
      required this.cancelFunction})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: title,
      content: content,
      actions: [
        confirmFunction,
        cancelFunction,
      ],
    );
  }
}
