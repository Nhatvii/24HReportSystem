import 'package:bottom_picker/bottom_picker.dart';
import 'package:bottom_picker/resources/arrays.dart';
import 'package:capstone_project/components/round_button_icon.dart';
import 'package:capstone_project/models/user_sos_request_map_page_model.dart';
import 'package:capstone_project/presenters/user_sos_request_map_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class SendRequestPanel extends StatelessWidget {
  final UserSosRequestPageMapModel userSosRequestPageModel;
  final UserSosRequestPageMapPresenter userSosRequestPagePresenter;
  final Function function;
  const SendRequestPanel(
      {super.key,
      required this.function,
      required this.userSosRequestPageModel,
      required this.userSosRequestPagePresenter});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Container(
          margin: EdgeInsets.only(bottom: 0.025.sh, right: 0.02.sh),
          child: GestureDetector(
            onTap: () => userSosRequestPagePresenter.animateUserLocation(),
            child: RoundButtonIcon(
              height: 0.07.sh,
              width: 0.15.sw,
              color: Colors.white,
              isShadow: true,
              icon: Icon(
                FontAwesomeIcons.locationCrosshairs,
                size: 24.sp,
              ),
            ),
          ),
        ),
        Container(
          height: 0.38.sh,
          width: 1.sw,
          padding: EdgeInsets.symmetric(horizontal: 0.03.sw),
          child: Container(
            padding: EdgeInsets.fromLTRB(0.03.sh, 0.02.sh, 0.03.sh, 0.01.sh),
            height: 0.28.sh,
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
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: EdgeInsets.only(bottom: 0.02.sh),
                    child: Text(
                      'VỊ TRÍ HIỆN TẠI',
                      style: TextStyle(
                          fontSize: 16.sp, fontWeight: FontWeight.w600),
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.all(0.02.sh),
                    margin: EdgeInsets.only(bottom: 0.02.sh),
                    decoration: BoxDecoration(
                      color: const Color(0xFFDFF0FF),
                      borderRadius: BorderRadius.all(Radius.circular(10.r)),
                      boxShadow: [
                        BoxShadow(
                            color: Colors.grey.withOpacity(0.2),
                            spreadRadius: 2,
                            blurRadius: 4,
                            offset: const Offset(0, 0)),
                      ],
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                            height: 0.03.sh,
                            width: 0.06.sw,
                            padding: EdgeInsets.all(0.005.sh),
                            margin: EdgeInsets.only(right: 0.01.sh),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                    color: Colors.black.withOpacity(0.2),
                                    spreadRadius: 2,
                                    blurRadius: 2,
                                    offset: const Offset(0, 0)),
                              ],
                              // border: Border.all(color: Colors.blue, width: 2),
                            ),
                            child: Container(
                              height: 0.01.sh,
                              width: 0.02.sw,
                              decoration: const BoxDecoration(
                                color: Colors.blue,
                                shape: BoxShape.circle,
                              ),
                            )),
                        Flexible(
                          child: Text(
                            userSosRequestPageModel.userAddress,
                            style: TextStyle(fontSize: 14.sp),
                          ),
                        )
                      ],
                    ),
                  ),
                  Material(
                    elevation: 10,
                    shadowColor: Colors.grey.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(10.r),
                    child: TextField(
                      controller: userSosRequestPageModel.typeSos,
                      style: TextStyle(fontSize: 15.sp),
                      readOnly: true,
                      decoration: InputDecoration(
                        isDense: true,
                        filled: true,
                        fillColor: const Color(0xFFDFF0FF),
                        prefixIcon: Padding(
                          padding:
                              EdgeInsets.only(left: 0.02.sh, right: 0.01.sh),
                          child: Icon(
                            FontAwesomeIcons.circleInfo,
                            color: Colors.blue,
                            size: 20.sp,
                          ),
                        ),
                        suffixIcon: GestureDetector(
                            onTap: (() => chooseSosType(
                                context, userSosRequestPageModel.listType)),
                            child: Icon(
                              Icons.arrow_drop_down,
                              color: Colors.blue,
                              size: 30.sp,
                            )),
                        border: OutlineInputBorder(
                          borderSide: BorderSide.none,
                          borderRadius: BorderRadius.circular(10.r),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 0.02.sh,
                  ),
                  GestureDetector(
                    onTap: userSosRequestPageModel.isSearchingOfficer
                        ? null
                        : () => function(),
                    child: Container(
                      height: 0.08.sh,
                      width: 1.sw,
                      decoration: BoxDecoration(
                        color: Colors.blue,
                        borderRadius: BorderRadius.all(Radius.circular(30.r)),
                        boxShadow: [
                          BoxShadow(
                              color: Colors.grey.withOpacity(0.5),
                              spreadRadius: 1,
                              blurRadius: 2,
                              offset: const Offset(0, 3)),
                        ],
                      ),
                      child: userSosRequestPageModel.isSearchingOfficer
                          ? Center(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const CircularProgressIndicator(
                                    color: Colors.white),
                                Container(
                                  margin: EdgeInsets.only(left: 0.02.sw),
                                  child: Text(
                                    'Đang tìm người hỗ trợ',
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 16.sp,
                                        fontWeight: FontWeight.w600),
                                  ),
                                ),
                              ],
                            ))
                          : Center(
                              child: Text(
                              'Xác nhận',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18.sp,
                                  fontWeight: FontWeight.w600),
                            )),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  chooseSosType(BuildContext context, List<Text> items) {
    BottomPicker(
      items: items,
      selectedItemIndex: userSosRequestPageModel.selectedIndex,
      title: 'Chọn loại sự cố cần hỗ trợ',
      titleStyle: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.sp),
      backgroundColor: Colors.white,
      bottomPickerTheme: BottomPickerTheme.blue,
      onSubmit: (index) {
        userSosRequestPagePresenter.changeType(index);
      },
      itemExtent: 25,
      displayCloseIcon: false,
      pickerTextStyle: TextStyle(
          color: Colors.black, fontWeight: FontWeight.w500, fontSize: 15.sp),
      dismissable: true,
      buttonSingleColor: Colors.blue,
      height: 0.35.sh,
    ).show(context);
  }
}
