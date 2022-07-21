import 'package:capstone_project/api/Post/post_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/category.dart';
import 'package:capstone_project/entities/post.dart';

class SeeMorePopularPostPageModel {
  late Future<List<Post>> fetchPopularPost;
  late List<Category> listCategory;
  late List<bool> listSelectedTag;
  int checkIndex = 0;
  Constants constants = Constants();
  PostApi postApi = PostApi();

  SeeMorePopularPostPageModel(
      int categoryId, List<Category> list, int newCheckIndex) {
    fetchPopularPost = postApi.getListPopularPost(categoryId);
    listCategory = list;
    listSelectedTag = [];
    checkIndex = newCheckIndex;
  }
}
