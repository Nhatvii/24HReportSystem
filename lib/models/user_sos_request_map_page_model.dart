import 'dart:async';
import 'dart:convert';

import 'package:capstone_project/api/Account/account_api.dart';
import 'package:capstone_project/api/Map/map_api.dart';
import 'package:capstone_project/api/Notify/notify_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/helper/user_preferences.dart';
import 'package:flutter/cupertino.dart';
import 'package:mapbox_gl/mapbox_gl.dart';
import 'package:signalr_core/signalr_core.dart';

class UserSosRequestPageMapModel {
  bool sendRequest = false;
  late TextEditingController typeSos;
  MapboxMapController? mapController;
  late CameraPosition initialCameraPosition;
  late LatLng userlatLng;
  late LatLng officerlatLng;
  UserPreferences userPrefs = UserPreferences();
  Symbol? currentPlaceSymbol;
  Circle? currentPlaceCircle;
  Symbol? officerSymbol;
  late String notifyID;
  late String userAddress;
  late String officerName;
  late String officerPhone;
  late String officeAddress;
  late String officeName;
  late String statusRequest;
  late num distance;
  late num minute;
  late bool isReceivedNoti;
  bool isSearchingOfficer = false;
  int selectedIndex = 0;
  Constants constants = Constants();
  MapApi mapApi = MapApi();
  HubConnection? hubConnection;
  AccountApi accountApi = AccountApi();
  NotifyApi notifyApi = NotifyApi();
  List<Text> listType = const [
    Text('Khác'),
    Text('Trộm Cắp'),
    Text('An Ninh'),
    Text('Tai Nạn'),
  ];

  UserSosRequestPageMapModel() {
    userlatLng = userPrefs.getLatLngFromSharedPrefs();
    initialCameraPosition = CameraPosition(target: userlatLng, zoom: 18);
    typeSos = TextEditingController(text: 'Chọn lý do');
    officerlatLng = const LatLng(0, 0);
    notifyID = '';
    userAddress = '';
    officerName = '';
    officerPhone = '';
    officeAddress = '';
    officeName = '';
    statusRequest = '';
    distance = 0;
    minute = 0;
    isReceivedNoti = false;
  }

  Future<void> init() async {
    await mapApi
        .getPlaceByLatLng(userlatLng)
        .then((value) => userAddress = value);
  }
}
