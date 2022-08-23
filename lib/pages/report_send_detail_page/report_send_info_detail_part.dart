import 'package:capstone_project/entities/report.dart';
import 'package:capstone_project/models/report_send_detail_page_model.dart';
import 'package:capstone_project/pages/report_send_detail_page/image_part.dart';
import 'package:capstone_project/pages/report_send_detail_page/record_audio_part.dart';
import 'package:capstone_project/pages/report_send_detail_page/video_part.dart';
import 'package:capstone_project/presenters/report_send_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ReportSendInfoDetailPart extends StatelessWidget {
  final ReportSendDetailPageModel reportSendDetailPageModel;
  final ReportSendDetailPagePresenter reportSendDetailPagePresenter;
  const ReportSendInfoDetailPart(
      {Key? key,
      required this.reportSendDetailPageModel,
      required this.reportSendDetailPagePresenter})
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
                  Padding(
                    padding: EdgeInsets.only(left: 0.01.sh),
                    child: Text(
                      snapshot.data!.location,
                      style: TextStyle(
                        fontSize: 13.sp,
                      ),
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
                  Padding(
                    padding: EdgeInsets.only(left: 0.01.sh),
                    child: Text(
                      'Ngày ${DateFormat('dd-MM-yyyy').format(snapshot.data!.timeFraud)}  lúc ${DateFormat('hh:mm').format(snapshot.data!.timeFraud)}',
                      style: TextStyle(
                        fontSize: 13.sp,
                      ),
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
                  Padding(
                    padding: EdgeInsets.only(left: 0.01.sh),
                    child: Text(
                      snapshot.data!.description,
                      style: TextStyle(
                        fontSize: 13.sp,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 0.005.sh,
                  ),
                  Text(
                    'Ghi âm',
                    style:
                        TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
                  ),
                  SizedBox(
                    height: 0.005.sh,
                  ),
                  RecordAudioPart(
                      reportSendDetailPageModel: reportSendDetailPageModel,
                      reportSendDetailPagePresenter:
                          reportSendDetailPagePresenter),
                  SizedBox(
                    height: 0.01.sh,
                  ),
                  Text(
                    'Phương tiện truyền thông',
                    style:
                        TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
                  ),
                  SizedBox(
                    height: 0.02.sh,
                  ),
                  ImagePart(
                      reportSendDetailPageModel: reportSendDetailPageModel,
                      reportSendDetailPagePresenter:
                          reportSendDetailPagePresenter),
                  SizedBox(
                    height: 0.01.sh,
                  ),
                  VideoPart(
                      reportSendDetailPageModel: reportSendDetailPageModel,
                      reportSendDetailPagePresenter:
                          reportSendDetailPagePresenter),
                ]);
          }
          return Container();
        });
  }
}
