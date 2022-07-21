
import 'package:capstone_project/api/Category/category_api.dart';
import 'package:capstone_project/api/Post/post_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/category.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePageModel {
  late TextEditingController search;
  late Future<List<Post>> fetchNewPost;
  late Future<List<Post>> fetchPopularPost;
  late Future<List<Category>> fetchListCategory;
  late List<bool> listSelectedTag;
  List<Category> listCate = [];
  late int checkIndex;
  int categoryIDDefault = 0;
  String? email;
  String? name;
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey();
  Constants constants = Constants();
  PostApi postApi = PostApi();
  CategoryApi categoryApi = CategoryApi();

  HomePageModel() {
    search = TextEditingController();
    fetchListCategory = Future.delayed(const Duration(hours: 24), () => []);
    fetchNewPost = Future.delayed(const Duration(hours: 24), () => []);
    fetchPopularPost = Future.delayed(const Duration(hours: 24), () => []);
    listSelectedTag = [];
    checkIndex = 0;
    getInstance();
  }

  Future<void> init() async {
    final listCategory = await categoryApi.getListCategory();
    listCate = listCategory;
    fetchListCategory = Future.value(listCategory);
    fetchNewPost = postApi.getListNewPost(listCategory[0].rootCategoryId);
    fetchPopularPost =
        postApi.getListPopularPost(listCategory[0].rootCategoryId);
  }

  Future<SharedPreferences> getInstance() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    email = prefs.getString('email');
    name = prefs.getString('username');
    return prefs;
  }

  getPostById(int categoryId) {
    fetchNewPost = postApi.getListNewPost(categoryId);
    fetchPopularPost = postApi.getListPopularPost(categoryId);
    categoryIDDefault = categoryId;
  }

  String convertToAgo(DateTime input) {
    Duration diff = DateTime.now().difference(input);

    if (diff.inDays >= 1) {
      return '${diff.inDays} ngày trước';
    } else if (diff.inHours >= 1) {
      return '${diff.inHours} giờ trước';
    } else if (diff.inMinutes >= 1) {
      return '${diff.inMinutes} phút trước';
    } else if (diff.inSeconds >= 1) {
      return '${diff.inSeconds} giây trước';
    } else {
      return 'vừa xong';
    }
  }
}
