import 'package:capstone_project/models/sign_up_page_model.dart';
import 'package:capstone_project/pages/main_page/main_page.dart';
import 'package:capstone_project/pages/sign_up_page/otp_verify_form.dart';
import 'package:capstone_project/pages/sign_up_page/sign_up_form.dart';
import 'package:capstone_project/presenters/sign_up_page_presenter.dart';
import 'package:capstone_project/views/sign_up_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({Key? key}) : super(key: key);

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> implements SignUpPageView {
  late SignUpPageModel _signUpPageModel;
  late SignUpPagePresenter _signUpPagePresenter;

  @override
  void initState() {
    super.initState();
    _signUpPagePresenter = SignUpPagePresenter();
    _signUpPagePresenter.view = this;
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
                  height: 0.8.sh,
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
                      child: _signUpPageModel.otpPhone
                          ? OtpVerifyForm(
                              signUpPageModel: _signUpPageModel,
                              signUpPagePresenter: _signUpPagePresenter,
                              onCancel: onOtpCancel,
                            )
                          : SignUpForm(
                              signUpPageModel: _signUpPageModel,
                              navigateLoginPage: navigateToLoginPage,
                              onSignUpClicked: onSignUpClicked,
                              showPass: showPass)),
                ),
              ),
            ],
          ),
        ),
      ),
    ));
  }

  @override
  void refreshData(SignUpPageModel model) {
    setState(() {
      _signUpPageModel = model;
    });
  }

  @override
  void navigateToLoginPage() {
    Navigator.pop(context);
  }

  @override
  void onSignUpClicked() {
    _signUpPagePresenter.onSignUpClicked();
  }

  @override
  onSignUpSuccess() {
    Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(
            builder: (_) => const MainPage(
                  page: 0,
                )),
        (route) => false);
  }

  @override
  void showPass(int check) {
    _signUpPagePresenter.showPass(check);
  }

  @override
  void onOtpCancel() {
    _signUpPagePresenter.onCancel();
  }

  // @override
  // void showConPass() {
  //   _signUpPagePresenter.showConPass();
  // }
}
