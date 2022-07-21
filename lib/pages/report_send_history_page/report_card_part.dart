import 'package:capstone_project/entities/report.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:intl/intl.dart';

class ReportCardPart extends StatelessWidget {
  final Report report;
  final Function function;
  const ReportCardPart({Key? key, required this.report, required this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 0.2.sh,
      width: 1.sw,
      margin: EdgeInsets.only(bottom: 0.01.sh),
      child: GestureDetector(
        onTap: () => function(report.reportId),
        child: Card(
          elevation: 3,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.r),
          ),
          child: Padding(
            padding: EdgeInsets.all(0.02.sh),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Text(
                          'Ngày gửi: ',
                          style: TextStyle(
                              fontSize: 13.sp, fontWeight: FontWeight.w500),
                        ),
                        Text(
                          DateFormat('dd-MM-yyyy').format(report.createTime),
                          style: TextStyle(fontSize: 12.sp),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Text(
                          'Trạng thái: ',
                          style: TextStyle(
                              fontSize: 13.sp, fontWeight: FontWeight.w500),
                        ),
                        Text(
                          report.status == 'New' ? 'Mới' : 'Đang duyệt',
                          style: TextStyle(fontSize: 12.sp),
                        ),
                      ],
                    )
                  ],
                ),
                SizedBox(
                  height: 0.005.sh,
                ),
                Divider(
                  thickness: 0.001.sh,
                  color: Colors.grey,
                  indent: 0.02.sh,
                  endIndent: 0.02.sh,
                ),
                SizedBox(
                  height: 0.005.sh,
                ),
                Row(
                  children: [
                    Text(
                      'Địa điểm: ',
                      style: TextStyle(
                          fontSize: 13.sp, fontWeight: FontWeight.w500),
                    ),
                    SizedBox(
                      width: 0.66.sw,
                      child: Text(
                        report.location,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 1,
                        style: TextStyle(fontSize: 12.sp),
                      ),
                    ),
                  ],
                ),
                SizedBox(
                  height: 0.005.sh,
                ),
                Row(
                  children: [
                    Text(
                      'Thời gian: ',
                      style: TextStyle(
                          fontSize: 13.sp, fontWeight: FontWeight.w500),
                    ),
                    Text(
                      DateFormat('dd-MM-yyyy').format(report.timeFraud),
                      style: TextStyle(fontSize: 12.sp),
                    ),
                  ],
                ),
                SizedBox(
                   height: 0.005.sh,
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Mô tả: ',
                      style: TextStyle(
                          fontSize: 13.sp, fontWeight: FontWeight.w500),
                    ),
                    SizedBox(
                      width: 0.7.sw,
                      child: Text(
                        report.description,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 2,
                        style: TextStyle(fontSize: 12.sp),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
