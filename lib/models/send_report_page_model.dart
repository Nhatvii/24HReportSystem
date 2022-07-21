// ignore_for_file: depend_on_referenced_packages

import 'dart:convert';
import 'dart:io';

import 'package:audioplayers/audioplayers.dart';
import 'package:capstone_project/api/Firebase/firebase_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:file_picker/file_picker.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SendReportPageModel {
  late bool isAgree;
  late bool isAnonymous;
  late bool isPlaying;
  late String imageURL;
  late List<File> listImage;
  late List<File> listVideo;
  late List<String> listImageString;
  late List<String> listVideoString;
  late TextEditingController location;
  late TextEditingController date;
  late TextEditingController time;
  late TextEditingController description;
  Constants constants = Constants();
  DateTime today = DateTime.now();
  TimeOfDay todayTime = TimeOfDay.now();
  bool isRecorderReady = false;
  int count = 0;
  File? file;
  File? recordFile;
  UploadTask? task;
  final recorder = FlutterSoundRecorder();
  final audioPlayer = AudioPlayer();
  final firebaseApi = FirebaseApi();
  FirebaseAuth auth = FirebaseAuth.instance;
  String? twoDigitMinutes;
  String? twoDigitSeconds;
  Duration? recordDuration;
  late Duration duration;
  late Duration position;
  String? email;

  SendReportPageModel() {
    isAgree = false;
    isAnonymous = false;
    isPlaying = false;
    imageURL = "";
    listImage = [];
    listVideo = [];
    listImageString = [];
    listVideoString = [];
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
    email = prefs.getString('email');
    return email;
  }

  String twoDigits(int num) {
    return num.toString().padLeft(2, '0');
  }

  String formatTime(Duration duration) {
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));

    return '$minutes:$seconds';
  }

  Future selectFile() async {
    var user = auth.currentUser;
    final result = await FilePicker.platform.pickFiles(
        allowMultiple: true,
        type: FileType.custom,
        allowedExtensions: ['png', 'jpg', 'mp4']);

    if (result == null) return;
    for (var i in result.files) {
      File fileSelect = File(i.path!);
      if (user != null) {
        await sendFileToFirebase(fileSelect)
            .whenComplete(() => listImage.insert(0, fileSelect));
      } else {
        auth.signInAnonymously().then((value) async {
          await sendFileToFirebase(fileSelect)
              .whenComplete(() => listImage.insert(0, fileSelect));
        });
      }
    }
  }

  Future sendFileToFirebase(File file) async {
    if (extension(file.path).contains('mp4')) {
      final fileName = basename(file.path);
      final destination = 'report_videos/$fileName';

      task = firebaseApi.uploadFile(destination, file);

      if (task == null) return "";

      final snapshot = await task!.whenComplete(() {});
      final urlDownload = await snapshot.ref.getDownloadURL();
      listVideoString.insert(0, urlDownload);
    } else {
      final fileName = basename(file.path);
      final destination = 'report_images/$fileName';

      task = firebaseApi.uploadFile(destination, file);

      if (task == null) return "";

      final snapshot = await task!.whenComplete(() {});
      final urlDownload = await snapshot.ref.getDownloadURL();
      listImageString.insert(0, urlDownload);
    }
  }

  Future<void> removeSelectFileFromFirebase(File file, int index) async {
    final fileName = basename(file.path);
    final destination = 'report_images/$fileName';

    await firebaseApi.deleteFile(destination);
    listImage.removeAt(index);
    listImageString.removeAt(index);
  }

  Future selectedDate(
      BuildContext context, DateTime date, TextEditingController text) async {
    var pickedDate = await showDatePicker(
        context: context,
        initialDate: date,
        firstDate: DateTime(2000),
        lastDate: DateTime.now());

    if (pickedDate != null) {
      date = pickedDate;
      text.text = DateFormat('dd-MM-yyyy').format(pickedDate);
    }
  }

  Future selectedTime(
      BuildContext context, TimeOfDay time, TextEditingController text) async {
    var pickedTime = await showTimePicker(
      context: context,
      initialTime: time,
      initialEntryMode: TimePickerEntryMode.dial,
    );

    if (pickedTime != null) {
      time = pickedTime;
      text.text =
          '${twoDigits(pickedTime.hour)}:${twoDigits(pickedTime.minute)}';
    }
  }

  Future pickImage() async {
    var user = auth.currentUser;
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.camera);
      if (image == null) return;

      // final imageTeporary = File(image.path);
      final imagePermanent = await saveImagePermanently(image.path);
      file = imagePermanent;
      if (user != null) {
        sendFileToFirebase(file!)
            .whenComplete(() => listImage.insert(0, file!));
      } else {
        auth.signInAnonymously().then((value) {
          sendFileToFirebase(file!)
              .whenComplete(() => listImage.insert(0, file!));
        });
      }
      // listImage.insert(0, file!);
    } on PlatformException catch (e) {
      print('Failed to pick image: $e');
    }
  }

  Future<File> saveImagePermanently(String imagePath) async {
    final directory = await getApplicationDocumentsDirectory();
    // final directory = await getExternalStorageDirectory();
    final name = basename(imagePath);
    final image = File('${directory.path}/$name');
    print(image);

    return File(imagePath).copy(image.path);
  }

  Future sendFormReport(String locationRep, String dateRep, String timeRep,
      String desRep, List<String> image, bool isAnonymouss) async {
    var format1 = DateFormat('dd-MM-yyyy').parse(dateRep);
    var format2 = DateFormat('yyyy-MM-dd').format(format1);
    String format3 = '$format2 $timeRep:00';
    DateTime convertDate = DateFormat("yyyy-MM-dd hh:mm:ss").parse(format3);
    print(convertDate);

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var email = prefs.getString('email');
    var url = Uri.parse('${constants.localhost}/Report');
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "userID": isAnonymouss ? null : email,
        "location": locationRep,
        "timeFraud": convertDate.toIso8601String(),
        "description": desRep,
        "video": ["string"],
        "image": image,
        "isAnonymous": isAnonymouss,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    }
  }

  Future initRecorder() async {
    final status = await Permission.microphone.request();

    if (status != PermissionStatus.granted) {
      throw 'Microphone permission not granted';
    }

    await recorder.openRecorder();

    isRecorderReady = true;
    recorder.setSubscriptionDuration(const Duration(milliseconds: 100));
  }

  Future record() async {
    if (!isRecorderReady) return;

    await recorder.startRecorder(
      toFile: 'record',
    );
  }

  Future stop() async {
    if (!isRecorderReady) return;

    final path = await recorder.stopRecorder();
    print(path);
    recordFile = File(path!);
  }

  Future delete() async {
    await recorder.deleteRecord(fileName: 'record');
    recordFile = File('');
    duration = Duration.zero;
    position = Duration.zero;
  }
}
