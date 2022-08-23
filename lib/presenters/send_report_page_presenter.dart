// ignore_for_file: use_build_context_synchronously

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
      _sendReportPageModel.accountId = value;
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

  void selectDateTime(BuildContext context) async {
    DateTime? date = await _sendReportPageModel.selectedDate(
        context, _sendReportPageModel.today);
    if (date == null) return;

    TimeOfDay? time = await _sendReportPageModel.selectedTime(
        context, _sendReportPageModel.todayTime);
    if (time == null) return;

    _sendReportPageModel.date.text = '${date.day}-${date.month}-${date.year}';
    _sendReportPageModel.time.text =
        '${_sendReportPageModel.twoDigits(time.hour)}:${_sendReportPageModel.twoDigits(time.minute)}';
    canSendReport();
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  void selectFile() async {
    await _sendReportPageModel
        .selectFile()
        .onError((error, stackTrace) => {
              _sendReportPageView.showToast(error.toString()),
            })
        .whenComplete(
            () => _sendReportPageView.refreshData(_sendReportPageModel));
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  void removeMedia(int index, File file) {
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

  void openCamera() async {
    await _sendReportPageModel.pickImage().whenComplete(
          () => _sendReportPageView.refreshData(_sendReportPageModel),
        );
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  void openVideo() async {
    await _sendReportPageModel
        .pickVideo()
        .onError((error, stackTrace) => {
              _sendReportPageView.showToast(error.toString()),
            })
        .whenComplete(
          () => _sendReportPageView.refreshData(_sendReportPageModel),
        );
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  void canSendReport() {
    if (_sendReportPageModel.location.text.trim().isNotEmpty &&
        _sendReportPageModel.date.text.trim().isNotEmpty) {
      _sendReportPageModel.isSend = true;
    } else {
      _sendReportPageModel.isSend = false;
    }
    _sendReportPageView.refreshData(_sendReportPageModel);
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
    _sendReportPageModel
        .delete(
            _sendReportPageModel.recordPath, _sendReportPageModel.recordFile)
        .whenComplete(
            () => _sendReportPageView.refreshData(_sendReportPageModel));
  }

  playAudio() async {
    if (_sendReportPageModel.isPlaying) {
      await _sendReportPageModel.audioPlayer.pause();
    } else {
      try {
        // await _sendReportPageModel.audioPlayer.play(
        //     DeviceFileSource(_sendReportPageModel.recordFile.path),
        //     volume: 1);
        await _sendReportPageModel.audioPlayer
            .play(UrlSource(_sendReportPageModel.recordUrl!), volume: 0.25);
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
    if (_sendReportPageModel.location.text.trim().isEmpty &&
        _sendReportPageModel.date.text.trim().isEmpty &&
        _sendReportPageModel.description.text.trim().isEmpty) {
      _sendReportPageView.showToast('Nhập đầy đủ thông tin yêu cầu');
      _sendReportPageView.refreshData(_sendReportPageModel);
    } else {
      _sendReportPageModel.reportApi
          .sendFormReport(
              _sendReportPageModel.location.text,
              _sendReportPageModel.date.text,
              _sendReportPageModel.time.text,
              _sendReportPageModel.description.text,
              _sendReportPageModel.listImageString,
              _sendReportPageModel.listVideoString,
              _sendReportPageModel.recordAudioString,
              _sendReportPageModel.isAnonymous)
          .then((value) => {
                if (value['error'] == null)
                  {
                    _sendReportPageView.showToast('Gửi thành công'),
                    if (_sendReportPageModel.accountId != null)
                      {
                        _sendReportPageView.navigateToShowReportPage(),
                        // _sendReportPageModel = SendReportPageModel(),
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

  void chooseLocation(Map location) {
    _sendReportPageModel.location.text = location['description'];
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  // openMapPage(BuildContext context) async {
  //   Navigator.push(
  //       context,
  //       MaterialPageRoute(
  //         builder: (context) => const MapLocationPage(),
  //       )).then((value) {
  //     _sendReportPageModel.location.text = value;
  //     _sendReportPageView.refreshData(_sendReportPageModel);
  //   });
  // }
}
