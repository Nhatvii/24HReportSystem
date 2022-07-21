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
