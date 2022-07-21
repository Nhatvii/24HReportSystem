import 'package:capstone_project/components/gradient_button.dart';
import 'package:capstone_project/components/underline_text.dart';
import 'package:capstone_project/components/underline_text_icon.dart';
import 'package:capstone_project/models/sign_up_page_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SignUpForm extends StatelessWidget {
  final SignUpPageModel signUpPageModel;
  final Function navigateLoginPage;
  final Function onSignUpClicked;
  final Function showPass;
  const SignUpForm(
      {Key? key,
      required this.signUpPageModel,
      required this.navigateLoginPage,
      required this.onSignUpClicked,
      required this.showPass})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Đăng Ký Tài Khoản',
          style: TextStyle(fontSize: 30.sp, fontWeight: FontWeight.w500),
        ),
        SizedBox(
          height: 0.03.sh,
        ),
        UnderlineText(
          height: 0.08.sh,
          width: 1.sw,
          controller: signUpPageModel.email,
          text: "Email*",
          enabled: true,
          inputType: TextInputType.emailAddress,
        ),
        SizedBox(
          height: 0.025.sh,
        ),
        UnderlineText(
          height: 0.08.sh,
          width: 1.sw,
          controller: signUpPageModel.phone,
          text: "Số Điện Thoại*",
          enabled: true,
          inputType: TextInputType.phone,
        ),
        SizedBox(
          height: 0.025.sh,
        ),
        UnderlineTextIcon(
          height: 0.08.sh,
          width: 1.sw,
          controller: signUpPageModel.password,
          obscureText: signUpPageModel.isShowPass,
          text: 'Mật Khẩu *',
          function: () => showPass(1),
          icon: signUpPageModel.isShowPass
              ? const Icon(Icons.visibility)
              : const Icon(Icons.visibility_off),
        ),
        SizedBox(
          height: 0.025.sh,
        ),
        UnderlineTextIcon(
          height: 0.08.sh,
          width: 1.sw,
          controller: signUpPageModel.conPass,
          obscureText: signUpPageModel.isShowConPass,
          text: 'Xác Nhận Mật Khẩu *',
          function: () => showPass(2),
          icon: signUpPageModel.isShowConPass
              ? const Icon(Icons.visibility)
              : const Icon(Icons.visibility_off),
        ),
        SizedBox(
          height: 0.04.sh,
        ),
        Container(
          alignment: Alignment.center,
          child: Text(
            signUpPageModel.showErr,
            style: TextStyle(
                fontSize: 16.sp,
                color: Colors.red,
                fontWeight: FontWeight.w500),
          ),
        ),
        SizedBox(
          height: 0.02.sh,
        ),
        InkWell(
            onTap: () => onSignUpClicked(),
            child: signUpPageModel.isLoading
                ? GradientButton(
                    height: 0.065.sh,
                    width: 1.sw,
                    colors: const [
                      Color(0xFF56CCF2),
                      Color(0xFF2F80ED),
                    ],
                    radius: 20.r,
                    child: const Center(
                      child: CircularProgressIndicator(color: Colors.white),
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
                      'Đăng Ký',
                      style: TextStyle(fontSize: 18.sp, color: Colors.white),
                    ),
                  )),
        SizedBox(
          height: 0.03.sh,
        ),
        Container(
          alignment: Alignment.center,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Đã Có Tài Khoản ?',
                  style: TextStyle(fontSize: 16.sp, color: Colors.black)),
              SizedBox(
                width: 0.01.sw,
              ),
              GestureDetector(
                onTap: () => navigateLoginPage(),
                child: Text('Đăng Nhập',
                    style: TextStyle(
                        fontSize: 15.sp,
                        color: Colors.blue,
                        fontWeight: FontWeight.w700)),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
