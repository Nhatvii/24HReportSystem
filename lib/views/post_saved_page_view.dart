
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_saved_page_model.dart';

abstract class PostSavedPageView {

  void refreshData(PostSavedPageModel model);

  void navigateToDetailPage(Post post);

}