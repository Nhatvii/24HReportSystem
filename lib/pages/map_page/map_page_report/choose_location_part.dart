import 'package:capstone_project/models/map_page_report_model.dart';
import 'package:capstone_project/pages/map_page/map_page_report/map_page.dart';
import 'package:capstone_project/presenters/map_page_report_presenter.dart';
import 'package:capstone_project/views/map_page_report_view.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class MapLocationPage extends StatefulWidget {
  const MapLocationPage({
    Key? key,
  }) : super(key: key);

  @override
  State<MapLocationPage> createState() => _MapLocationPageState();
}

class _MapLocationPageState extends State<MapLocationPage>
    implements MapPageReportView {
  late MapPageReportModel _mapPageReportModel;
  late MapPageReportPresenter _mapPageReportPresenter;

  @override
  void initState() {
    super.initState();
    _mapPageReportPresenter = MapPageReportPresenter();
    _mapPageReportPresenter.view = this;
    _mapPageReportPresenter.init();
  }

  // @override
  // void dispose() {
  //   _mapPageReportModel.mapController!.dispose();
  //   super.dispose();
  // }


  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      // onWillPop: () async {
      //   Navigator.pop(context);
      //   return true;
      // },
      onWillPop: () async {
        final shouldPop = await showDialog<bool>(
          context: context,
          builder: (context) {
            return AlertDialog(
              title: const Text('Bạn muốn quay lại trang trước?'),
              actionsAlignment: MainAxisAlignment.spaceBetween,
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context, true);
                  },
                  child: const Text('Có'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.pop(context, false);
                  },
                  child: const Text('Không'),
                ),
              ],
            );
          },
        );
        return shouldPop!;
      },
      child: Scaffold(
        appBar: AppBar(
          // leading : GestureDetector(
          //     onTap: () => Navigator.pop(context),
          //     child: Icon(
          //       Icons.arrow_back_ios,
          //       size: 22.sp,
          //     )),
          automaticallyImplyLeading: false,
          title: Text(
            'Chọn Địa Điểm',
            style: TextStyle(fontSize: 16.sp, fontWeight: FontWeight.w700),
          ),
          actions: [
            Padding(
              padding: EdgeInsets.all(0.03.sh),
              child: GestureDetector(
                  onTap: () =>
                      _mapPageReportPresenter.animateCameraToUserLocation(),
                  child: Icon(
                    FontAwesomeIcons.locationCrosshairs,
                    size: 22.sp,
                  )),
            ),
          ],
          // flexibleSpace: Container(
          //   decoration: const BoxDecoration(
          //     gradient: LinearGradient(colors: <Color>[
          //       Color(0xFF56CCF2),
          //       Color(0xFF2F80ED),
          //     ]),
          //   ),
          //   child: Icon(
          //     FontAwesomeIcons.locationCrosshairs,
          //     size: 22.sp,
          //   ),
          // ),
        ),
        body: SafeArea(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                    height: 0.72.sh,
                    color: Colors.red,
                    child: MapPart(
                        mapPageReportModel: _mapPageReportModel,
                        mapPageReportPresenter: _mapPageReportPresenter)),
                Row(
                  children: [
                    Container(
                        width: 0.8.sw,
                        padding: EdgeInsets.all(0.01.sh),
                        child: Wrap(
                          children: [
                            Text('Địa chỉ hiện tại: '),
                            Text(_mapPageReportModel.location.text)
                          ],
                        )),
                    GestureDetector(
                        onTap: () {
                          _mapPageReportPresenter.onConfirmLocation(context);
                        },
                        child: Container(
                            padding: EdgeInsets.all(0.02.sh),
                            child: Text('Chọn'))),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void refreshData(MapPageReportModel model) {
    setState(() {
      _mapPageReportModel = model;
    });
  }
}
