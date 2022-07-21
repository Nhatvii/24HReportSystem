
import 'package:capstone_project/models/report_send_history_page_model.dart';

abstract class ReportSendHistoryPageView {

  void refreshData(ReportSendHistoryPageModel model);

  void navigateToReportDetailPage(String reportId);

}