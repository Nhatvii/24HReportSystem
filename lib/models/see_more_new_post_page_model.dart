import 'package:capstone_project/api/Post/post_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/category.dart';
import 'package:capstone_project/entities/post.dart';

class SeeMoreNewPostPageModel {
  late Future<List<Post>> fetchNewPost;
  late List<Category> listCategory;
  late List<bool> listSelectedTag;
  int checkIndex = 0;
  Constants constants = Constants();
  PostApi postApi = PostApi();

  SeeMoreNewPostPageModel(
      int categoryId, List<Category> list, int newCheckIndex) {
    fetchNewPost = postApi.getListNewPost(categoryId);
    listCategory = list;
    listSelectedTag = [];
    checkIndex = newCheckIndex;
  }
}
