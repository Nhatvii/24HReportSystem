
import 'package:capstone_project/models/report_send_history_page_model.dart';
import 'package:capstone_project/views/report_send_history_page_view.dart';

class ReportSendHistoryPagePresenter{

  late ReportSendHistoryPageModel _reportSendHistoryPageModel;
  late ReportSendHistoryPageView _reportSendHistoryPageView;

  ReportSendHistoryPagePresenter() {
    _reportSendHistoryPageModel = ReportSendHistoryPageModel();
  }

  set view(ReportSendHistoryPageView view) {
    _reportSendHistoryPageView = view;
    _reportSendHistoryPageView.refreshData(_reportSendHistoryPageModel);
  }

  // Future<void> init() async {
  //   await _reportSendHistoryPageModel.init();
  //   _reportSendHistoryPageView.refreshData(_reportSendHistoryPageModel);
  // }

}