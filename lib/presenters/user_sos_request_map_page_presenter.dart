import 'dart:async';
import 'dart:math';

import 'package:capstone_project/models/user_sos_request_map_page_model.dart';
import 'package:capstone_project/views/user_sos_request_map_page_view.dart';
import 'package:flutter/cupertino.dart';
import 'package:mapbox_gl/mapbox_gl.dart';
import 'package:signalr_core/signalr_core.dart';

class UserSosRequestPageMapPresenter {
  late UserSosRequestPageMapModel _userSosRequestPageModel;
  late UserSosRequestPageMapView _userSosRequestPageView;

  UserSosRequestPageMapPresenter() {
    _userSosRequestPageModel = UserSosRequestPageMapModel();
  }

  set view(UserSosRequestPageMapView view) {
    _userSosRequestPageView = view;
    _userSosRequestPageView.refreshData(_userSosRequestPageModel);
  }

  Future<void> init() async {
    await _userSosRequestPageModel.init();
    _userSosRequestPageView.refreshData(_userSosRequestPageModel);
  }

  void initSignalR() async {
    _userSosRequestPageModel.hubConnection = HubConnectionBuilder()
        .withUrl(_userSosRequestPageModel.constants.signalRUrl)
        .withAutomaticReconnect()
        .build();
    _userSosRequestPageModel.hubConnection!
        .onclose((error) => print('Connection suddenly close'));
    await _userSosRequestPageModel.hubConnection!.start();
    await _userSosRequestPageModel.accountApi.updateStatusAndToken(
        _userSosRequestPageModel.userPrefs.getAccountId()!,
        _userSosRequestPageModel.hubConnection!.connectionId!);
    print(
        'ConnectionID: ${_userSosRequestPageModel.hubConnection!.connectionId}');
    _userSosRequestPageModel.hubConnection!
        .on('SendPrivateMessageToUser', handleClientFunction);
    _userSosRequestPageModel.hubConnection!
        .on('SendLatLngToUser', handleOfficerLocationFunction);
  }

  void handleClientFunction(List<Object?>? parameters) async {
    print(parameters);
    _userSosRequestPageView.navigateToHomePage();
  }

  void handleOfficerLocationFunction(List<Object?>? parameters) async {
    print(parameters);
    var result = parameters as List;
    _userSosRequestPageModel.officerlatLng = LatLng(
        double.parse(result[1].toString()), double.parse(result[2].toString()));
    print(_userSosRequestPageModel.officerlatLng.latitude);
    print(_userSosRequestPageModel.officerlatLng.longitude);
    changeOfficerSymbol(_userSosRequestPageModel.officerlatLng,
        'assets/images/bike_marker.png', 0.3);
  }

  animateUserLocation() {
    _userSosRequestPageModel.mapController!.animateCamera(
        CameraUpdate.newCameraPosition(CameraPosition(
            target: _userSosRequestPageModel.userlatLng, zoom: 18)));
  }

  onMapCreated(MapboxMapController controller) {
    print('MapCreated');
    _userSosRequestPageModel.mapController = controller;
  }

  onMapClick(Point point, LatLng latLng) {
    print('$point +++++ $latLng');
    // addSymbol(latLng, 'assets/images/marker.png', 2);
    // changeOfficerSymbol(latLng, 'assets/images/officer.png', 0.3);
  }

  void addSymbol(LatLng latlng, String image, double size) async {
    if (_userSosRequestPageModel.currentPlaceSymbol == null) {
      _userSosRequestPageModel.currentPlaceSymbol =
          await _userSosRequestPageModel.mapController!.addSymbol(
        SymbolOptions(
          geometry: latlng,
          iconImage: image,
          iconSize: size,
        ),
      );
    } else {
      print(_userSosRequestPageModel.mapController!.symbols);
      // _userSosRequestPageModel.mapController!.clearSymbols();
      // await _userSosRequestPageModel.mapController!
      //     .removeSymbol(_userSosRequestPageModel.currentPlaceSymbol!)
      //     .then((value) async {
      //   _userSosRequestPageModel.currentPlaceSymbol =
      //       await _userSosRequestPageModel.mapController!.addSymbol(
      //     SymbolOptions(
      //       geometry: latlng,
      //       iconImage: image,
      //       iconSize: size,
      //       iconColor: '#A0D2FF',
      //     ),
      //   );
      // });
    }
  }

  changeOfficerSymbol(LatLng latlng, String image, double size) async {
    await _userSosRequestPageModel.mapController!.updateSymbol(
        _userSosRequestPageModel.officerSymbol!,
        SymbolOptions(
          geometry: latlng,
        ));
  }

  onStyleLoadedCallback() async {
    _userSosRequestPageModel.currentPlaceSymbol =
        await _userSosRequestPageModel.mapController!.addSymbol(
      SymbolOptions(
        geometry: _userSosRequestPageModel.userlatLng,
        iconImage: "assets/images/marker.png",
        iconSize: 2,
      ),
    );
    _userSosRequestPageModel.officerSymbol = await _userSosRequestPageModel
        .mapController!
        .addSymbol(const SymbolOptions(
      geometry: LatLng(0, 0),
      iconImage: "assets/images/bike_marker.png",
      iconSize: 0.3,
    ));
  }

  void sendRequest() {
    print('object');
    _userSosRequestPageModel.isSearchingOfficer = true;
    _userSosRequestPageView.refreshData(_userSosRequestPageModel);
    _userSosRequestPageModel.notifyApi
        .sendSOSRequest(
            _userSosRequestPageModel.userPrefs.getAccountId()!,
            _userSosRequestPageModel.userlatLng,
            _userSosRequestPageModel.typeSos.text)
        .then((value) => {
              if (value['error'] == null)
                {
                  print(value),
                  _userSosRequestPageModel.notifyID = value['notifyId'],
                  _userSosRequestPageModel.officeAddress = value['district'],
                  _userSosRequestPageModel.officerName = value['officerName'],
                  _userSosRequestPageModel.officeName = value['officeName'],
                  _userSosRequestPageModel.officerPhone =
                      value['officerPhoneNumber'],
                  _userSosRequestPageModel.distance = value['distance'] / 1000,
                  _userSosRequestPageModel.minute = value['duration'] / 60,
                  _userSosRequestPageModel.statusRequest = 'Đang Xử Lý',
                  _userSosRequestPageModel.isSearchingOfficer = false,
                  _userSosRequestPageModel.isReceivedNoti = true,
                  _userSosRequestPageView.refreshData(_userSosRequestPageModel),
                }
              else
                {
                  print(value['error']['message']),
                }
            });
  }

  void cancelRequest(BuildContext context) async {
    await _userSosRequestPageModel.notifyApi
        .cancelSosRequest(
            _userSosRequestPageModel.notifyID, 'Không còn nhu cầu hỗ trợ')
        .then((value) => {
              print(value),
              Navigator.pop(context),
              _userSosRequestPageModel.statusRequest = 'Chờ Xác Nhận',
              _userSosRequestPageView.refreshData(_userSosRequestPageModel),
            });
  }

  changeType(int index) {
    _userSosRequestPageModel.selectedIndex = index;
    _userSosRequestPageModel.typeSos.text =
        _userSosRequestPageModel.listType[index].data!;
    _userSosRequestPageView.refreshData(_userSosRequestPageModel);
  }
}
