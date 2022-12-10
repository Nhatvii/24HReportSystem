import 'package:capstone_project/models/user_profile_page_model.dart';
import 'package:capstone_project/presenters/user_profile_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ChangePasswordPart extends StatelessWidget {
  final UserProfilePageModel userProfilePageModel;
  final UserProfilePagePresenter userProfilePagePresenter;
  const ChangePasswordPart(
      {super.key,
      required this.userProfilePageModel,
      required this.userProfilePagePresenter});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
            width: 1.sw,
            alignment: Alignment.center,
            color: Colors.grey.shade100,
            margin: EdgeInsets.only(bottom: 0.01.sh),
            padding: EdgeInsets.symmetric(vertical: 0.01.sh),
            child: Text(
              'Thay đổi mật khẩu',
              style: TextStyle(
                fontSize: 15.sp,
                fontWeight: FontWeight.w500,
              ),
            )),
        titleAndContent(
            'Mật Khẩu Cũ',
            userProfilePageModel.oldPassword,
            userProfilePageModel.showOldPass,
            userProfilePageModel.showOldPass
                ? Icon(
                    Icons.visibility,
                    size: 20.sp,
                  )
                : Icon(
                    Icons.visibility_off,
                    size: 20.sp,
                  ),
            userProfilePagePresenter.showPass,
            1),
        titleAndContent(
            'Mật Khẩu Mới',
            userProfilePageModel.newPassword,
            userProfilePageModel.showNewPass,
            userProfilePageModel.showNewPass
                ? Icon(
                    Icons.visibility,
                    size: 20.sp,
                  )
                : Icon(
                    Icons.visibility_off,
                    size: 20.sp,
                  ),
            userProfilePagePresenter.showPass,
            2),
        SizedBox(
          height: 0.02.sh,
        ),
        Center(
          child: GestureDetector(
            onTap: () => userProfilePagePresenter.onChangeNewPassword(),
            child: Container(
              height: 0.06.sh,
              width: 0.3.sw,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10.r),
                gradient: const LinearGradient(colors: <Color>[
                  Color(0xFF56CCF2),
                  Color(0xFF2F80ED),
                ]),
              ),
              child: Text('Cập Nhật',
                  style: TextStyle(
                      fontSize: 16.sp,
                      color: Colors.white,
                      fontWeight: FontWeight.w500)),
            ),
          ),
        ),
      ],
    );
  }
}

Widget titleAndContent(String title, TextEditingController controller,
    bool isObscure, Widget icon, Function funtion, int check) {
  return Container(
    width: 1.sw,
    margin: EdgeInsets.only(bottom: 0.015.sh),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 13.sp,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(
          height: 0.005.sh,
        ),
        TextField(
          controller: controller,
          obscureText: isObscure,
          decoration: InputDecoration(
            isDense: true,
            contentPadding:
                EdgeInsets.fromLTRB(0.02.sh, 0.015.sh, 0.01.sh, 0.015.sh),
            enabledBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Color(0xFFB9B9B9)),
              borderRadius: BorderRadius.circular(15.r),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.blue),
              borderRadius: BorderRadius.circular(15.r),
            ),
            suffixIcon:
                GestureDetector(onTap: () => funtion(check), child: icon),
          ),
          style: TextStyle(
              fontSize: 15.sp,
              fontWeight: FontWeight.w500,
              color: Colors.grey.shade600),
        ),
      ],
    ),
  );
}
