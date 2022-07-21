import 'dart:convert';

import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/report.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ReportApi {
  Constants constants = Constants();

  // Get Report Detail API
  Future<Report> getReportDetail(String reportId) async {
    var url = Uri.parse('${constants.localhost}/Report/$reportId');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = jsonDecode((response.body));
      Report report;
      report = Report.fromJson(jsonData);
      return report;
    } else {
      throw Exception('Unable to load Report Detail');
    }
  }

  // Get List Report By UserID API
  Future<List<Report>> getListReportByUserId() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var email = prefs.getString('email');
    var url = Uri.parse(
        '${constants.localhost}/Report/GetListWithUserID?UserID=$email');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = reportFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load List Report');
    }
  }
}
