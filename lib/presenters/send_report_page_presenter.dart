// ignore_for_file: use_build_context_synchronously, depend_on_referenced_packages

import 'dart:io';

import 'package:audioplayers/audioplayers.dart';
import 'package:capstone_project/models/send_report_page_model.dart';
import 'package:capstone_project/views/send_report_page_view.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path/path.dart';

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

  Future<String> sendFileToFirebase(File file) async {
    if (extension(file.path).contains('mp4')) {
      final fileName = basename(file.path);
      final destination = 'report_videos/$fileName';

      _sendReportPageModel.task =
          _sendReportPageModel.firebaseApi.uploadFile(destination, file);
      _sendReportPageModel.task!.snapshotEvents.listen((event) {
        _sendReportPageModel.uploadProgress =
            (event.bytesTransferred / event.totalBytes) * 100;
        _sendReportPageView.refreshData(_sendReportPageModel);
      });

      if (_sendReportPageModel.task == null) return "";

      final snapshot = await _sendReportPageModel.task!.whenComplete(() {});
      final urlDownload = await snapshot.ref.getDownloadURL();
      _sendReportPageModel.listVideoString.insert(0, urlDownload);
      return urlDownload;
    } else {
      final fileName = basename(file.path);
      final destination = 'report_images/$fileName';

      _sendReportPageModel.task =
          _sendReportPageModel.firebaseApi.uploadFile(destination, file);
      _sendReportPageModel.task!.snapshotEvents.listen((event) {
        _sendReportPageModel.uploadProgress =
            (event.bytesTransferred / event.totalBytes) * 100;
        _sendReportPageView.refreshData(_sendReportPageModel);
      });

      if (_sendReportPageModel.task == null) return "";

      final snapshot = await _sendReportPageModel.task!.whenComplete(() {});
      final urlDownload = await snapshot.ref.getDownloadURL();
      _sendReportPageModel.listImageString.insert(0, urlDownload);
      _sendReportPageModel.numberOfFile++;
      return urlDownload;
    }
  }

  Future selectFileFromDevice() async {
    final result = await FilePicker.platform.pickFiles(
        allowMultiple: true,
        type: FileType.custom,
        allowedExtensions: ['png', 'jpg', 'mp4']);

    if (result == null) return;
    for (var i in result.files) {
      File fileSelect = File(i.path!);
      if (extension(fileSelect.path).contains('mp4')) {
        if (_sendReportPageModel.listVideo.length < 2) {
          await sendFileToFirebase(fileSelect).then((stringUrl) async {
            await _sendReportPageModel.generateThumbnailVideo(stringUrl).then(
                (value) => {_sendReportPageModel.listVideo.insert(0, value)});
          });
        } else {
          throw 'Không được tải lên quá 2 video';
        }
      } else {
        await sendFileToFirebase(fileSelect).whenComplete(
            () => _sendReportPageModel.listImage.insert(0, fileSelect));
      }
    }
  }

  Future pickImage() async {
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.camera);
      if (image == null) return;
      final imagePermanent =
          await _sendReportPageModel.saveImagePermanently(image.path);
      _sendReportPageModel.file = imagePermanent;
      await sendFileToFirebase(_sendReportPageModel.file!).whenComplete(() =>
          _sendReportPageModel.listImage.insert(0, _sendReportPageModel.file!));
    } on PlatformException catch (e) {
      throw ('Failed to pick image: $e');
    }
  }

  Future pickVideo() async {
    try {
      if (_sendReportPageModel.listVideo.length < 2) {
        final video = await ImagePicker().pickVideo(source: ImageSource.camera);
        if (video == null) return;
        final videoPermanent =
            await _sendReportPageModel.saveImagePermanently(video.path);
        _sendReportPageModel.file = videoPermanent;
        await sendFileToFirebase(_sendReportPageModel.file!)
            .then((stringUrl) async {
          await _sendReportPageModel.generateThumbnailVideo(stringUrl).then(
              (value) => {_sendReportPageModel.listVideo.insert(0, value)});
        });
      } else {
        throw ('Không được tải lên quá 2 video');
      }
    } on PlatformException catch (e) {
      throw ('Failed to pick image: $e');
    }
  }

  void selectFile() async {
    await selectFileFromDevice()
        .onError((error, stackTrace) => {
              _sendReportPageView.showToast(error.toString()),
            })
        .whenComplete(() => {
              _sendReportPageModel.uploadProgress = 0,
              _sendReportPageView.refreshData(_sendReportPageModel)
            });
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
    await pickImage().whenComplete(
      () => _sendReportPageView.refreshData(_sendReportPageModel),
    );
    _sendReportPageView.refreshData(_sendReportPageModel);
  }

  void openVideo() async {
    await pickVideo()
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
}
