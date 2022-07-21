import 'package:capstone_project/api/Post/post_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:flutter/material.dart';

class SearchPostPageModel {
  late TextEditingController search;
  late Future<List<Post>> fetchListPostBySearchText;
  Constants constants = Constants();
  PostApi postApi = PostApi();

  SearchPostPageModel(String searchText) {
    fetchListPostBySearchText = postApi.getListPostBySearchText(searchText);
    search = TextEditingController(text: searchText);
  }
}
