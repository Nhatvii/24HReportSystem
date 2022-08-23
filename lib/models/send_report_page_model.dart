// ignore_for_file: depend_on_referenced_packages

import 'dart:io';

import 'package:audioplayers/audioplayers.dart';
import 'package:capstone_project/api/Firebase/firebase_api.dart';
import 'package:capstone_project/api/Map/map_api.dart';
import 'package:capstone_project/api/Report/report_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:file_picker/file_picker.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:video_thumbnail/video_thumbnail.dart';

class SendReportPageModel {
  late bool isAgree;
  late bool isAnonymous;
  late bool isSend;
  late bool isPlaying;
  late List<File> listImage;
  late List<File> listVideo;
  late List<String> listImageString;
  late List<String> listVideoString;
  late List<String> recordAudioString;
  late TextEditingController location;
  late TextEditingController date;
  late TextEditingController time;
  late TextEditingController description;
  MapApi mapApi = MapApi();
  Constants constants = Constants();
  DateTime today = DateTime.now();
  TimeOfDay todayTime = TimeOfDay.now();
  bool isRecorderReady = false;
  int count = 0;
  File? file;
  File recordFile = File('');
  UploadTask? task;
  final recorder = FlutterSoundRecorder();
  final audioPlayer = AudioPlayer();
  final firebaseApi = FirebaseApi();
  ReportApi reportApi = ReportApi();
  FirebaseAuth auth = FirebaseAuth.instance;
  String? twoDigitMinutes;
  String? twoDigitSeconds;
  String? recordUrl;
  String recordPath = '';
  Duration? recordDuration;
  late Duration duration;
  late Duration position;
  String? accountId;
  String? email;
  double uploadProgress = 0;

  SendReportPageModel() {
    isAgree = false;
    isAnonymous = false;
    isSend = false;
    isPlaying = false;
    listImage = [];
    listVideo = [];
    listImageString = [];
    listVideoString = [];
    recordAudioString = [];
    location = TextEditingController();
    date = TextEditingController();
    time = TextEditingController();
    description = TextEditingController();
    duration = Duration.zero;
    position = Duration.zero;
    getInstance();
  }

