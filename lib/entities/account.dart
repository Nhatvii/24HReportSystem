import 'dart:convert';

import 'package:capstone_project/entities/account_info.dart';
// import 'package:capstone_project/entities/role.dart';

Account accountFromJson(String str) => Account.fromJson(json.decode(str));

String accountToJson(Account data) => json.encode(data.toJson());

class Account {
    Account({
        required this.accountId,
        required this.email,
        // required this.password,
        required this.phoneNumber,
        // required this.role,
        required this.accountInfo,
    });

    String accountId;
    String email;
    // String password;
    String phoneNumber;
    // Role role;
    AccountInfo accountInfo;

    factory Account.fromJson(Map<String, dynamic> json) => Account(
        accountId: json['accountId'],
        email: json["email"] ?? '',
        // password: json["password"],
        phoneNumber: json["phoneNumber"] ?? '',
        // role: Role.fromJson(json["role"]),
        accountInfo: AccountInfo.fromJson(json["accountInfo"]),
    );

    Map<String, dynamic> toJson() => {
        "accountId": accountId,
        "email": email,
        // "password": password,
        "phoneNumber": phoneNumber,
        // "role": role.toJson(),
        "accountInfo": accountInfo.toJson(),
    };
}