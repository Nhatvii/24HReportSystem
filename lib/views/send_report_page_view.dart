import 'package:capstone_project/models/send_report_page_model.dart';
abstract class SendReportPageView {
  void refreshData(SendReportPageModel model);

  // void selectedDateTime(
  //     BuildContext context, DateTime time, TextEditingController text);

  void selectFile();

  void openCamera();

  void agreeBox();

  void anonymousBox();

  void sendReport();

  void showToast(String msg);

  void navigateToShowReportPage();

  void navigateToHomePage();
  // void removeImage(int index);
}
