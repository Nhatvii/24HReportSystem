import 'dart:convert';

List<ReportDetail> reportDetailFromJson(String str) => List<ReportDetail>.from(
    json.decode(str).map((x) => ReportDetail.fromJson(x)));

String reportDetailToJson(List<ReportDetail> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class ReportDetail {
  ReportDetail({
    required this.reportDetailId,
    required this.media,
    required this.type,
    required this.reportId,
  });

  int reportDetailId;
  String media;
  String type;
  String reportId;

  factory ReportDetail.fromJson(Map<String, dynamic> json) => ReportDetail(
        reportDetailId: json["reportDetailId"],
        media: json["media"],
        type: json["type"],
        reportId: json["reportId"],
      );

  Map<String, dynamic> toJson() => {
        "reportDetailId": reportDetailId,
        "media": media,
        "type": type,
        "reportId": reportId,
      };
}
