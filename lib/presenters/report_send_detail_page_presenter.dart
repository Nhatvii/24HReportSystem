import 'package:capstone_project/models/report_send_detail_page_model.dart';
import 'package:capstone_project/views/report_send_detail_page_view.dart';

class ReportSendDetailPagePresenter {
  late ReportSendDetailPageModel _reportSendDetailPageModel;
  late ReportSendDetailPageView _reportSendDetailPageView;

  ReportSendDetailPagePresenter(String reportId) {
    _reportSendDetailPageModel = ReportSendDetailPageModel(reportId);
  }

  set view(ReportSendDetailPageView view) {
    _reportSendDetailPageView = view;
    _reportSendDetailPageView.refreshData(_reportSendDetailPageModel);
  }
}
