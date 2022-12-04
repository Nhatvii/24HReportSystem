// To parse this JSON data, do
//
//     final notify = notifyFromJson(jsonString);

import 'dart:convert';

import 'package:capstone_project/entities/account.dart';

List<Notify> notifyFromJson(String str) =>
    List<Notify>.from(json.decode(str).map((x) => Notify.fromJson(x)));

String notifyToJson(List<Notify> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Notify {
  Notify({
    required this.notifyId,
    required this.officeId,
    required this.latitude,
    required this.longitude,
    required this.notifyStatus,
    required this.acceptedDate,
    required this.officer,
    required this.user,
  });

  String notifyId;
  String officeId;
  double latitude;
  double longitude;
  bool notifyStatus;
  DateTime acceptedDate;
  Account officer;
  Account user;

  factory Notify.fromJson(Map<String, dynamic> json) => Notify(
        notifyId: json["notifyId"],
        officeId: json["officeId"],
        latitude: json["latitude"].toDouble(),
        longitude: json["longitude"].toDouble(),
        notifyStatus: json["notifyStatus"],
        acceptedDate: DateTime.parse(json["acceptedDate"]),
        officer: Account.fromJson(json["officer"]),
        user: Account.fromJson(json["user"]),
      );

  Map<String, dynamic> toJson() => {
        "notifyId": notifyId,
        "officeId": officeId,
        "latitude": latitude,
        "longitude": longitude,
        "notifyStatus": notifyStatus,
        "acceptedDate": acceptedDate.toIso8601String(),
        "officer": officer.toJson(),
        "user": user.toJson(),
      };
}
