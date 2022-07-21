
import 'package:capstone_project/api/Account/account_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:flutter/material.dart';

class LoginPageModel {
  late TextEditingController account;
  late TextEditingController password;
  late String showErr;
  late bool isShowPass;
  late bool isLoading;
  Constants constants = Constants();
  AccountApi accountApi = AccountApi();

  LoginPageModel() {
    account = TextEditingController();
    password = TextEditingController();
    showErr = "";
    isShowPass = true;
    isLoading = false;
  }
}
