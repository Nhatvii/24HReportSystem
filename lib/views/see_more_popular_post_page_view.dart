import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/see_more_popular_post_page_model.dart';

abstract class SeeMorePopularPostPageView {
  void refreshData(SeeMorePopularPostPageModel model);

  void onNavigateDetailPage(Post post);
}
