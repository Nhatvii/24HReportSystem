import 'dart:async';

import 'package:capstone_project/models/sign_up_page_model.dart';
import 'package:capstone_project/views/sign_up_page_view.dart';
import 'package:firebase_auth/firebase_auth.dart';

class SignUpPagePresenter {
  late SignUpPageModel _signUpPageModel;
  late SignUpPageView _signUpPageView;

  SignUpPagePresenter() {
    _signUpPageModel = SignUpPageModel();
  }

  set view(SignUpPageView view) {
    _signUpPageView = view;
    _signUpPageView.refreshData(_signUpPageModel);
  }

  void showPass(int check) {
    if (check == 1) {
      _signUpPageModel.isShowPass = !_signUpPageModel.isShowPass;
      _signUpPageView.refreshData(_signUpPageModel);
    } else {
      _signUpPageModel.isShowConPass = !_signUpPageModel.isShowConPass;
      _signUpPageView.refreshData(_signUpPageModel);
    }
  }

  void onCancel() {
    _signUpPageModel.otpPhone = false;
    _signUpPageModel.isLoading = false;
    _signUpPageModel.otp.text = "";
    _signUpPageModel.showErr = "";
    _signUpPageView.refreshData(_signUpPageModel);
  }

  void onSignUpClicked() {
    if (_signUpPageModel.email.text.trim().isEmpty ||
        _signUpPageModel.password.text.trim().isEmpty ||
        _signUpPageModel.conPass.text.trim().isEmpty ||
        _signUpPageModel.phone.text.trim().isEmpty) {
      _signUpPageModel.showErr = "Vui lòng điền đầy đủ thông tin";
      _signUpPageView.refreshData(_signUpPageModel);
    } else if (!_signUpPageModel.emailCheck
        .hasMatch(_signUpPageModel.email.text.trim())) {
      _signUpPageModel.showErr = "Sai định dạng email";
      _signUpPageView.refreshData(_signUpPageModel);
    } else if (!_signUpPageModel.numeric
        .hasMatch(_signUpPageModel.phone.text.trim())) {
      _signUpPageModel.showErr = "Số điện thoại chỉ có 10 số";
      _signUpPageView.refreshData(_signUpPageModel);
    } else if (_signUpPageModel.password.text.trim().length < 6) {
      _signUpPageModel.showErr = "Mật khẩu phải có ít nhất 6 kí tự";
      _signUpPageView.refreshData(_signUpPageModel);
    } else if (_signUpPageModel.conPass.text !=
        _signUpPageModel.password.text.trim()) {
      _signUpPageModel.showErr = "Mật khẩu không trùng nhau";
      _signUpPageView.refreshData(_signUpPageModel);
    } else {
      _signUpPageModel.showErr = "";
      _signUpPageModel.isLoading = true;
      _signUpPageView.refreshData(_signUpPageModel);
      _signUpPageModel.accountApi
          .checkAccount(
              _signUpPageModel.email.text, _signUpPageModel.phone.text)
          .then((value) => {
                if (value['error'] == null)
                  {
                    verifyNumber(),
                    _signUpPageView.refreshData(_signUpPageModel),
                  }
                else
                  {
                    _signUpPageModel.isLoading = false,
                    _signUpPageModel.showErr = value['error']['message'],
                    _signUpPageView.refreshData(_signUpPageModel),
                  }
              });

      // _signUpPageModel.accountApi
      //     .signUp(_signUpPageModel.email.text, _signUpPageModel.password.text,
      //         _signUpPageModel.phone.text)
      //     .then((value) => {
      //           if (value['error'] == null)
      //             {_signUpPageView.onSignUpSuccess()}
      //           else
      //             {
      //               _signUpPageModel.isLoading = false,
      //               _signUpPageModel.showErr = value['message'],
      //               _signUpPageView.refreshData(_signUpPageModel),
      //             }
      //         });
    }
  }

  Future verifyNumber() async {
    _signUpPageModel.auth.verifyPhoneNumber(
        phoneNumber: '+84${_signUpPageModel.phone.text.substring(1)}',
        verificationCompleted: (PhoneAuthCredential credential) async {},
        verificationFailed: (FirebaseAuthException exception) async {
          print(exception.message);
        },
        codeSent: (String verificationId, int? resendingToken) async {
          _signUpPageModel.verificationReceived = verificationId;
          _signUpPageModel.otpPhone = true;
          _signUpPageModel.countdownTimer!.cancel();
          _signUpPageModel.myDuration = const Duration(seconds: 60);
          _signUpPageView.refreshData(_signUpPageModel);
          startTimer();
        },
        timeout: const Duration(seconds: 60),
        codeAutoRetrievalTimeout: (String verificationId) async {});
  }

  Future sendCodeToFirebase({String? code}) async {
    if (_signUpPageModel.verificationReceived.isNotEmpty) {
      var credential = PhoneAuthProvider.credential(
          verificationId: _signUpPageModel.verificationReceived,
          smsCode: code!);

      await _signUpPageModel.auth
          .signInWithCredential(credential)
          .then((value) {
            _signUpPageModel.accountApi
                .signUp(_signUpPageModel.email.text,
                    _signUpPageModel.password.text, _signUpPageModel.phone.text)
                .then((value) => {
                      if (value['error'] == null)
                        {
                          _signUpPageModel.accountApi
                              .checkUserAuthen(_signUpPageModel.email.text)
                              .then(
                                  (value) => _signUpPageView.onSignUpSuccess())
                        }
                      else
                        {
                          _signUpPageModel.showErr = 'Xảy ra lỗi',
                          _signUpPageView.refreshData(_signUpPageModel),
                        }
                    });
          })
          .whenComplete(() => null)
          .onError((error, stackTrace) {
            _signUpPageModel.showErr = 'Sai mã OTP';
            _signUpPageView.refreshData(_signUpPageModel);
          });
    }
  }

  void startTimer() {
    _signUpPageModel.countdownTimer =
        Timer.periodic(const Duration(seconds: 1), (_) => setCountDown());
  }

  void setCountDown() {
    int reduceSecondsBy = 1;
    final seconds = _signUpPageModel.myDuration.inSeconds - reduceSecondsBy;
    if (seconds < 0) {
      _signUpPageModel.countdownTimer!.cancel();
    } else {
      _signUpPageModel.myDuration = Duration(seconds: seconds);
    }
    _signUpPageView.refreshData(_signUpPageModel);
  }
}
