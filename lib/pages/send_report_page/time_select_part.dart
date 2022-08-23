import 'package:capstone_project/models/send_report_page_model.dart';
import 'package:capstone_project/presenters/send_report_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class TimeSelectPart extends StatelessWidget {
  final SendReportPageModel sendReportPageModel;
  final SendReportPagePresenter sendReportPagePresenter;
  const TimeSelectPart(
      {Key? key,
      required this.sendReportPageModel,
      required this.sendReportPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.only(bottom: 0.005.sh),
              child: Text(
                'Thời Gian Xảy Ra ',
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
        SizedBox(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GestureDetector(
                behavior: HitTestBehavior.translucent,
                onTap: () => sendReportPagePresenter.selectDateTime(context),
                child: Container(
                  padding: EdgeInsets.only(left: 0.01.sh, right: 0.01.sh, bottom: 0.01.sh),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.calendar_month,
                        color: Colors.blue,
                      ),
                      SizedBox(
                        width: 0.005.sh,
                      ),
                      // Text(
                      //   'Chọn ngày giờ',
                      //   style: TextStyle(
                      //     fontSize: 14.sp,
                      //     fontWeight: FontWeight.w500,
                      //   ),
                      // ),
                      Text(
                        sendReportPageModel.date.text.isEmpty
                            ? 'Chọn ngày giờ'
                            : '${sendReportPageModel.date.text} ${sendReportPageModel.time.text}',
                        style: TextStyle(
                          fontSize: 14.sp,
                          color: Colors.blue,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
