import 'package:capstone_project/models/sign_up_page_model.dart';
import 'package:capstone_project/presenters/sign_up_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class OtpVerifyForm extends StatelessWidget {
  final SignUpPageModel signUpPageModel;
  final SignUpPagePresenter signUpPagePresenter;
  final Function onCancel;
  const OtpVerifyForm(
      {Key? key,
      required this.signUpPageModel,
      required this.signUpPagePresenter,
      required this.onCancel})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Xác Thực OTP',
              style: TextStyle(fontSize: 30.sp, fontWeight: FontWeight.w500),
            ),
            GestureDetector(
              onTap: () => onCancel(),
              child: Text(
                'Quay lại',
                style: TextStyle(
                    fontSize: 18.sp,
                    color: Colors.blue,
                    fontWeight: FontWeight.w500),
              ),
            ),
          ],
        ),
        SizedBox(
          height: 0.03.sh,
        ),
        Text(
          'Mã OTP đã được gửi tới số điện thoại: ',
          style: TextStyle(
              fontSize: 16.sp, color: Colors.blue, fontWeight: FontWeight.w500),
        ),
        SizedBox(
          height: 0.01.sh,
        ),
        Row(
          children: [
            Text(
              signUpPageModel.phone.text,
              style: TextStyle(fontSize: 16.sp),
            ),
            Text(
              signUpPageModel.formatTime(signUpPageModel.myDuration),
              style: TextStyle(fontSize: 16.sp, color: Colors.blue),
            ),
          ],
        ),
        SizedBox(
          height: 0.02.sh,
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
        TextField(
          onChanged: (value) {
            if (value.length == 6) {
              FocusManager.instance.primaryFocus?.unfocus();
              signUpPagePresenter.sendCodeToFirebase(code: value);
            }
          },
          textAlign: TextAlign.center,
          decoration: InputDecoration(
            isDense: true,
            enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.grey, width: 0.002.sw)),
            focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.blue, width: 0.002.sw)),
            counterText: '',
          ),
          style: TextStyle(letterSpacing: 0.03.sh, fontSize: 25.sp),
          maxLength: 6,
          controller: signUpPageModel.otp,
          keyboardType: TextInputType.number,
        ),
        SizedBox(
          height: 0.02.sh,
        ),
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              'Không nhận được mã OTP ?',
              style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
            ),
            SizedBox(
              width: 0.02.sw,
            ),
            InkWell(
              onTap: () => signUpPagePresenter.verifyNumber(),
              child: Text(
                'Gửi lại mã',
                style: TextStyle(
                    fontSize: 15.sp,
                    color: Colors.blue,
                    fontWeight: FontWeight.w500),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
