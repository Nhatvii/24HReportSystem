import 'package:capstone_project/models/map_page_report_model.dart';
import 'package:capstone_project/presenters/map_page_report_presenter.dart';
import 'package:flutter/material.dart';
import 'package:mapbox_gl/mapbox_gl.dart';

class MapPart extends StatelessWidget {
  final MapPageReportModel mapPageReportModel;
  final MapPageReportPresenter mapPageReportPresenter;
  const MapPart(
      {Key? key,
      required this.mapPageReportModel,
      required this.mapPageReportPresenter})
      : super(key: key);


  @override
  Widget build(BuildContext context) {
    return MapboxMap(
      styleString:
          'https://api.mapbox.com/styles/v1/quanghuy117/cl61w4oqt000715n3txlqlm8o?access_token=pk.eyJ1IjoicXVhbmdodXkxMTciLCJhIjoiY2w2MHZndGNkMXJnaDNqbW9iOXU4ZzVrZCJ9.dLvdaF56MkaEUZlv0wB_xw',
      // styleString: MapboxStyles.MAPBOX_STREETS,
      // 'https://tiles.goong.io/assets/goong_map_web.json?api_key=XLqQzFQgRrm4HzcMRSQE7c6BzQbjFXLBo5stg87v',
      accessToken: mapPageReportModel.constants.ACCESS_TOKEN,
      onMapCreated: mapPageReportPresenter.onMapCreated,
      initialCameraPosition: mapPageReportModel.cameraPosition,
      onStyleLoadedCallback: mapPageReportPresenter.onStyleLoadedCallback,
      myLocationEnabled: true,
      myLocationTrackingMode: MyLocationTrackingMode.TrackingGPS,
      onMapClick: mapPageReportPresenter.onMapClick,
    );
  }
}
