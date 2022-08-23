// ignore_for_file: unnecessary_null_comparison

import 'package:capstone_project/presenters/report_send_detail_page_presenter.dart';
import 'package:chewie/chewie.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class VideoPlayPart extends StatelessWidget {
  final ChewieController controller;
  final ReportSendDetailPagePresenter reportSendDetailPagePresenter;
  const VideoPlayPart(
      {Key? key,
      required this.controller,
      required this.reportSendDetailPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return controller != null
        ? Container(
            alignment: Alignment.center,
            child: buildVideoPlay(controller),
          )
        : SizedBox(
            height: 0.2.sh,
            child: const Center(
              child: CircularProgressIndicator(),
            ),
          );
  }
  Widget buildVideoPlay(
      ChewieController controller) {
    return SizedBox(
      height: 0.3.sh,
      width: 1.sw,
      child: Chewie(controller: controller),
    );
  }
}
