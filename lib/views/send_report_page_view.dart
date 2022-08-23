import 'dart:io';

import 'package:capstone_project/models/send_report_page_model.dart';
abstract class SendReportPageView {
  void refreshData(SendReportPageModel model);

  // void selectedDateTime(
  //     BuildContext context, DateTime time, TextEditingController text);

  // void selectFile();

  void chooseImageOrVideo();

  void chooseMedia();

  void confirmDeleteMedia(int index, File file);

  void agreeBox();

  void anonymousBox();

  void sendReport();

  void showToast(String msg);

  void navigateToShowReportPage();

  void navigateToHomePage();

  // void navigateToMapPage();
  // void removeImage(int index);
}
