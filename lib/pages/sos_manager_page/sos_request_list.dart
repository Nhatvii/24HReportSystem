import 'package:capstone_project/entities/notify.dart';
import 'package:capstone_project/models/sos_manager_page_model.dart';
import 'package:capstone_project/pages/sos_manager_page/officer_list_bottom_sheet.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:intl/intl.dart';

class SosRequestList extends StatelessWidget {
  final SosManagerPageModel sosManagerPageModel;
  const SosRequestList({super.key, required this.sosManagerPageModel});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Notify>>(
        future: sosManagerPageModel.fetchListNotify,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Container(
                height: 1.sh,
                alignment: Alignment.center,
                child: const CircularProgressIndicator(),
              );
            }
          }
          if (snapshot.hasData) {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return Column(
                  children: [
                    GestureDetector(
                      onTap: () {
                        showListOfficerModalSheet(context);
                      },
                      child: Container(
                        margin: EdgeInsets.only(bottom: 0.01.sh),
                        height: 0.27.sh,
                        width: 1.sw,
                        child: Card(
                          elevation: 2,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.r),
                            side: BorderSide(
                                color: Colors.grey, width: 0.0005.sh),
                          ),
                          child: Padding(
                            padding: EdgeInsets.all(0.015.sh),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  margin: EdgeInsets.only(bottom: 0.01.sh),
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'SOS',
                                        style: TextStyle(
                                            fontSize: 15.sp,
                                            fontWeight: FontWeight.w600),
                                      ),
                                      Text(
                                          snapshot.data![index].notifyStatus
                                              ? 'Đang Xử Lý'
                                              : 'Hoàn Thành',
                                          style: snapshot
                                                  .data![index].notifyStatus
                                              ? TextStyle(
                                                  fontSize: 14.sp,
                                                  fontWeight: FontWeight.w600,
                                                  color: Colors.blue)
                                              : TextStyle(
                                                  fontSize: 14.sp,
                                                  fontWeight: FontWeight.w600,
                                                  color: Colors.blue)),
                                    ],
                                  ),
                                ),
                                // Container(
                                //   margin: EdgeInsets.only(bottom: 0.005.sh),
                                //   child: Text(
                                //     'Địa điểm:  Bệnh viện quận 12',
                                //     style: TextStyle(fontSize: 15.sp),
                                //   ),
                                // ),
                                Text(
                                  'Thời gian:  ${DateFormat('dd-MM-yyyy').format(snapshot.data![index].acceptedDate)}',
                                  style: TextStyle(fontSize: 15.sp),
                                ),
                                Divider(
                                  color: Colors.grey,
                                  thickness: 0.001.sh,
                                ),
                                Container(
                                  margin: EdgeInsets.only(bottom: 0.005.sh),
                                  child: Text(
                                    'Thông tin người cần hỗ trợ',
                                    style: TextStyle(
                                        fontSize: 15.sp,
                                        fontWeight: FontWeight.w600),
                                  ),
                                ),
                                Container(
                                  margin: EdgeInsets.only(bottom: 0.005.sh),
                                  child: Text(
                                    'Họ tên:  ${snapshot.data![index].user.accountInfo.fullname}',
                                    style: TextStyle(fontSize: 15.sp),
                                  ),
                                ),
                                Text(
                                  'Số điện thoại:  ${snapshot.data![index].user.phoneNumber}',
                                  style: TextStyle(fontSize: 15.sp),
                                ),
                                // SizedBox(
                                //   height: 0.015.sh,
                                // ),
                                // Container(
                                //     padding: EdgeInsets.all(0.012.sh),
                                //     decoration: BoxDecoration(
                                //       borderRadius: BorderRadius.circular(5.r),
                                //       gradient: const LinearGradient(
                                //         colors: <Color>[
                                //           Color(0xFF56CCF2),
                                //           Color(0xFF2F80ED),
                                //         ],
                                //         begin: Alignment.centerLeft,
                                //       ),
                                //     ),
                                //     child: Text(
                                //       'Phân Công',
                                //       style: TextStyle(
                                //         fontSize: 13.sp,
                                //         fontWeight: FontWeight.w500,
                                //         color: Colors.white,
                                //       ),
                                //     )),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                );
              },
            );
          }
          if (snapshot.hasError) {
            print(snapshot.error);
          }
          return Container();
        });
  }

  Future showListOfficerModalSheet(BuildContext context) {
    return showModalBottomSheet(
        backgroundColor: Colors.transparent,
        context: context,
        builder: (context) {
          return OfficerListBottomSheet();
        });
  }
}
