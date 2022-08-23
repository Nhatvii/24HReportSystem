import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/report_detail.dart';
import 'package:http/http.dart' as http;

class ReportDetailApi {
  Constants constants = Constants();

  // Get List Image
  Future<List<ReportDetail>> getListImageByReportId(String reportId) async {
    var url = Uri.parse(
        '${constants.localhost}/ReportDetail?ReportID=$reportId&Type=Image');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = reportDetailFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load List Report');
    }
  }

  // Get List Video
  Future<List<ReportDetail>> getListVideoByReportId(String reportId) async {
    var url = Uri.parse(
        '${constants.localhost}/ReportDetail?ReportID=$reportId&Type=Video');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = reportDetailFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load List Report');
    }
  }

  // Get List Record
  Future<List<ReportDetail>> getListRecordByReportId(String reportId) async {
    var url = Uri.parse(
        '${constants.localhost}/ReportDetail?ReportID=$reportId&Type=Record');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = reportDetailFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load List Report');
    }
  }
}
