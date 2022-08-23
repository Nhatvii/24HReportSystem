import 'package:capstone_project/components/rounded_text.dart';
import 'package:capstone_project/models/send_report_page_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class DescriptionTextPart extends StatelessWidget {
  final SendReportPageModel sendReportPageModel;
  const DescriptionTextPart({Key? key, required this.sendReportPageModel})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.only(bottom: 0.01.sh),
              child: Text(
                'Mô Tả ',
                style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w700),
              ),
            ),
            Text('*',
                style: TextStyle(
                    color: Colors.red,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w700)),
          ],
        ),
        RoundedText(
          height: 0.12.sh,
          width: 1.sw,
          radius: 15.r,
          maxLines: 4,
          controller: sendReportPageModel.description,
          hintText: 'Mô tả tình huống',
        ),
      ],
    );
  }
}
