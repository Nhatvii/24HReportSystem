import 'package:capstone_project/entities/report.dart';
import 'package:capstone_project/models/report_send_detail_page_model.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ReportSendInfoDetailPart extends StatelessWidget {
  final ReportSendDetailPageModel reportSendDetailPageModel;
  const ReportSendInfoDetailPart(
      {Key? key, required this.reportSendDetailPageModel})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Report>(
        future: reportSendDetailPageModel.fetchReportDetail,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return SizedBox(
              height: 0.9.sh,
              width: 1.sw,
              child: const Center(
                child: CircularProgressIndicator(),
              ),
            );
          }
          if (snapshot.hasData) {
            return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Text(
                            'Ngày gửi: ',
                            style: TextStyle(
                                fontSize: 14.sp, fontWeight: FontWeight.w500),
                          ),
                          Text(
                            DateFormat('dd-MM-yyyy')
                                .format(snapshot.data!.createTime),
                            style: TextStyle(fontSize: 13.sp),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Text(
                            'Trạng thái: ',
                            style: TextStyle(
                                fontSize: 14.sp, fontWeight: FontWeight.w500),
                          ),
                          Text(
                            snapshot.data!.status == 'New'
                                ? 'Mới'
                                : 'Đang duyệt',
                            style: TextStyle(fontSize: 13.sp),
                          ),
                        ],
                      )
                    ],
                  ),
                  SizedBox(
                    height: 0.01.sh,
                  ),
                  Divider(
                    thickness: 0.001.sh,
                    color: Colors.grey,
                    indent: 0.02.sh,
                    endIndent: 0.02.sh,
                  ),
                  SizedBox(
                    height: 0.01.sh,
                  ),
                  Text(
                    'Địa điểm xảy ra',
                    style:
                        TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
                  ),
                  SizedBox(
                    height: 0.005.sh,
                  ),
                  Text(
                    snapshot.data!.location,
                    style: TextStyle(
                      fontSize: 12.sp,
                    ),
                  ),
                  SizedBox(
                    height: 0.01.sh,
                  ),
                  Text(
                    'Thời gian xảy ra',
                    style:
                        TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
                  ),
                  SizedBox(
                    height: 0.005.sh,
                  ),
                  Text(
                    DateFormat('dd-MM-yyyy').format(snapshot.data!.timeFraud),
                    style: TextStyle(
                      fontSize: 12.sp,
                    ),
                  ),
                  SizedBox(
                    height: 0.01.sh,
                  ),
                  Text(
                    'Mô tả',
                    style:
                        TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
                  ),
                  SizedBox(
                    height: 0.005.sh,
                  ),
                  Text(
                    snapshot.data!.description,
                    style: TextStyle(
                      fontSize: 12.sp,
                    ),
                  ),
                  SizedBox(
                    height: 0.01.sh,
                  ),
                  Text(
                    'Phương tiện truyền thông',
                    style:
                        TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
                  ),
                  SizedBox(
                    height: 0.01.sh,
                  ),
                  Container(
                    padding: EdgeInsets.all(0.002.sh),
                    height: 0.35.sh,
                    width: 1.sw,
                    child: GridView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: 10,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 4,
                            crossAxisSpacing: 0.003.sh,
                            mainAxisSpacing: 0.004.sw),
                        itemBuilder: (context, index) {
                          return SizedBox(
                            height: 0.011.sh,
                            width: 0.022.sw,
                            child: Image.asset(
                              'assets/images/nhay.jpg',
                              fit: BoxFit.cover,
                            ),
                          );
                        }),
                  )
                ]);
          }
          return Container();
        });
  }
}
