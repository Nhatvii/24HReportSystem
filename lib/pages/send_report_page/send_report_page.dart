import 'dart:io';

import 'package:capstone_project/components/alert_dialog.dart';
import 'package:capstone_project/components/rounded_text.dart';
import 'package:capstone_project/models/send_report_page_model.dart';
import 'package:capstone_project/pages/main_page/main_page.dart';
import 'package:capstone_project/pages/report_send_history_page/report_send_history_page.dart';
import 'package:capstone_project/pages/send_report_page/description_text_part.dart';
// import 'package:capstone_project/pages/map_page/map_page_report/choose_location_part.dart';
import 'package:capstone_project/pages/send_report_page/list_image_choose.dart';
import 'package:capstone_project/pages/send_report_page/list_video_choose.dart';
import 'package:capstone_project/pages/send_report_page/location_text_part.dart';
import 'package:capstone_project/pages/send_report_page/record_report_audio_part.dart';
import 'package:capstone_project/pages/send_report_page/time_select_part.dart';
import 'package:capstone_project/presenters/send_report_page_presenter.dart';
import 'package:capstone_project/views/send_report_page_view.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SendReportPage extends StatefulWidget {
  const SendReportPage({Key? key}) : super(key: key);

  @override
  State<SendReportPage> createState() => _SendReportPageState();
}

