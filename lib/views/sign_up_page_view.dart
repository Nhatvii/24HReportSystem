import 'package:capstone_project/models/sign_up_page_model.dart';

abstract class SignUpPageView {
  void refreshData(SignUpPageModel model);

  void onSignUpClicked();

  void showPass(int check);

  void onOtpCancel();

  onSignUpSuccess();

  void navigateToLoginPage();
}
