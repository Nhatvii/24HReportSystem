// import 'package:capstone_project/components/round_button_icon.dart';
import 'package:capstone_project/models/user_sos_request_map_page_model.dart';
import 'package:capstone_project/pages/user_sos_request_page_map/receive_panel_component/sos_info.dart';
import 'package:capstone_project/pages/user_sos_request_page_map/receive_panel_component/timeline_part.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
// import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class ReceiveResponsePanel extends StatelessWidget {
  final UserSosRequestPageMapModel userSosRequestPageModel;
  final Function cancelRequest;
  const ReceiveResponsePanel(
      {super.key,
      required this.userSosRequestPageModel,
      required this.cancelRequest});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 0.45.sh,
      width: 1.sw,
      padding: EdgeInsets.symmetric(horizontal: 0.03.sh),
      child: Container(
        height: 0.45.sh,
        width: 1.sw,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.all(Radius.circular(10.r)),
          boxShadow: [
            BoxShadow(
                color: Colors.grey.withOpacity(0.2),
                spreadRadius: 3,
                blurRadius: 3,
                offset: const Offset(0, 0)),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.fromLTRB(0.02.sh, 0.01.sh, 0.02.sh, 0.01.sh),
              decoration: BoxDecoration(
                color: const Color(0xFFF7F7F7),
                borderRadius: BorderRadius.vertical(top: Radius.circular(10.r)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        userSosRequestPageModel.officerName,
                        style: TextStyle(fontSize: 14.sp),
                      ),
                      Text(
                        'Người hỗ trợ',
                        style: TextStyle(fontSize: 12.sp),
                      ),
                    ],
                  ),
                  Text(
                    userSosRequestPageModel.statusRequest,
                    style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
                  ),
                  // RoundButtonIcon(
                  //   height: 0.06.sh,
                  //   width: 0.13.sw,
                  //   color: Colors.blue,
                  //   isShadow: false,
                  //   icon: Icon(
                  //     FontAwesomeIcons.phone,
                  //     size: 22.sp,
                  //     color: Colors.white,
                  //   ),
                  // ),
                ],
              ),
            ),
            Divider(
              height: 1,
              thickness: 0.002.sh,
            ),
            SizedBox(
              height: 0.35.sh,
              width: 1.sw,
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    TimeLinePart(
                      userSosRequestPageModel: userSosRequestPageModel,
                    ),
                    Divider(
                      height: 1,
                      thickness: 0.002.sh,
                    ),
                    SosInfoPart(
                      userSosRequestPageModel: userSosRequestPageModel,
                    ),
                    GestureDetector(
                      onTap: () => cancelRequest(),
                      child: Container(
                        height: 0.06.sh,
                        width: 0.8.sw,
                        decoration: BoxDecoration(
                          color: const Color(0xFF0C2A46),
                          borderRadius: BorderRadius.all(Radius.circular(10.r)),
                        ),
                        child: Center(
                            child: Text(
                          'Hủy yêu cầu',
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w500),
                        )),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            // ),
          ],
        ),
      ),
    );
  }
}
