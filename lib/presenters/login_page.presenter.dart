import 'package:capstone_project/models/login_page_model.dart';
import 'package:capstone_project/views/login_page_view.dart';

class LoginPagePresenter {
  late LoginPageView _loginPageView;
  late LoginPageModel _loginPageModel;

  LoginPagePresenter() {
    _loginPageModel = LoginPageModel();
  }

  set view(LoginPageView view) {
    _loginPageView = view;
    _loginPageView.refreshData(_loginPageModel);
  }

  void showPass() {
    _loginPageModel.isShowPass = !_loginPageModel.isShowPass;
    _loginPageView.refreshData(_loginPageModel);
  }

  void onSignInClicked() {
    if ((_loginPageModel.account.text.trim().isEmpty) &&
        _loginPageModel.password.text.trim().isEmpty) {
      _loginPageModel.showErr = "Tên tài khoản và mật khẩu không được trống";
      _loginPageView.refreshData(_loginPageModel);
    } else if (_loginPageModel.account.text.trim().isEmpty ||
        _loginPageModel.password.text.trim().isEmpty) {
      _loginPageModel.showErr = "Tên tài khoản hoặc mật khẩu không được trống";
      _loginPageView.refreshData(_loginPageModel);
    } else {
      _loginPageModel.isLoading = true;
      _loginPageView.refreshData(_loginPageModel);
      _loginPageModel.accountApi
          .signIn(_loginPageModel.account.text, _loginPageModel.password.text)
          .then((value) => {
                if (value['error'] == null)
                  {_loginPageView.onSignInSuccess()}
                else
                  {
                    _loginPageModel.isLoading = false,
                    _loginPageView
                        .onSignInFail('Sai tên tài khoản hoặc mật khẩu')
                  }
              });
    }
  }
}
