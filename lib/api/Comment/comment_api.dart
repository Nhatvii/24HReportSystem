import 'dart:convert';

import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/comment.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class CommentApi {
  Constants constants = Constants();

  // Get List Comment API
  Future<List<Comment>> getListComment(String postID) async {
    var url = Uri.parse('${constants.localhost}/Comment?PostId=$postID');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = commentFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load Comment');
    }
  }

  // Post Comment API
  Future postComment(String commentContent, String postId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var accountId = prefs.getString('accountId');
    var url = Uri.parse('${constants.localhost}/Comment');
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "userId": accountId,
        "postId": postId,
        "commentTitle": commentContent,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
      // if (jsonData['statusCode'] == 200) {
      //   var comment = getCommentById(jsonData['message']);
      //   return comment;
      // } else {
      //   // throw Exception('Unable Post Commet');
      //   return jsonData['message'];
      // }
    } else {
      throw Exception('Unable Post Comment');
    }
  }

  // Get Comment By ID API
  Future<Comment> getCommentById(String commentId) async {
    var url = Uri.parse('${constants.localhost}/Comment/$commentId');
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var jsonData = Comment.fromJson(jsonDecode(response.body));
      return jsonData;
    } else {
      throw Exception('Unable to Get Comment');
    }
  }

  // Update Comment
  Future updateComment(String commentId, String newComment) async {
    var url = Uri.parse('${constants.localhost}/Comment');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "commentId": commentId,
        "commentTitle": newComment,
        "status": 0,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to Update Comment');
    }
  }

  // Delete Comment
  Future deleteComment(String commentId) async {
    var url = Uri.parse('${constants.localhost}/Comment/$commentId');
    var response = await http.delete(url);
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to Get Comment');
    }
  }
}
