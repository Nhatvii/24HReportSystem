import 'package:capstone_project/components/rounded_text.dart';
import 'package:capstone_project/models/send_report_page_model.dart';
import 'package:capstone_project/pages/main_page/main_page.dart';
import 'package:capstone_project/pages/report_send_history_page/report_send_history_page.dart';
import 'package:capstone_project/pages/send_report_page/list_image_choose.dart';
import 'package:capstone_project/presenters/send_report_page_presenter.dart';
import 'package:capstone_project/views/send_report_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_sound/flutter_sound.dart';
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
    for (var i in _sendReportPageModel.listImageString) {
      print(i);
    }
    for (var i in _sendReportPageModel.listVideoString) {
      print(i);
    }
    // print(_sendReportPageModel.email);
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Gửi Đơn Báo Cáo',
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
        child: Padding(
          padding: EdgeInsets.only(
              top: 0.025.sh, left: 0.03.sh, right: 0.03.sh, bottom: 0.08.sh),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                margin: EdgeInsets.only(bottom: 0.005.sh),
                child: Text(
                  'Địa Điểm Xảy Ra',
                  style:
                      TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w700),
                ),
              ),
              RoundedText(
                height: 0.055.sh,
                width: 1.sw,
                radius: 15.r,
                maxLines: 0,
                controller: _sendReportPageModel.location,
                function: () {},
              ),
              SizedBox(
                height: 0.01.sh,
              ),
              Container(
                margin: EdgeInsets.only(bottom: 0.005.sh),
                child: Text(
                  'Thời Gian Xảy Ra',
                  style:
                      TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w700),
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(
                  horizontal: 0.03.sh,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      children: [
                        GestureDetector(
                          onTap: () => _sendReportPagePresenter.selectedDate(
                              context,
                              _sendReportPageModel.today,
                              _sendReportPageModel.date),
                          child: Text(
                            'Chọn ngày: ',
                            style: TextStyle(
                                fontSize: 14.sp, fontWeight: FontWeight.w500),
                          ),
                        ),
                        SizedBox(
                          height: 0.005.sh,
                        ),
                        Text(
                          _sendReportPageModel.date.text,
                          style: TextStyle(
                            fontSize: 14.sp,
                            color: Colors.blue,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                    Column(
                      children: [
                        GestureDetector(
                          onTap: () => _sendReportPagePresenter.selectedTime(
                              context,
                              _sendReportPageModel.todayTime,
                              _sendReportPageModel.time),
                          child: Text(
                            'Chọn giờ: ',
                            style: TextStyle(
                                fontSize: 14.sp, fontWeight: FontWeight.w500),
                          ),
                        ),
                        SizedBox(
                          height: 0.005.sh,
                        ),
                        Text(
                          _sendReportPageModel.time.text,
                          style: TextStyle(
                            fontSize: 14.sp,
                            color: Colors.blue,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 0.01.sh,
              ),
              Container(
                margin: EdgeInsets.only(bottom: 0.005.sh),
                child: Text(
                  'Mô Tả',
                  style:
                      TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w700),
                ),
              ),
              RoundedText(
                height: 0.1.sh,
                width: 1.sw,
                radius: 15.r,
                maxLines: 4,
                controller: _sendReportPageModel.description,
                function: () {},
              ),
              SizedBox(
                height: 0.01.sh,
              ),
              Container(
                alignment: Alignment.center,
                child: Text(
                  'Hoặc',
                  style:
                      TextStyle(fontSize: 13.sp, fontWeight: FontWeight.w700),
                ),
              ),
              SizedBox(
                height: 0.01.sh,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    margin: EdgeInsets.only(right: 0.02.sw),
                    alignment: Alignment.center,
                    child: TextButton(
                        style: TextButton.styleFrom(
                          padding: EdgeInsets.all(0.015.sh),
                          side: BorderSide(
                            color: Colors.grey,
                            width: 0.002.sw,
                          ),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10.r)),
                        ),
                        onPressed: () {
                          _sendReportPagePresenter.isRecord();
                        },
                        child: _sendReportPageModel.recorder.isRecording
                            ? StreamBuilder<RecordingDisposition>(
                                stream:
                                    _sendReportPageModel.recorder.onProgress,
                                builder: (context, snapshot) {
                                  _sendReportPageModel.recordDuration =
                                      snapshot.hasData
                                          ? snapshot.data!.duration
                                          : Duration.zero;
                                  _sendReportPagePresenter.displayTimeRecord();
                                  return Text(
                                    '${_sendReportPageModel.twoDigitMinutes}:${_sendReportPageModel.twoDigitSeconds}',
                                    style: TextStyle(
                                        fontSize: 14.sp, color: Colors.black),
                                  );
                                },
                              )
                            : Text(
                                'Ghi Âm',
                                style: TextStyle(
                                    fontSize: 14.sp, color: Colors.black),
                              )),
                  ),
                  ClipOval(
                    child: Material(
                      color: Colors.blue,
                      child: InkWell(
                        onTap: () => _sendReportPagePresenter.deleteRecord(),
                        child: SizedBox(
                            width: 0.12.sw,
                            height: 0.06.sh,
                            child: Icon(
                              FontAwesomeIcons.trash,
                              size: 14.sp,
                              color: Colors.white,
                            )),
                      ),
                    ),
                  )
                ],
              ),
              Slider(
                  min: 0,
                  max: _sendReportPageModel.duration.inSeconds.toDouble(),
                  value: _sendReportPageModel.position.inSeconds.toDouble(),
                  onChanged: (value) {
                    _sendReportPagePresenter.playAudioInAnySecond(value);
                  }),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 0.005.sh),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(_sendReportPageModel
                        .formatTime(_sendReportPageModel.position)),
                    GestureDetector(
                      onTap: () => _sendReportPagePresenter.playAudio(),
                      child: Icon(
                        _sendReportPageModel.isPlaying
                            ? FontAwesomeIcons.pause
                            : FontAwesomeIcons.play,
                        size: 18.sp,
                        color: Colors.blue,
                      ),
                    ),
                    Text(_sendReportPageModel.formatTime(
                        _sendReportPageModel.duration -
                            _sendReportPageModel.position)),
                  ],
                ),
              ),
              SizedBox(
                height: 0.02.sh,
              ),
              Text(
                'Phương Tiện Truyền Thông',
                style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w700),
              ),
              SizedBox(
                height: 0.01.sh,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    children: [
                      Container(
                        alignment: Alignment.center,
                        child: Text(
                          'Tải Từ Thư Viện',
                          style: TextStyle(
                            fontSize: 12.sp,
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 0.01.sh,
                      ),
                      Container(
                        alignment: Alignment.center,
                        child: IconButton(
                          icon: Icon(
                            Icons.add,
                            size: 25.sp,
                          ),
                          onPressed: () {
                            selectFile();
                          },
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                      height: 0.1.sh,
                      child: VerticalDivider(
                        color: Colors.grey,
                        thickness: 2,
                        width: 0.002.sw,
                      )),
                  Column(
                    children: [
                      Container(
                        alignment: Alignment.center,
                        child: Text(
                          'Chụp Từ Máy Ảnh',
                          style: TextStyle(
                            fontSize: 12.sp,
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 0.01.sh,
                      ),
                      Container(
                        alignment: Alignment.center,
                        child: IconButton(
                          icon: Icon(
                            Icons.add,
                            size: 25.sp,
                          ),
                          onPressed: () {
                            openCamera();
                          },
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(
                height: 0.015.sh,
              ),
              _sendReportPageModel.listImage.isEmpty
                  ? Container()
                  : ListImageChoose(
                      list: _sendReportPageModel.listImage,
                      sendReportPagePresenter: _sendReportPagePresenter,
                    ),
              SizedBox(
                height: 0.015.sh,
              ),
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
                          style: TextStyle(fontSize: 12.sp),
                        )
                      ],
                    )
                  : Container(),
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
                            style: TextStyle(fontSize: 12.sp),
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
                      backgroundColor: _sendReportPageModel.email == null
                          ? Theme.of(context).primaryColor
                          : _sendReportPageModel.isAgree
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
                    onPressed: _sendReportPageModel.email == null
                        ? () {
                            sendReport();
                          }
                        : _sendReportPageModel.isAgree
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
    );
  }

  @override
  void refreshData(SendReportPageModel model) {
    setState(() {
      _sendReportPageModel = model;
    });
  }

  @override
  void selectFile() {
    _sendReportPagePresenter.selectFile();
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
  void openCamera() {
    _sendReportPagePresenter.openCamera();
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
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: ((context) => const MainPage(page: 0))));
  }

  // @override
  // void removeImage(int index) {
  //   _sendReportPagePresenter.removeImage(index);
  // }
}
