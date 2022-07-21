
import 'package:capstone_project/models/login_page_model.dart';

abstract class LoginPageView {

  void refreshData(LoginPageModel model);

  void onSignInClicked();

  onSignInSuccess();
  
  onSignInFail(String msg);

  void navigateToSignUpPage();

  void showPass();

}