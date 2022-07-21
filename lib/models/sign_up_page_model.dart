import 'dart:async';

import 'package:capstone_project/api/Account/account_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class SignUpPageModel {
  late TextEditingController email;
  late TextEditingController password;
  late TextEditingController conPass;
  late TextEditingController phone;
  late TextEditingController otp;
  late String showErr;
  late bool isShowPass;
  late bool isShowConPass;
  late bool isLoading;
  late bool otpPhone;
  Constants constants = Constants();
  AccountApi accountApi = AccountApi();
  FirebaseAuth auth = FirebaseAuth.instance;
  Timer? countdownTimer;
  Duration myDuration = const Duration(seconds: 60);
  String verificationReceived = "";
  final numeric = RegExp(r'(^(?:[+0]9)?[0-9]{10}$)');
  // final character = RegExp(r'^\D+$');
  final emailCheck = RegExp(
      r"[\w!#$%&'*+\=?^_`{|}~-]+(?:\.[\w!#$%&'*+\=?^_`{|}~-]+)*@(?:\w(?:[\w-]*\w)?\.)+\w(?:[\w-]*\w)?");

  SignUpPageModel() {
    email = TextEditingController();
    password = TextEditingController();
    conPass = TextEditingController();
    phone = TextEditingController();
    otp = TextEditingController();
    showErr = "";
    isShowPass = true;
    isShowConPass = true;
    isLoading = false;
    otpPhone = true;
  }

  String twoDigits(int num) {
    return num.toString().padLeft(2, '0');
  }

  String formatTime(Duration duration) {
    final seconds = twoDigits(duration.inSeconds.remainder(60));

    return seconds;
  }
}
