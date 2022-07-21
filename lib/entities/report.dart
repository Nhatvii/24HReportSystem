import 'dart:convert';

import 'package:capstone_project/entities/report_detail.dart';

List<Report> reportFromJson(String str) =>
    List<Report>.from(json.decode(str).map((x) => Report.fromJson(x)));

String reportToJson(List<Report> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Report {
  Report({
    required this.reportId,
    required this.location,
    required this.timeFraud,
    required this.description,
    required this.categoryId,
    required this.createTime,
    required this.isAnonymous,
    required this.userId,
    required this.status,
    required this.isDelete,
    required this.reportDetails,
  });

  String reportId;
  String location;
  DateTime timeFraud;
  String description;
  int categoryId;
  DateTime createTime;
  bool isAnonymous;
  String userId;
  String status;
  bool isDelete;
  List<ReportDetail> reportDetails;

  factory Report.fromJson(Map<String, dynamic> json) => Report(
        reportId: json["reportId"],
        location: json["location"],
        timeFraud: DateTime.parse(json["timeFraud"]),
        description: json["description"],
        categoryId: json["categoryId"] ?? 0,
        createTime: DateTime.parse(json["createTime"]),
        isAnonymous: json["isAnonymous"],
        userId: json["userId"],
        status: json["status"],
        isDelete: json["isDelete"] ?? false,
        reportDetails: json["reportDetails"] == null
            ? []
            : List<ReportDetail>.from(
                json["reportDetails"].map((x) => ReportDetail.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "reportId": reportId,
        "location": location,
        "timeFraud": timeFraud.toIso8601String(),
        "description": description,
        "categoryId": categoryId,
        "createTime": createTime.toIso8601String(),
        "isAnonymous": isAnonymous,
        "userId": userId,
        "status": status,
        "isDelete": isDelete,
        "reportDetails":
            List<dynamic>.from(reportDetails.map((x) => x.toJson())),
      };
}
