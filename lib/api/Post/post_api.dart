import 'dart:convert';

import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class PostApi {
  Constants constants = Constants();

  // Get List New Post API
  Future<List<Post>> getListNewPost(int categoryId) async {
    var url = Uri.parse(
        '${constants.localhost}/Post?Status=${constants.statusPublic}&RootCategoryID=$categoryId&isRecentDate=true');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = postFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load New Post');
    }
  }

  // Get List Popular Post API
  Future<List<Post>> getListPopularPost(int categoryId) async {
    var url = Uri.parse(
        '${constants.localhost}/Post?Status=${constants.statusPublic}&RootCategoryID=$categoryId&isViewCount=true');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = postFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load Popular Post');
    }
  }

  // Get Post Detail API
  Future<Post> getPostDetail(String postID) async {
    var url = Uri.parse('${constants.localhost}/Post/$postID');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);

      Post post;
      post = Post.fromJson(jsonData);
      return post;
    } else {
      throw Exception('Unable to load Post Detail');
    }
  }

  // Get List Related Post API
  Future<List<Post>> getListRelatedPost(int categoryID) async {
    var url = Uri.parse(
        '${constants.localhost}/Post?Status=${constants.statusPublic}&CategoryID=$categoryID');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = postFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load Related Post');
    }
  }

  // Get List Saved Post API
  Future<List<Post>> getListPostSaved() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var email = prefs.getString('email');
    var url =
        Uri.parse('${constants.localhost}/Post/GetListPostSave?userID=$email');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = postFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to load List Post Saved');
    }
  }

  // Get List Post By Search Text
  Future<List<Post>> getListPostBySearchText(String searchText) async {
    var url = Uri.parse(
        '${constants.localhost}/Post?SearchContent=$searchText&Status=${constants.statusPublic}');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = postFromJson(response.body);
      return jsonData;
    } else {
      throw Exception('Unable To Load Post With Search Text');
    }
  }

  // Post Saved API
  Future updatePostSaved(String postId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var email = prefs.getString('email');
    var url = Uri.parse('${constants.localhost}/Post/UpdatePostSave');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "postId": postId,
        "userId": email,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    }
  }
}
