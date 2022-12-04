import 'package:capstone_project/models/user_sos_request_map_page_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dash/flutter_dash.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class TimeLinePart extends StatelessWidget {
  final UserSosRequestPageMapModel userSosRequestPageModel;
  const TimeLinePart({super.key, required this.userSosRequestPageModel});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 0.17.sh,
      width: 1.sw,
      // color: Colors.red,
      padding: EdgeInsets.all(0.02.sh),
      child: Row(
        children: [
          Padding(
            padding: EdgeInsets.only(top: 0.008.sh),
            child: Column(
              children: [
                Container(
                    height: 0.03.sh,
                    width: 0.06.sw,
                    padding: EdgeInsets.all(0.005.sh),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.blue, width: 2),
                    ),
                    child: Container(
                      height: 0.01.sh,
                      width: 0.02.sw,
                      decoration: const BoxDecoration(
                        color: Colors.blue,
                        shape: BoxShape.circle,
                      ),
                    )),
                Dash(
                    direction: Axis.vertical,
                    length: 0.05.sh,
                    dashLength: 5,
                    dashColor: Colors.grey),
                SizedBox(
                  height: 0.03.sh,
                  width: 0.06.sw,
                  child: const Icon(
                    FontAwesomeIcons.locationDot,
                    color: Colors.red,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(
            width: 0.02.sw,
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              SizedBox(
                width: 0.7.sw,
                child: Text(
                  userSosRequestPageModel.userAddress,
                  style: TextStyle(fontSize: 15.sp),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
              SizedBox(
                width: 0.7.sw,
                child: Divider(
                  height: 1,
                  thickness: 0.002.sh,
                ),
              ),
              SizedBox(
                width: 0.7.sw,
                child: Text(
                  userSosRequestPageModel.officeAddress,
                  style: TextStyle(fontSize: 15.sp),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
