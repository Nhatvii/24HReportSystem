import 'dart:convert';

import 'package:capstone_project/constants/constants.dart';
import 'package:mapbox_gl/mapbox_gl.dart';
import 'package:http/http.dart' as http;

class MapApi {
  Constants constants = Constants();

  // Get Place By LatLng
  Future getPlaceByLatLng(LatLng latLng) async {
    var url = Uri.parse(
        "${constants.goongDomain}/Geocode?latlng=${latLng.latitude}, ${latLng.longitude}&api_key=${constants.apiKey}");
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      // print(jsonData['results'][1]['formatted_address']);
      return jsonData['results'][1]['formatted_address'];
    }
  }

  // Search Auto Complete
  Future<List<Map>> getListPlaceByKeyWord(String keyWord) async {
    // print('Keyword: $keyWord');
    if (keyWord.isNotEmpty || keyWord != '') {
      var url = Uri.parse(
          "${constants.goongDomain}/Place/AutoComplete?api_key=${constants.apiKey}&input=$keyWord");
      var response = await http.get(url);

      if (response.statusCode == 200) {
        List<Map> listPlace = [];
        var jsonData = jsonDecode(response.body);
        if (jsonData['predictions'] != null) {
          for (var i in jsonData['predictions']) {
            Map<String, String> map = {
              'title': i['structured_formatting']['main_text'],
              'address': i['structured_formatting']['secondary_text'],
              'description': i['description'],
            };
            listPlace.add(map);
          }
          return listPlace;
        } else {
          return listPlace;
        }
      }
    }
    throw ('Không tìm thấy kết quả');
  }
}
