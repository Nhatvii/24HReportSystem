import 'dart:io';

import 'package:audioplayers/audioplayers.dart';
import 'package:capstone_project/models/send_report_page_model.dart';
import 'package:capstone_project/views/send_report_page_view.dart';
import 'package:flutter/material.dart';

class SendReportPagePresenter {
  late SendReportPageModel _sendReportPageModel;
  late SendReportPageView _sendReportPageView;

  SendReportPagePresenter() {
    _sendReportPageModel = SendReportPageModel();
  }

  set view(SendReportPageView view) {
    _sendReportPageView = view;
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  void init() {
    _sendReportPageModel.initRecorder();

    _sendReportPageModel.audioPlayer.onPlayerStateChanged.listen((state) {
      _sendReportPageModel.isPlaying = state == PlayerState.playing;
      _sendReportPageView.refreshData(_sendReportPageModel);
    });

    _sendReportPageModel.audioPlayer.onPlayerComplete.listen((event) {
      _sendReportPageModel.isPlaying = false;
      _sendReportPageView.refreshData(_sendReportPageModel);
    });

    _sendReportPageModel.audioPlayer.onDurationChanged.listen((newDuration) {
      _sendReportPageModel.duration = newDuration;
      _sendReportPageView.refreshData(_sendReportPageModel);
    });

    _sendReportPageModel.audioPlayer.onPositionChanged.listen((newDuration) {
      _sendReportPageModel.position = newDuration;
      _sendReportPageView.refreshData(_sendReportPageModel);
    });

    _sendReportPageModel.getInstance().then((value) {
      _sendReportPageModel.email = value;
      _sendReportPageView.refreshData(_sendReportPageModel);
    });
  }

  void dispose() {
    _sendReportPageModel.recorder.closeRecorder();
    _sendReportPageModel.audioPlayer.dispose();
    // for (var i in _sendReportPageModel.listFile) {
    //   int num = 0;
    //   _sendReportPageModel.removeFileFromFirebase(i, num);
    //   num++;
    // }
  }

  void selectedDate(
      BuildContext context, DateTime date, TextEditingController text) {
    _sendReportPageModel.selectedDate(context, date, text).then(
        (value) => {_sendReportPageView.refreshData(_sendReportPageModel)});
  }

  void selectedTime(
      BuildContext context, TimeOfDay time, TextEditingController text) {
    _sendReportPageModel.selectedTime(context, time, text).then(
        (value) => {_sendReportPageView.refreshData(_sendReportPageModel)});
  }

  void selectFile() {
    _sendReportPageModel.selectFile().whenComplete(
        () => _sendReportPageView.refreshData(_sendReportPageModel));
  }

  void removeImage(int index, File file) {
    _sendReportPageModel.removeSelectFileFromFirebase(file, index).whenComplete(
        () => _sendReportPageView.refreshData(_sendReportPageModel));
  }

  void anonymousBox() {
    _sendReportPageModel.isAnonymous = !_sendReportPageModel.isAnonymous;
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  void agreeBox() {
    _sendReportPageModel.isAgree = !_sendReportPageModel.isAgree;
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  void openCamera() {
    _sendReportPageModel.pickImage().then(
          (value) => _sendReportPageView.refreshData(_sendReportPageModel),
        );
  }

  Future isRecord() async {
    if (_sendReportPageModel.recorder.isRecording) {
      await _sendReportPageModel.stop();
    } else {
      await _sendReportPageModel.record();
    }
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  displayTimeRecord() {
    _sendReportPageModel.twoDigitMinutes = _sendReportPageModel.twoDigits(
        _sendReportPageModel.recordDuration!.inMinutes.remainder(60));
    _sendReportPageModel.twoDigitSeconds = _sendReportPageModel.twoDigits(
        _sendReportPageModel.recordDuration!.inSeconds.remainder(60));
  }

  deleteRecord() {
    _sendReportPageModel.delete();
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  playAudio() async {
    if (_sendReportPageModel.isPlaying) {
      await _sendReportPageModel.audioPlayer.pause();
    } else {
      try {
        await _sendReportPageModel.audioPlayer.play(
            DeviceFileSource(_sendReportPageModel.recordFile!.path),
            volume: 1);
      } catch (e) {
        _sendReportPageView.showToast('Không có file để chạy');
      }
    }
  }

  playAudioInAnySecond(double value) async {
    final position = Duration(seconds: value.toInt());
    await _sendReportPageModel.audioPlayer.seek(position);

    await _sendReportPageModel.audioPlayer.resume();
  }

  void sendReport() {
    _sendReportPageModel
        .sendFormReport(
            _sendReportPageModel.location.text,
            _sendReportPageModel.date.text,
            _sendReportPageModel.time.text,
            _sendReportPageModel.description.text,
            _sendReportPageModel.listImageString,
            _sendReportPageModel.isAnonymous)
        .then((value) => {
              if (value['error'] == null)
                {
                  _sendReportPageView.showToast('Gửi thành công'),
                  if (_sendReportPageModel.email != null)
                    {
                      _sendReportPageView.navigateToShowReportPage(),
                    }
                  else
                    {
                      _sendReportPageView.navigateToHomePage(),
                    }
                }
              else
                {
                  _sendReportPageView.showToast(value['message']),
                }
            });
    _sendReportPageView.refreshData(_sendReportPageModel);
  }
}
