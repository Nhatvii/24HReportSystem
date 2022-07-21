
import 'package:capstone_project/api/Account/account_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/account.dart';
import 'package:flutter/material.dart';

class UserProfilePageModel {
  late TextEditingController email;
  late TextEditingController name;
  late TextEditingController address;
  late TextEditingController phone;
  late TextEditingController identityCard;
  late Future<Account> fetchAccountUser;
  Constants constants = Constants();
  AccountApi accountApi = AccountApi();
  bool isEdit = false;
  String? msg;

  UserProfilePageModel() {
    email = TextEditingController();
    name = TextEditingController();
    address = TextEditingController();
    phone = TextEditingController();
    identityCard = TextEditingController();
    fetchAccountUser = accountApi.getAccountInfo();
    accountApi.getAccountInfo().then((value) => {
          email.text = value.email,
          name.text = value.accountInfo.username,
          phone.text = value.phoneNumber,
          address.text = value.accountInfo.address,
          identityCard.text = value.accountInfo.identityCard,
        });
  }
}
