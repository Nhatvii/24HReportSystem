import 'package:capstone_project/main.dart';
import 'package:mapbox_gl/mapbox_gl.dart';

class UserPreferences {
  String? getName() {
    return sharedPreferences.getString('fullname');
  }

  String? getEmail() {
    return sharedPreferences.getString('email');
  }

  String? getPhone() {
    return sharedPreferences.getString('phone');
  }

  String? getAccountId() {
    return sharedPreferences.getString('accountId');
  }

  LatLng getLatLngFromSharedPrefs() {
    return LatLng(sharedPreferences.getDouble('latitude')!,
        sharedPreferences.getDouble('longitude')!);
  }

  Future<void> logOut() async {
    await sharedPreferences.remove('accountId');
    await sharedPreferences.remove('email');
    await sharedPreferences.remove('fullName');
    await sharedPreferences.remove('phone');
    await sharedPreferences.remove('latitude');
    await sharedPreferences.remove('longitude');
  }
}
