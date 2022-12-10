// ignore_for_file: use_build_context_synchronously

import 'package:capstone_project/main.dart';
import 'package:capstone_project/pages/user_sos_request_page_map/sos_request_page.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mapbox_gl/mapbox_gl.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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
    await prominentDisclosure();
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      // await prominentDisclosure();
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
    LatLng currentPosition = LatLng(position.latitude, position.longitude);

    sharedPreferences.setDouble('latitude', currentPosition.latitude);
    sharedPreferences.setDouble('longitude', currentPosition.longitude);

    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (_) => const UserSosRequestPage()));
  }

  prominentDisclosure() async {
    await showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text(
              'Thông Báo',
              style: TextStyle(fontSize: 14.sp),
            ),
            content: Text(
                "24H Report System thu thập dữ liệu vị trí để bật 'SOS Helper' ngay cả khi đóng ứng dụng hoặc không sử dụng.",
                style: TextStyle(fontSize: 13.sp)),
            actions: [
              TextButton(
                child: Text("Ok", style: TextStyle(fontSize: 12.sp)),
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
            ],
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      child: Center(child: Image.asset('assets/images/logo_image2.png')),
    );
  }
}
