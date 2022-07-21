import 'package:capstone_project/components/gradient_button.dart';
import 'package:capstone_project/components/underline_text.dart';
import 'package:capstone_project/components/underline_text_icon.dart';
import 'package:capstone_project/models/login_page_model.dart';
import 'package:capstone_project/pages/sign_up_page/sign_up_page.dart';
import 'package:capstone_project/presenters/login_page.presenter.dart';
import 'package:capstone_project/views/login_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> implements LoginPageView {
  late LoginPageModel _loginPageModel;
  late LoginPagePresenter _loginPagePresenter;

  @override
  void initState() {
    super.initState();
    _loginPagePresenter = LoginPagePresenter();
    _loginPagePresenter.view = this;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
      body: SingleChildScrollView(
        child: SizedBox(
          height: 0.97.sh,
          width: 1.sw,
          child: Stack(
            children: [
              Container(
                height: 1.sh,
                width: 1.sw,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(colors: <Color>[
                    Color(0xFF56CCF2),
                    Color(0xFF2F80ED),
                  ]),
                ),
              ),
              Positioned(
                bottom: 0,
                child: Container(
                  height: 0.75.sh,
                  width: 1.sw,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(40.r),
                      topRight: Radius.circular(40.r),
                    ),
                    color: Colors.white,
                  ),
                  child: Container(
                    padding: EdgeInsets.all(0.05.sh),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Đăng Nhập',
                          style: TextStyle(
                              fontSize: 30.sp, fontWeight: FontWeight.w500),
                        ),
                        SizedBox(
                          height: 0.03.sh,
                        ),
                        UnderlineText(
                          height: 0.08.sh,
                          width: 1.sw,
                          controller: _loginPageModel.account,
                          text: "Email hoặc Số điện thoại",
                          enabled: true,
                          inputType: TextInputType.emailAddress,
                        ),
                        SizedBox(
                          height: 0.025.sh,
                        ),
                        UnderlineTextIcon(
                          height: 0.08.sh,
                          width: 1.sw,
                          controller: _loginPageModel.password,
                          obscureText: _loginPageModel.isShowPass,
                          text: 'Mật Khẩu',
                          function: showPass,
                          icon: _loginPageModel.isShowPass
                              ? const Icon(Icons.visibility)
                              : const Icon(Icons.visibility_off),
                        ),
                        SizedBox(
                          height: 0.04.sh,
                        ),
                        Container(
                          alignment: Alignment.center,
                          child: Text(
                            _loginPageModel.showErr,
                            style: TextStyle(
                                fontSize: 16.sp,
                                color: Colors.red,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                        SizedBox(
                          height: 0.04.sh,
                        ),
                        InkWell(
                            onTap: () {
                              onSignInClicked();
                            },
                            child: _loginPageModel.isLoading
                                ? GradientButton(
                                    height: 0.065.sh,
                                    width: 1.sw,
                                    colors: const [
                                      Color(0xFF56CCF2),
                                      Color(0xFF2F80ED),
                                    ],
                                    radius: 20.r,
                                    child: const Center(
                                      child: CircularProgressIndicator(
                                          color: Colors.white),
                                    ),
                                  )
                                : GradientButton(
                                    height: 0.065.sh,
                                    width: 1.sw,
                                    colors: const [
                                      Color(0xFF56CCF2),
                                      Color(0xFF2F80ED),
                                    ],
                                    radius: 20.r,
                                    child: Text(
                                      'Đăng Nhập',
                                      style: TextStyle(
                                          fontSize: 18.sp,
                                          color: Colors.white,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  )),
                        SizedBox(
                          height: 0.02.sh,
                        ),
                        Container(
                          alignment: Alignment.center,
                          child: Text('Quên Mật Khẩu ?',
                              style: TextStyle(
                                  fontSize: 16.sp, color: Colors.grey)),
                        ),
                        SizedBox(
                          height: 0.07.sh,
                        ),
                        Container(
                          alignment: Alignment.center,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text('Không Có Tài Khoản ?',
                                  style: TextStyle(
                                      fontSize: 16.sp, color: Colors.black)),
                              SizedBox(
                                width: 0.01.sw,
                              ),
                              GestureDetector(
                                onTap: (() => navigateToSignUpPage()),
                                child: Text('Đăng Ký Ngay',
                                    style: TextStyle(
                                        fontSize: 15.sp,
                                        color: Colors.blue,
                                        fontWeight: FontWeight.w700)),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    ));
  }

  @override
  void onSignInClicked() {
    _loginPagePresenter.onSignInClicked();
  }

  @override
  void refreshData(LoginPageModel model) {
    setState(() {
      _loginPageModel = model;
    });
  }

  @override
  onSignInFail(String msg) {
    setState(() {
      _loginPageModel.showErr = msg;
    });
  }

  @override
  onSignInSuccess() {
    Navigator.pop(context, true);
  }

  @override
  void navigateToSignUpPage() {
    Navigator.push(
        context, MaterialPageRoute(builder: ((context) => const SignUpPage())));
  }

  @override
  void showPass() {
    _loginPagePresenter.showPass();
  }
}
