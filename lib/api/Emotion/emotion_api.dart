import 'dart:convert';

import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/helper/user_preferences.dart';
import 'package:http/http.dart' as http;

class EmotionApi {
  Constants constants = Constants();
  UserPreferences userPrefs = UserPreferences();

  // Check Emotion API
  Future checkEmotion(String postId) async {
    var accountId = userPrefs.getAccountId();
    var url = Uri.parse(
        '${constants.localhost}/Emotion?PostId=$postId&UserId=$accountId');
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to Check Emotion');
    }
  }

  // Update Emotion API
  Future updateEmotion(String postId) async {
    var accountId = userPrefs.getAccountId();
    var url = Uri.parse('${constants.localhost}/Emotion/EditEmotion');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "postId": postId,
        "userId": accountId,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    }
  }

  // Update Share Count API
  Future updateShareCount(String postId) async {
    var url = Uri.parse(
        '${constants.localhost}/Post/UpdateShareCount?postID=$postId');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "postId": postId,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    }
  }

  // Update View Count API
  Future updateViewCount(String postId) async {
    var accountId = userPrefs.getAccountId();
    var url = Uri.parse('${constants.localhost}/Post/UpdateViewCount');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "postId": postId,
        "userId": accountId,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    }
  }

  // Post Saved API
  Future updatePostSaved(String postId) async {
    var accountId = userPrefs.getAccountId();
    var url = Uri.parse('${constants.localhost}/Emotion/CreatePostSave');
    var response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "postId": postId,
        "userId": accountId,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    }
  }
}
