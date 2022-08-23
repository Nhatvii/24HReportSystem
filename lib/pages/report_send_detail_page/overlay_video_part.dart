import 'package:capstone_project/presenters/report_send_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class OverlayVideoPart extends StatelessWidget {
  final VideoPlayerController videoPlayerController;
  // final int indexVideo;
  final ReportSendDetailPagePresenter reportSendDetailPagePresenter;
  const OverlayVideoPart(
      {Key? key,
      required this.videoPlayerController,
      // required this.indexVideo,
      required this.reportSendDetailPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () => reportSendDetailPagePresenter.playOrPauseVideo(
          // indexVideo
          ),
      child: Stack(
        children: [
          playAndPauseVideo(),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: indicatorVideo(),
          ),
        ],
      ),
    );
  }

  Widget indicatorVideo() {
    return VideoProgressIndicator(
      videoPlayerController,
      allowScrubbing: true,
    );
  }

  Widget playAndPauseVideo() {
    return videoPlayerController.value.isPlaying
        ? Container()
        : Container(
            alignment: Alignment.center,
            color: Colors.black26,
            child: const Icon(
              Icons.play_arrow,
              color: Colors.white,
              size: 35,
            ));
  }
}
