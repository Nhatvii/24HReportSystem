import 'dart:math';

import 'package:capstone_project/models/map_page_report_model.dart';
import 'package:capstone_project/views/map_page_report_view.dart';
import 'package:flutter/material.dart';
import 'package:mapbox_gl/mapbox_gl.dart';

class MapPageReportPresenter {
  late MapPageReportModel _mapPageReportModel;
  late MapPageReportView _mapPageReportView;

  MapPageReportPresenter() {
    _mapPageReportModel = MapPageReportModel();
  }

  set view(MapPageReportView view) {
    _mapPageReportView = view;
    _mapPageReportView.refreshData(_mapPageReportModel);
  }

  Future<void> init()  async {
    _mapPageReportModel.determinePosition().then((value) {
      _mapPageReportModel.cameraPosition =
          CameraPosition(target: value, zoom: 16);
      _mapPageReportView.refreshData(_mapPageReportModel);
    });
    // var latlnt = _mapPageReportModel.determinePosition();
    // Future.value(latlnt).then((value) => _mapPageReportModel.cameraPosition =
    //     CameraPosition(target: value, zoom: 16));
  }

  // void dispose() {}

  onMapCreated(MapboxMapController controller) {
    _mapPageReportModel.mapController = controller;
    // _mapPageReportView.refreshData(_mapPageReportModel);
  }

  onStyleLoadedCallback() {}

  void addSymbol(
      MapboxMapController mapBoxController, double lat, double lng) async {
    if (_mapPageReportModel.symbol == null) {
      _mapPageReportModel.symbol = await mapBoxController.addSymbol(
        SymbolOptions(
          geometry: LatLng(lat, lng),
          iconImage: "assets/images/marker1.png",
          iconSize: 0.25,
        ),
      );
    } else {
      await mapBoxController
          .removeSymbol(_mapPageReportModel.symbol!)
          .then((value) async {
        _mapPageReportModel.symbol = await mapBoxController.addSymbol(
          SymbolOptions(
            geometry: LatLng(lat, lng),
            iconImage: "assets/images/marker1.png",
            iconSize: 0.25,
          ),
        );
      });
    }
  }

  animateCameraToUserLocation() {
    _mapPageReportModel.mapController!.animateCamera(
        CameraUpdate.newCameraPosition(_mapPageReportModel.cameraPosition));
    if (_mapPageReportModel.symbol != null) {
      _mapPageReportModel.mapController!
          .removeSymbol(_mapPageReportModel.symbol!);
    }
    _mapPageReportModel.mapApi
        .getPlaceByLatLng(_mapPageReportModel.cameraPosition.target)
        .then((value) {
      chooseLocation(value);
    });
  }

  onMapClick(Point point, LatLng latLng) async {
    print('$point +++++ $latLng');
    addSymbol(
        _mapPageReportModel.mapController!, latLng.latitude, latLng.longitude);
    _mapPageReportModel.mapApi.getPlaceByLatLng(latLng).then((value) {
      chooseLocation(value);
    });
  }

  chooseLocation(String location) {
    _mapPageReportModel.location.text = location;
    _mapPageReportView.refreshData(_mapPageReportModel);
  }

  onConfirmLocation(BuildContext context) {
    // _mapPageReportModel.mapController!.dispose();
    Navigator.pop(context, _mapPageReportModel.location.text);
  }
}
