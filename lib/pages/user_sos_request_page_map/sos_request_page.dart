import 'package:capstone_project/components/alert_dialog.dart';
import 'package:capstone_project/components/round_button_icon.dart';
import 'package:capstone_project/models/user_sos_request_map_page_model.dart';
import 'package:capstone_project/pages/user_sos_request_page_map/receive_response_panel.dart';
import 'package:capstone_project/pages/user_sos_request_page_map/send_request_panel.dart';
import 'package:capstone_project/presenters/user_sos_request_map_page_presenter.dart';
import 'package:capstone_project/views/user_sos_request_map_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mapbox_gl/mapbox_gl.dart';

class UserSosRequestPage extends StatefulWidget {
  const UserSosRequestPage({super.key});

  @override
  State<UserSosRequestPage> createState() => _UserSosRequestPageState();
}

class _UserSosRequestPageState extends State<UserSosRequestPage>
    implements UserSosRequestPageMapView {
  late UserSosRequestPageMapModel _userSosRequestPageModel;
  late UserSosRequestPageMapPresenter _userSosRequestPagePresenter;

  @override
  void initState() {
    super.initState();
    _userSosRequestPagePresenter = UserSosRequestPageMapPresenter();
    _userSosRequestPagePresenter.view = this;
    _userSosRequestPagePresenter.init();
    _userSosRequestPagePresenter.initSignalR();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
      child: Stack(
        children: [
          Container(
            height: 1.sh,
            width: 1.sw,
            color: Colors.white,
            child: MapboxMap(
              styleString:
                  // 'https://tiles.goong.io/assets/goong_map_web.json?api_key=XLqQzFQgRrm4HzcMRSQE7c6BzQbjFXLBo5stg87v',
                  'https://api.mapbox.com/styles/v1/quanghuy117/cl61w4oqt000715n3txlqlm8o?access_token=pk.eyJ1IjoicXVhbmdodXkxMTciLCJhIjoiY2w2MHZndGNkMXJnaDNqbW9iOXU4ZzVrZCJ9.dLvdaF56MkaEUZlv0wB_xw',
              accessToken: dotenv.env['MAPBOX_ACCESS_TOKEN'],
              onMapCreated: _userSosRequestPagePresenter.onMapCreated,
              initialCameraPosition:
                  _userSosRequestPageModel.initialCameraPosition,
              onStyleLoadedCallback:
                  _userSosRequestPagePresenter.onStyleLoadedCallback,
              minMaxZoomPreference: const MinMaxZoomPreference(8, 20),
              // cameraTargetBounds: CameraTargetBounds(LatLngBounds(
              //   northeast: Lat,
              //   southwest: ,
              // )),
              // myLocationEnabled: true,
              // myLocationTrackingMode: MyLocationTrackingMode.TrackingGPS,
              onMapClick: _userSosRequestPagePresenter.onMapClick,
            ),
          ),
          _userSosRequestPageModel.isReceivedNoti
              ? Positioned(
                  bottom: 0.02.sh,
                  child: ReceiveResponsePanel(
                    userSosRequestPageModel: _userSosRequestPageModel,
                    cancelRequest: showCancelReasonPanel,
                  ),
                )
              : Positioned(
                  bottom: 0.02.sh,
                  child: SendRequestPanel(
                      userSosRequestPageModel: _userSosRequestPageModel,
                      userSosRequestPagePresenter: _userSosRequestPagePresenter,
                      function: changePanel),
                ),
          Positioned(
            top: 0.025.sh,
            left: 0.015.sh,
            child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: RoundButtonIcon(
                height: 0.07.sh,
                width: 0.15.sw,
                color: Colors.white,
                isShadow: true,
                icon: Padding(
                  padding: EdgeInsets.only(left: 0.015.sh),
                  child: Icon(
                    Icons.arrow_back_ios,
                    size: 24.sp,
                    color: Colors.blue,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    ));
  }

  @override
  void refreshData(UserSosRequestPageMapModel model) {
    setState(() {
      _userSosRequestPageModel = model;
    });
  }

  @override
  void changePanel() {
    _userSosRequestPagePresenter.sendRequest();
  }

  @override
  void navigateToHomePage() {
    Navigator.pop(context);
  }

  @override
  void showCancelReasonPanel() {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialogCustom(
              title: Text(
                'Thông Báo',
                style: TextStyle(fontSize: 13.sp),
              ),
              content:
                  Text('Hủy yêu cầu hỗ trợ', style: TextStyle(fontSize: 13.sp)),
              confirmFunction: TextButton(
                child: Text("Xác nhận", style: TextStyle(fontSize: 12.sp)),
                onPressed: () {
                  _userSosRequestPagePresenter.cancelRequest(context);
                },
              ),
              cancelFunction: TextButton(
                child: Text("Hủy", style: TextStyle(fontSize: 12.sp)),
                onPressed: () => Navigator.pop(context),
              ));
        });
  }

  @override
  void showToastMessage(String msg) {
    Fluttertoast.showToast(
      msg: msg,
      gravity: ToastGravity.BOTTOM,
    );
  }
}