class _SendReportPageState extends State<SendReportPage>
    implements SendReportPageView {
  late SendReportPageModel _sendReportPageModel;
  late SendReportPagePresenter _sendReportPagePresenter;

  @override
  void initState() {
    super.initState();
    _sendReportPagePresenter = SendReportPagePresenter();
    _sendReportPagePresenter.view = this;
    _sendReportPagePresenter.init();
  }

  @override
  void dispose() {
    _sendReportPagePresenter.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(
          'Gửi Tình Huống',
          style: TextStyle(fontSize: 16.sp, fontWeight: FontWeight.w700),
        ),
        centerTitle: true,
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(colors: <Color>[
              Color(0xFF56CCF2),
              Color(0xFF2F80ED),
            ]),
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: GestureDetector(
          behavior: HitTestBehavior.translucent,
          onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
          child: Container(
            padding: EdgeInsets.only(
                top: 0.025.sh, left: 0.03.sh, right: 0.03.sh, bottom: 0.08.sh),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                LocationTextPart(
                    sendReportPageModel: _sendReportPageModel,
                    sendReportPagePresenter: _sendReportPagePresenter),
                SizedBox(
                  height: 0.02.sh,
                ),
                TimeSelectPart(
                    sendReportPageModel: _sendReportPageModel,
                    sendReportPagePresenter: _sendReportPagePresenter),
                SizedBox(
                  height: 0.02.sh,
                ),
                DescriptionTextPart(sendReportPageModel: _sendReportPageModel),
                SizedBox(
                  height: 0.02.sh,
                ),
                RecordReportAudioPart(
                    sendReportPageModel: _sendReportPageModel,
                    sendReportPagePresenter: _sendReportPagePresenter),
                SizedBox(
                  height: 0.02.sh,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Phương Tiện Truyền Thông',
                      style: TextStyle(
                          fontSize: 14.sp, fontWeight: FontWeight.w700),
                    ),
                    Container(
                      decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey, width: 1)),
                      alignment: Alignment.center,
                      padding: EdgeInsets.all(0.005.sh),
                      child: GestureDetector(
                        onTap: () {
                          chooseMedia();
                        },
                        child: Icon(
                          Icons.add,
                          size: 25.sp,
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(
                  height: 0.01.sh,
                ),
                ListImageChoose(
                  list: _sendReportPageModel.listImage,
                  function: confirmDeleteMedia,
                ),
                SizedBox(
                  height: 0.015.sh,
                ),
                ListVideoChoose(
                  list: _sendReportPageModel.listVideo,
                  function: confirmDeleteMedia,
                ),
                SizedBox(
                  height: 0.015.sh,
                ),
                _sendReportPageModel.accountId != null ||
                        _sendReportPageModel.email != null
                    ? Row(
                        children: [
                          Checkbox(
                              value: _sendReportPageModel.isAnonymous,
                              onChanged: (value) {
                                anonymousBox();
                              }),
                          Text(
                            'Gửi ẩn danh',
                            style: TextStyle(fontSize: 13.sp),
                          )
                        ],
                      )
                    : Container(),
                _sendReportPageModel.accountId != null ||
                        _sendReportPageModel.email != null
                    ? Row(
                        children: [
                          Checkbox(
                              value: _sendReportPageModel.isAgree,
                              onChanged: (value) {
                                agreeBox();
                              }),
                          SizedBox(
                            width: 0.75.sw,
                            child: Text(
                              'Tôi đồng ý chịu trách nhiệm với những thông tin trên.',
                              style: TextStyle(fontSize: 13.sp),
                            ),
                          )
                        ],
                      )
                    : Container(),
                SizedBox(
                  height: 0.01.sh,
                ),
                Container(
                  alignment: Alignment.center,
                  child: TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor:
                            _sendReportPageModel.accountId != null ||
                                    _sendReportPageModel.email != null
                                ? _sendReportPageModel.isAgree
                                    ? Theme.of(context).primaryColor
                                    : Colors.grey
                                : _sendReportPageModel.isSend
                                    ? Theme.of(context).primaryColor
                                    : Colors.grey,
                        padding: EdgeInsets.symmetric(
                            horizontal: 0.03.sh, vertical: 0.015.sh),
                        side: BorderSide(
                          color: Colors.grey,
                          width: 0.001.sw,
                        ),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.r)),
                      ),
                      onPressed: _sendReportPageModel.accountId != null ||
                              _sendReportPageModel.email != null
                          ? _sendReportPageModel.isAgree
                              ? () {
                                  sendReport();
                                }
                              : null
                          : _sendReportPageModel.isSend
                              ? () {
                                  sendReport();
                                }
                              : null,
                      child: Text(
                        'Xác Nhận',
                        style: TextStyle(fontSize: 14.sp, color: Colors.white),
                      )),
                ),
                SizedBox(
                  height: 0.06.sh,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void refreshData(SendReportPageModel model) {
    if (mounted) {
      setState(() {
        _sendReportPageModel = model;
      });
    }
  }

  @override
  void agreeBox() {
    _sendReportPagePresenter.agreeBox();
  }

  @override
  void anonymousBox() {
    _sendReportPagePresenter.anonymousBox();
  }

  @override
  void sendReport() {
    _sendReportPagePresenter.sendReport();
  }

  @override
  void chooseImageOrVideo() {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            actions: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    'Bạn muốn ',
                    style: TextStyle(fontSize: 18.sp),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      TextButton(
                        child: Row(
                          children: [
                            const Icon(Icons.camera_alt),
                            SizedBox(
                              width: 0.01.sh,
                            ),
                            Text("Chụp ảnh", style: TextStyle(fontSize: 12.sp)),
                          ],
                        ),
                        onPressed: () {
                          _sendReportPagePresenter.openCamera();
                          Navigator.pop(context);
                        },
                      ),
                      TextButton(
                        child: Row(
                          children: [
                            const Icon(
                              FontAwesomeIcons.video,
                              size: 22,
                            ),
                            SizedBox(
                              width: 0.01.sh,
                            ),
                            Text("Quay video",
                                style: TextStyle(fontSize: 12.sp)),
                          ],
                        ),
                        onPressed: () {
                          _sendReportPagePresenter.openVideo();
                          Navigator.pop(context);
                        },
                      )
                    ],
                  ),
                ],
              ),
            ],
          );
        });
  }

  @override
  void showToast(String msg) {
    Fluttertoast.showToast(
      msg: msg,
      gravity: ToastGravity.BOTTOM,
    );
  }

  @override
  void navigateToShowReportPage() {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: ((context) => const ReportSendHistoryPage())));
  }

  @override
  void navigateToHomePage() {
    Navigator.push(context,
        MaterialPageRoute(builder: ((context) => const MainPage(page: 0))));
  }

  @override
  void chooseMedia() {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialogCustom(
              title: Text(
                'Chọn Ảnh',
                style: TextStyle(fontSize: 13.sp),
              ),
              content: Text('Chọn ảnh từ thư viện hoặc máy ảnh',
                  style: TextStyle(fontSize: 13.sp)),
              confirmFunction: TextButton(
                child: Row(
                  children: [
                    const Icon(Icons.camera_alt),
                    SizedBox(
                      width: 0.01.sh,
                    ),
                    Text("Máy ảnh", style: TextStyle(fontSize: 12.sp)),
                  ],
                ),
                onPressed: () {
                  Navigator.pop(context);
                  // _sendReportPagePresenter.chooseMedia();
                  chooseImageOrVideo();
                },
              ),
              cancelFunction: TextButton(
                child: Row(
                  children: [
                    const Icon(Icons.image),
                    SizedBox(
                      width: 0.01.sh,
                    ),
                    Text("Thư viện", style: TextStyle(fontSize: 12.sp)),
                  ],
                ),
                onPressed: () {
                  _sendReportPagePresenter.selectFile();
                  Navigator.pop(context);
                },
              ));
        });
  }

  @override
  void confirmDeleteMedia(int index, File file) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialogCustom(
              title: Text(
                'Thông báo',
                style: TextStyle(fontSize: 13.sp),
              ),
              content: Text('Bạn muốn xóa hình/video này?',
                  style: TextStyle(fontSize: 13.sp)),
              confirmFunction: TextButton(
                child: Text("Xác nhận", style: TextStyle(fontSize: 12.sp)),
                onPressed: () {
                  _sendReportPagePresenter.removeMedia(index, file);
                  Navigator.pop(context);
                },
              ),
              cancelFunction: TextButton(
                child: Text("Hủy", style: TextStyle(fontSize: 12.sp)),
                onPressed: () {
                  Navigator.pop(context);
                },
              ));
        });
  }
}
