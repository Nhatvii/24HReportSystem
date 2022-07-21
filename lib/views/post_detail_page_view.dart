import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_detail_page_model.dart';

abstract class PostDetailPageView {
  void refreshData(PostDetailPageModel model);

  void navigateToDetailPage(Post post);

  void showAlertDialog();

  void showCommentBadWordDialog(String title);

  void showToast(String msg);

}
