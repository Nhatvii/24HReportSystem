import 'package:capstone_project/models/send_report_page_model.dart';
import 'package:capstone_project/presenters/send_report_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class RecordReportAudioPart extends StatelessWidget {
  final SendReportPageModel sendReportPageModel;
  final SendReportPagePresenter sendReportPagePresenter;
  const RecordReportAudioPart(
      {Key? key,
      required this.sendReportPageModel,
      required this.sendReportPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.only(bottom: 0.005.sh),
              child: Text(
                'Ghi Âm',
                style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w700),
              ),
            ),
            sendReportPageModel.recordFile.path.isNotEmpty
                ? ClipOval(
                    child: Material(
                      color: Colors.red,
                      child: InkWell(
                        onTap: () => sendReportPagePresenter.deleteRecord(),
                        child: SizedBox(
                            width: 0.12.sw,
                            height: 0.06.sh,
                            child: Icon(
                              FontAwesomeIcons.trash,
                              size: 14.sp,
                              color: Colors.white,
                            )),
                      ),
                    ),
                  )
                : Container(
                    margin: EdgeInsets.only(right: 0.02.sw),
                    alignment: Alignment.center,
                    child: TextButton(
                        style: TextButton.styleFrom(
                          padding: EdgeInsets.all(0.015.sh),
                          side: BorderSide(
                            color: Colors.grey,
                            width: 0.002.sw,
                          ),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10.r)),
                        ),
                        onPressed: () {
                          sendReportPagePresenter.isRecord();
                        },
                        child: sendReportPageModel.recorder.isRecording
                            ? Row(
                                children: [
                                  const Icon(
                                    FontAwesomeIcons.stop,
                                    size: 20,
                                  ),
                                  SizedBox(
                                    width: 0.005.sh,
                                  ),
                                  StreamBuilder<RecordingDisposition>(
                                    stream:
                                        sendReportPageModel.recorder.onProgress,
                                    builder: (context, snapshot) {
                                      sendReportPageModel.recordDuration =
                                          snapshot.hasData
                                              ? snapshot.data!.duration
                                              : Duration.zero;
                                      sendReportPagePresenter
                                          .displayTimeRecord();
                                      return Text(
                                        '${sendReportPageModel.twoDigitMinutes}:${sendReportPageModel.twoDigitSeconds}',
                                        style: TextStyle(
                                            fontSize: 14.sp,
                                            color: Colors.black),
                                      );
                                    },
                                  ),
                                ],
                              )
                            : Row(
                                children: [
                                  const Icon(
                                    FontAwesomeIcons.microphone,
                                    size: 20,
                                  ),
                                  SizedBox(
                                    width: 0.005.sh,
                                  ),
                                  Text(
                                    'Ghi Âm',
                                    style: TextStyle(
                                        fontSize: 14.sp, color: Colors.black),
                                  ),
                                ],
                              )),
                  ),
          ],
        ),
        sendReportPageModel.recordFile.path.isNotEmpty
            ? Column(
                children: [
                  Slider(
                    min: 0,
                    max: sendReportPageModel.duration.inSeconds.toDouble(),
                    value: sendReportPageModel.position.inSeconds.toDouble(),
                    onChanged: (value) {
                      sendReportPagePresenter.playAudioInAnySecond(value);
                    },
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 0.005.sh),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(sendReportPageModel
                            .formatTime(sendReportPageModel.position)),
                        GestureDetector(
                          onTap: () => sendReportPagePresenter.playAudio(),
                          child: Icon(
                            sendReportPageModel.isPlaying
                                ? FontAwesomeIcons.pause
                                : FontAwesomeIcons.play,
                            size: 18.sp,
                            color: Colors.blue,
                          ),
                        ),
                        Text(sendReportPageModel.formatTime(
                            sendReportPageModel.duration -
                                sendReportPageModel.position)),
                      ],
                    ),
                  ),
                ],
              )
            : Container(),
      ],
    );
  }
}