  Future<String?> getInstance() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    accountId = prefs.getString('accountId');
    email = prefs.getString('email');
    return accountId;
  }

  String twoDigits(int num) {
    return num.toString().padLeft(2, '0');
  }

  String formatTime(Duration duration) {
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));

    return '$minutes:$seconds';
  }

  Future generateThumbnailVideo(String url) async {
    final fileName = await VideoThumbnail.thumbnailFile(
      video: url,
      thumbnailPath: (await getTemporaryDirectory()).path,
      imageFormat: ImageFormat.WEBP,
      quality: 75,
    );
    File videoFile = File(fileName!);
    return videoFile;
  }

  Future selectFile() async {
    // var user = auth.currentUser;
    final result = await FilePicker.platform.pickFiles(
        allowMultiple: true,
        type: FileType.custom,
        allowedExtensions: ['png', 'jpg', 'mp4']);

    if (result == null) return;
    for (var i in result.files) {
      File fileSelect = File(i.path!);
      // if (user != null) {
      if (extension(fileSelect.path).contains('mp4')) {
        if (listVideo.length < 2) {
          await sendFileToFirebase(fileSelect).then((stringUrl) async {
            await generateThumbnailVideo(stringUrl)
                .then((value) => {listVideo.insert(0, value)});
          });
        } else {
          throw 'Không được tải lên quá 2 video';
        }
      } else {
        await sendFileToFirebase(fileSelect)
            .whenComplete(() => listImage.insert(0, fileSelect));
      }
      // } else {
      //   auth.signInAnonymously().then((value) async {
      //     if (extension(fileSelect.path).contains('mp4')) {
      //       if (listVideo.length < 2) {
      //         await sendFileToFirebase(fileSelect).then((stringUrl) async {
      //           await generateThumbnailVideo(stringUrl)
      //               .then((value) => {listVideo.insert(0, value)});
      //         });
      //       } else {
      //         throw 'Không được tải lên quá 2 video';
      //       }
      //     } else {
      //       await sendFileToFirebase(fileSelect)
      //           .whenComplete(() => listImage.insert(0, fileSelect));
      //     }
      //   });
      // }
    }
  }

  Future<String> sendFileToFirebase(File file) async {
    if (extension(file.path).contains('mp4')) {
      final fileName = basename(file.path);
      final destination = 'report_videos/$fileName';

      task = firebaseApi.uploadFile(destination, file);

      if (task == null) return "";

      final snapshot = await task!.whenComplete(() {});
      final urlDownload = await snapshot.ref.getDownloadURL();
      listVideoString.insert(0, urlDownload);
      return urlDownload;
    } else {
      final fileName = basename(file.path);
      final destination = 'report_images/$fileName';

      task = firebaseApi.uploadFile(destination, file);
      // task!.snapshotEvents.listen((event) {
      //   uploadProgress =
      //       event.bytesTransferred.toDouble() / event.totalBytes.toDouble();
      // });

      if (task == null) return "";

      final snapshot = await task!.whenComplete(() {});
      final urlDownload = await snapshot.ref.getDownloadURL();
      listImageString.insert(0, urlDownload);
      return urlDownload;
    }
  }

  Future<void> removeSelectFileFromFirebase(File file, int index) async {
    if (extension(file.path).contains('webp')) {
      final fileName = basename(file.path);
      String videoDestination = fileName.substring(
          (fileName.lastIndexOf('%') + 3), (fileName.lastIndexOf('.')));
      final destination = 'report_videos/$videoDestination.mp4';

      await firebaseApi.deleteFile(destination);
      listVideo.removeAt(index);
      listVideoString.removeAt(index);
    } else {
      final fileName = basename(file.path);
      final destination = 'report_images/$fileName';

      await firebaseApi.deleteFile(destination);
      listImage.removeAt(index);
      listImageString.removeAt(index);
    }
  }

  Future<DateTime?> selectedDate(BuildContext context, DateTime date) async {
    return showDatePicker(
        context: context,
        initialDate: date,
        firstDate: DateTime(2000),
        lastDate: DateTime.now());
  }

  Future selectedTime(BuildContext context, TimeOfDay time) async {
    return showTimePicker(
      context: context,
      initialTime: time,
      initialEntryMode: TimePickerEntryMode.dial,
    );
  }

  Future pickImage() async {
    // var user = auth.currentUser;
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.camera);
      // final video = await ImagePicker().pickVideo(source: ImageSource.camera);
      if (image == null) return;

      // final imageTeporary = File(image.path);
      final imagePermanent = await saveImagePermanently(image.path);
      file = imagePermanent;
      // if (user != null) {
      await sendFileToFirebase(file!)
          .whenComplete(() => listImage.insert(0, file!));
      // } else {
      //   auth.signInAnonymously().then((value) async {
      //     await sendFileToFirebase(file!)
      //         .whenComplete(() => listImage.insert(0, file!));
      //   });
      // }
      // listImage.insert(0, file!);
    } on PlatformException catch (e) {
      throw ('Failed to pick image: $e');
    }
  }

  Future pickVideo() async {
    // var user = auth.currentUser;
    try {
      if (listVideo.length < 2) {
        final video = await ImagePicker().pickVideo(source: ImageSource.camera);
        if (video == null) return;

        // final imageTeporary = File(image.path);
        final videoPermanent = await saveImagePermanently(video.path);
        file = videoPermanent;
        // if (user != null) {
        await sendFileToFirebase(file!).then((stringUrl) async {
          await generateThumbnailVideo(stringUrl)
              .then((value) => {listVideo.insert(0, value)});
        });
        // } else {
        //   auth.signInAnonymously().then((value) async {
        //     await sendFileToFirebase(file!).then((stringUrl) async {
        //       await generateThumbnailVideo(stringUrl)
        //           .then((value) => {listVideo.insert(0, value)});
        //     });
        //   });
        // }
      } else {
        throw ('Không được tải lên quá 2 video');
      }
    } on PlatformException catch (e) {
      throw ('Failed to pick image: $e');
    }
  }

  Future<File> saveImagePermanently(String imagePath) async {
    final directory = await getApplicationDocumentsDirectory();
    // final directory = await getExternalStorageDirectory();
    final name = basename(imagePath);
    final image = File('${directory.path}/$name');

    return File(imagePath).copy(image.path);
  }

  Future initRecorder() async {
    final status = await Permission.microphone.request();

    if (status != PermissionStatus.granted) {
      throw 'Microphone permission not granted';
    }

    await recorder.openRecorder();

    isRecorderReady = true;
    recorder.setSubscriptionDuration(const Duration(milliseconds: 500));
  }

  Future record() async {
    if (!isRecorderReady) return;

    recordPath = DateTime.now().microsecondsSinceEpoch.toString();

    await recorder.startRecorder(
      toFile: '$recordPath.mp4',
    );
  }

  Future stop() async {
    if (!isRecorderReady) return;

    final path = await recorder.stopRecorder();

    recordFile = File(path!);

    final fileName = basename(recordFile.path);
    final destination = 'report_record/$fileName';

    task = firebaseApi.uploadFile(destination, recordFile);

    if (task == null) return "";

    final snapshot = await task!.whenComplete(() {});
    final urlDownload = await snapshot.ref.getDownloadURL();
    recordUrl = urlDownload;
    recordAudioString.add(recordUrl!);
  }

  Future delete(String recordId, File file) async {
    final fileName = basename(file.path);
    final destination = 'report_record/$fileName';

    await firebaseApi.deleteFile(destination);
    recordAudioString.clear();
    await recorder.deleteRecord(fileName: '$recordId.mp4');
    recordFile = File('');
    duration = Duration.zero;
    position = Duration.zero;
  }
}
