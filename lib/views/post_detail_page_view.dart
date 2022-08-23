import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_detail_page_model.dart';
import 'package:flutter/material.dart';

abstract class PostDetailPageView {
  void refreshData(PostDetailPageModel model);

  void navigateToDetailPage(Post post);

  void showLoginDialog();

  void showDeleteCommentDialog(
      String commentId, int index, StateSetter sheetState);

  void showCommentBadWordDialog(String title);

  void showToast(String msg);
}
