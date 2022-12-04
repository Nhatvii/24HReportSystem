// ignore_for_file: use_build_context_synchronously

import 'package:capstone_project/main.dart';
import 'package:capstone_project/pages/user_sos_request_page_map/sos_request_page.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mapbox_gl/mapbox_gl.dart';

class Splash extends StatefulWidget {
  const Splash({Key? key}) : super(key: key);

  @override
  State<Splash> createState() => _SplashState();
}

class _SplashState extends State<Splash> {
  @override
  void initState() {
    super.initState();
    initializeLocationAndSave();
  }

  void initializeLocationAndSave() async {
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

    sharedPreferences.setDouble('latitude', currentPosition.latitude);
    sharedPreferences.setDouble('longitude', currentPosition.longitude);

    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (_) => const UserSosRequestPage()));
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      child: Center(child: Image.asset('assets/images/logo_image2.png')),
    );
  }
}
