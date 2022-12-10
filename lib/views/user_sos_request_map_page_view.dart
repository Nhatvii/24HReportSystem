import 'package:capstone_project/models/user_sos_request_map_page_model.dart';

abstract class UserSosRequestPageMapView {
  void refreshData(UserSosRequestPageMapModel model);

  void changePanel();

  void showCancelReasonPanel();

  void navigateToHomePage();

  void showToastMessage(String msg);
}
