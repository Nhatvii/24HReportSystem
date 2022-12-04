import 'package:capstone_project/models/user_sos_request_map_page_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SosInfoPart extends StatelessWidget {
  final UserSosRequestPageMapModel userSosRequestPageModel;
  const SosInfoPart({super.key, required this.userSosRequestPageModel});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 1.sw,
      padding: EdgeInsets.all(0.01.sh),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          titleAndContent('TÊN ĐƠN VỊ', userSosRequestPageModel.officeName),
          titleAndContent(
              'KHOẢNG CÁCH', '${userSosRequestPageModel.distance.toStringAsFixed(1)} Km'),
          titleAndContent(
              'THỜI GIAN', '${userSosRequestPageModel.minute.toStringAsFixed(0)} Phút'),
        ],
      ),
    );
  }

  Widget titleAndContent(String title, String content) {
    return Container(
      width: 0.28.sw,
      padding: EdgeInsets.all(0.01.sh),
      child: Column(
        children: [
          Text(
            title,
            textAlign: TextAlign.center,
            style: TextStyle(
                fontSize: 12.sp,
                fontWeight: FontWeight.w600,
                color: Colors.grey.shade400),
          ),
          SizedBox(
            height: 0.005.sh,
          ),
          Text(
            content,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
