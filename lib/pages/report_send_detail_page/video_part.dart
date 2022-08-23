import 'dart:io';

import 'package:capstone_project/entities/report_detail.dart';
import 'package:capstone_project/models/report_send_detail_page_model.dart';
import 'package:capstone_project/pages/report_send_detail_page/report_video_part.dart';
import 'package:capstone_project/presenters/report_send_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class VideoPart extends StatelessWidget {
  final ReportSendDetailPageModel reportSendDetailPageModel;
  final ReportSendDetailPagePresenter reportSendDetailPagePresenter;
  const VideoPart(
      {Key? key,
      required this.reportSendDetailPageModel,
      required this.reportSendDetailPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(left: 0.01.sh),
          child: Text(
            'Video',
            style: TextStyle(fontSize: 13.sp, fontWeight: FontWeight.w500),
          ),
        ),
        SizedBox(
          height: 0.01.sh,
        ),
        FutureBuilder<List<ReportDetail>>(
            future: reportSendDetailPageModel.fetchListVideo,
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
                  return Container(
                      height: 0.15.sh,
                      width: 1.sw,
                      alignment: Alignment.center,
                      child: ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount:
                              reportSendDetailPageModel.listVideos.length,
                          itemBuilder: (context, index) {
                            return Container(
                              margin: EdgeInsets.only(right: 0.01.sw),
                              child: Column(children: [
                                GestureDetector(
                                  onTap: () {
                                    reportSendDetailPagePresenter.watchVideo(
                                        reportSendDetailPageModel
                                            .listVideos[index]['url']!);
                                  },
                                  child: Container(
                                    height: 0.13.sh,
                                    width: 0.25.sw,
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                        color: Colors.grey.shade300,
                                        width: 1,
                                      ),
                                    ),
                                    child: Image.file(
                                      File(reportSendDetailPageModel
                                              .listVideos[index]['file'] ??
                                          ''),
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                ),
                              ]),
                            );
                          }));
                } else {
                  return Padding(
                    padding: EdgeInsets.only(left: 0.01.sh),
                    child: Text(
                      'Không có video',
                      style: TextStyle(
                        fontSize: 13.sp,
                      ),
                    ),
                  );
                }
              }
              return Container();
            }),
        SizedBox(
          height: 0.02.sh,
        ),
        reportSendDetailPageModel.controller!.value.isInitialized
            ? VideoPlayPart(
                // controller: reportSendDetailPageModel.controller!,
                controller: reportSendDetailPageModel.chewieController!,
                reportSendDetailPagePresenter: reportSendDetailPagePresenter)
            : Container(),
      ],
    );
  }
}
