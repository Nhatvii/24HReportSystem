import 'package:capstone_project/api/Account/account_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/account.dart';
import 'package:capstone_project/helper/user_preferences.dart';
import 'package:flutter/material.dart';

class UserProfilePageModel {
  late TextEditingController email;
  late TextEditingController name;
  late TextEditingController address;
  late TextEditingController phone;
  late TextEditingController identityCard;
  late TextEditingController oldPassword;
  late TextEditingController newPassword;
  late Future<Account> fetchAccountUser;
  Constants constants = Constants();
  AccountApi accountApi = AccountApi();
  bool isEdit = false;
  bool showOldPass = true;
  bool showNewPass = true;
  String? msg;
  UserPreferences userPrefs = UserPreferences();

  UserProfilePageModel() {
    email = TextEditingController();
    name = TextEditingController();
    address = TextEditingController();
    phone = TextEditingController();
    identityCard = TextEditingController();
    oldPassword = TextEditingController();
    newPassword = TextEditingController();
    fetchAccountUser = accountApi.getAccountInfo();
  }

  Future<void> init() async {
    await accountApi.getAccountInfo().then((value) => {
          email.text = value.email,
          name.text = value.accountInfo.fullname,
          phone.text = value.phoneNumber,
          address.text = value.accountInfo.address,
          identityCard.text = value.accountInfo.identityCard,
        });
  }
}
