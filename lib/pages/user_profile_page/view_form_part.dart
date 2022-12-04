import 'package:capstone_project/models/user_profile_page_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ViewFormPart extends StatelessWidget {
  final UserProfilePageModel userProfilePageModel;
  final Function isEditFunction;
  final Function confirmFunction;
  final Function cancelEditFunction;
  const ViewFormPart(
      {Key? key,
      required this.userProfilePageModel,
      required this.isEditFunction,
      required this.confirmFunction,
      required this.cancelEditFunction})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        titleAndContent('Email', userProfilePageModel.email,
            userProfilePageModel.isEdit, false),
        titleAndContent('Họ và Tên', userProfilePageModel.name,
            userProfilePageModel.isEdit, true),
        titleAndContent('Địa Chỉ', userProfilePageModel.address,
            userProfilePageModel.isEdit, false),
        titleAndContent(
            'Số Điện Thoại', userProfilePageModel.phone, false, false),
        titleAndContent('CCCD/CMND', userProfilePageModel.identityCard,
            userProfilePageModel.isEdit, false),
        SizedBox(
          height: 0.04.sh,
        ),
        userProfilePageModel.isEdit
            ? Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  GestureDetector(
                    onTap: () => confirmFunction(),
                    child: Container(
                      height: 0.055.sh,
                      width: 0.3.sw,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10.r),
                        gradient: const LinearGradient(colors: <Color>[
                          Color(0xFF56CCF2),
                          Color(0xFF2F80ED),
                        ]),
                      ),
                      child: Text('Xác Nhận',
                          style: TextStyle(
                              fontSize: 16.sp,
                              color: Colors.white,
                              fontWeight: FontWeight.w500)),
                    ),
                  ),
                  GestureDetector(
                    onTap: () => cancelEditFunction(),
                    child: Container(
                      height: 0.055.sh,
                      width: 0.2.sw,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10.r),
                        gradient: const LinearGradient(colors: <Color>[
                          Color(0xFFFB8883),
                          Color(0xFFFF4B2B),
                        ]),
                      ),
                      child: Text('Hủy',
                          style: TextStyle(
                              fontSize: 16.sp,
                              color: Colors.white,
                              fontWeight: FontWeight.w500)),
                    ),
                  ),
                ],
              )
            : Center(
                child: GestureDetector(
                  onTap: () => isEditFunction(),
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
                    child: Text('Chỉnh Sửa',
                        style: TextStyle(
                            fontSize: 16.sp,
                            color: Colors.white,
                            fontWeight: FontWeight.w500)),
                  ),
                ),
              ),
        SizedBox(
          height: 0.1.sh,
        ),
      ],
    );
  }
}

Widget titleAndContent(String title, TextEditingController controller,
    bool isEnabled, bool isFocus) {
  return Container(
    width: 1.sw,
    margin: EdgeInsets.only(bottom: 0.015.sh),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 14.sp,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(
          height: 0.008.sh,
        ),
        TextField(
          controller: controller,
          autofocus: isFocus,
          decoration: InputDecoration(
            isDense: true,
            enabled: isEnabled,
            contentPadding:
                EdgeInsets.fromLTRB(0.02.sh, 0.015.sh, 0.01.sh, 0.015.sh),
            enabledBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Color(0xFFB9B9B9)),
              borderRadius: BorderRadius.circular(15.r),
            ),
            disabledBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.black45),
              borderRadius: BorderRadius.circular(15.r),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.blue),
              borderRadius: BorderRadius.circular(15.r),
            ),
          ),
          style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w500,
              color: const Color(0xFF474040)),
        ),
      ],
    ),
  );
}
