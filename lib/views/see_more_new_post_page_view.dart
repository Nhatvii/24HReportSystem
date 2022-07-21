
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/see_more_new_post_page_model.dart';

abstract class SeeMoreNewPostPageView {

  void refreshData(SeeMoreNewPostPageModel model);

  void onNavigateDetailPage(Post post);
}