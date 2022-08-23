import 'dart:convert';

import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/report.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ReportApi {
  Constants constants = Constants();

  // Post Report API
  Future sendFormReport(
      String locationRep,
      String dateRep,
      String timeRep,
      String desRep,
      List<String> image,
      List<String> video,
      List<String> record,
      bool isAnonymouss) async {
    var format1 = DateFormat('dd-MM-yyyy').parse(dateRep);
    var format2 = DateFormat('yyyy-MM-dd').format(format1);
    String format3 = '$format2 $timeRep:00';
    DateTime convertDate = DateFormat("yyyy-MM-dd hh:mm:ss").parse(format3);

    SharedPreferences prefs = await SharedPreferences.getInstance();
    var accountId = prefs.getString('accountId');
    var url = Uri.parse('${constants.localhost}/Report');
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "userID": isAnonymouss ? null : accountId,
        "location": locationRep,
        "timeFraud": convertDate.toIso8601String(),
        "description": desRep,
        "video": video.isEmpty ? null : video,
        "image": image.isEmpty ? null : image,
        "record": record.isEmpty ? null : record,
        "isAnonymous": isAnonymouss,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    }
  }

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
    // SharedPreferences prefs = await SharedPreferences.getInstance();
    // var email = prefs.getString('email');
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var accountId = prefs.getString('accountId');
    var url = Uri.parse(
        '${constants.localhost}/Report/GetListWithUserID?UserID=$accountId');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = reportFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load List Report');
    }
  }
}
