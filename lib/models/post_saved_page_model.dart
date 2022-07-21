import 'package:capstone_project/api/Post/post_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/post.dart';

class PostSavedPageModel {
  bool isSave = false;
  late Future<List<Post>> fetchListPostSaved;
  Constants constants = Constants();
  PostApi postApi = PostApi();

  PostSavedPageModel() {
    fetchListPostSaved = postApi.getListPostSaved();
  }
}
