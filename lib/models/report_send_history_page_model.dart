import 'package:capstone_project/api/Report/report_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/report.dart';

class ReportSendHistoryPageModel {
  late Future<List<Report>> fetchListReport;
  Constants constants = Constants();
  ReportApi reportApi = ReportApi();

  ReportSendHistoryPageModel() {
    fetchListReport = reportApi.getListReportByUserId();
  }
}
