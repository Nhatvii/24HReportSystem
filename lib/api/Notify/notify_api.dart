import 'dart:convert';

import 'package:capstone_project/constants/constants.dart';
import 'package:http/http.dart' as http;
import 'package:mapbox_gl/mapbox_gl.dart';

class NotifyApi {
  Constants constants = Constants();

  // Send SOS Request
  Future sendSOSRequest(String accountId, LatLng latLng, String type) async {
    var url = Uri.parse('${constants.localhost}/Office/GetDirectionSOS');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "accountID": accountId,
        "latitude": latLng.latitude,
        "longitude": latLng.longitude,
        "type": type
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to Send Request');
    }
  }

  // Cancel SOS Request
  Future cancelSosRequest(String notifyId, String cancelType) async {
    var url = Uri.parse('${constants.localhost}/Notify/CancelNotify');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "notifyId": notifyId,
        "cancelType": cancelType,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to Update account Authen');
    }
  }
}
