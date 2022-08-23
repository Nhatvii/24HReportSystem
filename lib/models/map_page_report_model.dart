import 'package:capstone_project/api/Map/map_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mapbox_gl/mapbox_gl.dart';

class MapPageReportModel {
  MapboxMapController? mapController;
  late CameraPosition cameraPosition;
  Symbol? symbol;
  late TextEditingController location;
  MapApi mapApi = MapApi();
  Constants constants = Constants();


  MapPageReportModel() {
    cameraPosition = const CameraPosition(target: LatLng(0.0, 0.0), zoom: 16);
    location = TextEditingController();
  }

  Future<LatLng> determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }
    Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.best);
    print(position);
    LatLng currentPosition = LatLng(position.latitude, position.longitude);
    return currentPosition;
  }
}
