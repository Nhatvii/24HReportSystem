
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/search_post_page_model.dart';

abstract class SearchPostPageView {

  void refreshData(SearchPostPageModel model);

  void navigateToDetailPage(Post post);
}