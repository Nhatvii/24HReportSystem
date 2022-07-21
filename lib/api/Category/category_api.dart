import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/category.dart';
import 'package:http/http.dart' as http;

class CategoryApi {
  Constants constants = Constants();

  // Get List Category API
  Future<List<Category>> getListCategory() async {
    var url = Uri.parse("${constants.localhost}/RootCategory");
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = categoryFromJson(response.body);

      return jsonData;
    } else {
      throw Exception('Unable to load Category');
    }
  }
}
