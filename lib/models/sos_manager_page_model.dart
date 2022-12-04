import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/notify.dart';
import 'package:http/http.dart' as http;

class SosManagerPageModel {
  late Future<List<Notify>> fetchListNotify;
  Constants constants = Constants();

  SosManagerPageModel(String officeId) {
    fetchListNotify = getListNotify(officeId);
  }

  Future<List<Notify>> getListNotify(String officeId) async {
    var url = Uri.parse("${constants.localhost}/Notify?OfficeId=$officeId");
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = notifyFromJson(response.body);
      print(jsonData);
      return jsonData;
    } else {
      throw Exception('Unable to load List Notify');
    }
  }
}
