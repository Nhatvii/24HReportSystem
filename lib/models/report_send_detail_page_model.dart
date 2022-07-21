import 'package:capstone_project/api/Report/report_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/report.dart';

class ReportSendDetailPageModel {
  late Future<Report> fetchReportDetail;
  Constants constants = Constants();
  ReportApi reportApi = ReportApi();

  ReportSendDetailPageModel(String reportId) {
    fetchReportDetail = reportApi.getReportDetail(reportId);
  }
}
