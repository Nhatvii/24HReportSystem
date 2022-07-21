import 'dart:convert';

import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/comment.dart';
import 'package:http/http.dart' as http;

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
  Future postComment(String commentContent, String postId, String email) async {
    var url = Uri.parse('${constants.localhost}/Comment');
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "userId": email,
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
