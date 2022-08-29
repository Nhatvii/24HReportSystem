import 'package:capstone_project/models/user_profile_page_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ViewFormPart extends StatelessWidget {
  final UserProfilePageModel userProfilePageModel;
  final Function isEditFunction;
  const ViewFormPart(
      {Key? key,
      required this.userProfilePageModel,
      required this.isEditFunction})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        titleAndContent('Email:', userProfilePageModel.email.text),
        titleAndContent('Họ và Tên:', userProfilePageModel.name.text),
        titleAndContent('Địa Chỉ:', userProfilePageModel.address.text),
        titleAndContent('Số Điện Thoại:', userProfilePageModel.phone.text),
        titleAndContent('CCCD/CMND:', userProfilePageModel.identityCard.text),
        SizedBox(
          height: 0.04.sh,
        ),
        Center(
          child: GestureDetector(
            onTap: () => isEditFunction(),
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
              child: Text('Chỉnh Sửa',
                  style: TextStyle(fontSize: 16.sp, color: Colors.white)),
            ),
          ),
        ),
        SizedBox(
          height: 0.02.sh,
        ),
      ],
    );
  }
}

Widget titleAndContent(String title, String content) {
  return Container(
    width: 1.sw,
    margin: EdgeInsets.only(bottom: 0.04.sh),
    child: Row(
      children: [
        Text(
          title,
          style: TextStyle(fontSize: 16.sp),
        ),
        SizedBox(
          width: 0.01.sw,
        ),
        Text(
          content,
          style: TextStyle(fontSize: 18.sp, fontWeight: FontWeight.w500),
        ),
      ],
    ),
  );
}
