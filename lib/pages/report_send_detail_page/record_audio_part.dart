import 'package:capstone_project/entities/report_detail.dart';
import 'package:capstone_project/models/report_send_detail_page_model.dart';
import 'package:capstone_project/presenters/report_send_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class RecordAudioPart extends StatelessWidget {
  final ReportSendDetailPageModel reportSendDetailPageModel;
  final ReportSendDetailPagePresenter reportSendDetailPagePresenter;
  const RecordAudioPart(
      {Key? key,
      required this.reportSendDetailPageModel,
      required this.reportSendDetailPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<ReportDetail>>(
        future: reportSendDetailPageModel.fetchListRecord,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const SizedBox(
              child: Center(
                child: CircularProgressIndicator(),
              ),
            );
          }
          if (snapshot.hasData) {
            if (snapshot.data!.isNotEmpty) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  reportSendDetailPageModel.recordUrl!.isNotEmpty
                      ? Column(
                          children: [
                            Slider(
                                min: 0,
                                max: reportSendDetailPageModel
                                    .duration.inSeconds
                                    .toDouble(),
                                value: reportSendDetailPageModel
                                    .position.inSeconds
                                    .toDouble(),
                                onChanged: (value) {
                                  reportSendDetailPagePresenter
                                      .playAudioInAnySecond(value);
                                }),
                            Padding(
                              padding:
                                  EdgeInsets.symmetric(horizontal: 0.005.sh),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(reportSendDetailPageModel.formatTime(
                                      reportSendDetailPageModel.position)),
                                  GestureDetector(
                                    onTap: () => reportSendDetailPagePresenter
                                        .playAudio(),
                                    child: Icon(
                                      reportSendDetailPageModel.isPlaying
                                          ? FontAwesomeIcons.pause
                                          : FontAwesomeIcons.play,
                                      size: 18.sp,
                                      color: Colors.blue,
                                    ),
                                  ),
                                  Text(reportSendDetailPageModel.formatTime(
                                      reportSendDetailPageModel.duration -
                                          reportSendDetailPageModel.position)),
                                ],
                              ),
                            )
                          ],
                        )
                      : Container()
                ],
              );
            } else {
              return Padding(
                padding: EdgeInsets.only(left: 0.01.sh),
                child: Text(
                  'Không có file ghi âm',
                  style: TextStyle(
                    fontSize: 13.sp,
                  ),
                ),
              );
            }
          }
          return Container();
        });
  }
}
