import 'package:capstone_project/components/underline_text.dart';
import 'package:capstone_project/models/user_profile_page_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class EditFormPart extends StatelessWidget {
  final UserProfilePageModel userProfilePageModel;
  final Function editFunction;
  final Function cancelEditFunction;
  const EditFormPart(
      {Key? key,
      required this.userProfilePageModel,
      required this.editFunction,
      required this.cancelEditFunction})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        UnderlineText(
          controller: userProfilePageModel.email,
          text: 'Email',
          height: 0.08.sh,
          width: 1.sw,
          enabled: true,
          isDense: true,
          contentPadding: EdgeInsets.zero,
          focus: false,
          inputType: TextInputType.emailAddress,
        ),
        SizedBox(
          height: 0.005.sh,
        ),
        UnderlineText(
          controller: userProfilePageModel.name,
          text: 'Họ và Tên',
          height: 0.08.sh,
          width: 1.sw,
          enabled: true,
          isDense: true,
          contentPadding: EdgeInsets.zero,
          focus: true,
          inputType: TextInputType.name,
        ),
        SizedBox(
          height: 0.005.sh,
        ),
        UnderlineText(
          controller: userProfilePageModel.address,
          text: 'Địa Chỉ',
          height: 0.08.sh,
          width: 1.sw,
          enabled: true,
          isDense: true,
          contentPadding: EdgeInsets.zero,
          focus: false,
          inputType: TextInputType.streetAddress,
        ),
        SizedBox(
          height: 0.005.sh,
        ),
        UnderlineText(
          controller: userProfilePageModel.phone,
          text: 'Số Điện Thoại',
          height: 0.08.sh,
          width: 1.sw,
          enabled: true,
          isDense: true,
          contentPadding: EdgeInsets.zero,
          focus: false,
          inputType: TextInputType.phone,
        ),
        SizedBox(
          height: 0.005.sh,
        ),
        UnderlineText(
          controller: userProfilePageModel.identityCard,
          text: 'CCCD/CMND',
          height: 0.08.sh,
          width: 1.sw,
          enabled: true,
          isDense: true,
          contentPadding: EdgeInsets.zero,
          focus: false,
          inputType: TextInputType.number,
        ),
        SizedBox(
          height: 0.04.sh,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            GestureDetector(
              onTap: () => editFunction(),
              child: Container(
                height: 0.055.sh,
                width: 0.4.sw,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.r),
                  gradient: const LinearGradient(colors: <Color>[
                    Color(0xFF56CCF2),
                    Color(0xFF2F80ED),
                  ]),
                ),
                child: Text('Xác Nhận',
                    style: TextStyle(fontSize: 16.sp, color: Colors.white)),
              ),
            ),
            GestureDetector(
              onTap: () => cancelEditFunction(),
              child: Container(
                height: 0.055.sh,
                width: 0.25.sw,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.r),
                  gradient: const LinearGradient(colors: <Color>[
                    Color(0xFFFB8883),
                    Color(0xFFFF4B2B),
                  ]),
                ),
                child: Text('Hủy',
                    style: TextStyle(fontSize: 16.sp, color: Colors.white)),
              ),
            ),
          ],
        ),
        SizedBox(
          height: 0.02.sh,
        ),
      ],
    );
  }
}
