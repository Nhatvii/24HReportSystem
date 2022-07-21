import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_detail_page_model.dart';
import 'package:capstone_project/views/post_detail_page_view.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PostDetailPagePresenter {
  late PostDetailPageModel _postDetailPageModel;
  late PostDetailPageView _postDetailPageView;

  PostDetailPagePresenter(String postID, int categoryID) {
    _postDetailPageModel = PostDetailPageModel(postID, categoryID);
  }

  set view(PostDetailPageView view) {
    _postDetailPageView = view;
    _postDetailPageView.refreshData(_postDetailPageModel);
  }

  Future<void> init(String postID, int categoryID) async {
    await _postDetailPageModel.init(postID, categoryID);
    _postDetailPageView.refreshData(_postDetailPageModel);
  }

  void loadCommentByPostId(String postId) {
    _postDetailPageModel.fetchListCommentByPostID =
        _postDetailPageModel.commentApi.getListComment(postId);
    _postDetailPageView.refreshData(_postDetailPageModel);
  }

  void postComment(String postId, StateSetter sheetState) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? email = prefs.getString('email');
    if (email != null) {
      _postDetailPageModel.commentApi
          .postComment(_postDetailPageModel.comment.text, postId, email)
          .then((value) => {
                if (value['statusCode'] == 200)
                  {
                    _postDetailPageModel.commentApi
                        .getCommentById(value['message'])
                        .then((value) => {
                              sheetState(() {
                                _postDetailPageModel.listComment
                                    .insert(0, value);
                              }),
                              _postDetailPageModel.commentCount++,
                              _postDetailPageModel.comment.clear(),
                              _postDetailPageModel.isSend = false,
                              _postDetailPageView
                                  .refreshData(_postDetailPageModel),
                            }),
                  }
                else
                  {
                    _postDetailPageView
                        .showCommentBadWordDialog(value['error']['message']),
                    _postDetailPageModel.comment.clear(),
                    _postDetailPageView.refreshData(_postDetailPageModel),
                  }
              });
    } else {
      _postDetailPageView.showAlertDialog();
    }
  }

  void deleteComment(String commentId, int index, StateSetter sheetState) {
    _postDetailPageModel.commentApi.deleteComment(commentId).then((value) => {
          sheetState(() {
            _postDetailPageModel.listComment.removeAt(index);
          }),
          _postDetailPageModel.commentCount--,
          _postDetailPageView.showToast(value['message']),
          _postDetailPageView.refreshData(_postDetailPageModel),
        });
  }

  void likePost(String postId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? email = prefs.getString('email');
    if (email != null) {
      _postDetailPageModel.emotionApi.updateEmotion(postId).then((value) => {
            _postDetailPageModel.isLike = !_postDetailPageModel.isLike,
            if (_postDetailPageModel.isLike == true)
              {_postDetailPageModel.likeCount++}
            else
              {_postDetailPageModel.likeCount--},
            _postDetailPageView.refreshData(_postDetailPageModel),
          });
    } else {
      _postDetailPageView.showAlertDialog();
    }
  }

  void onSharePostClicked(String msg, String postId, Share share) {
    _postDetailPageModel.sharePost(msg, postId, share).then((value) => {
          _postDetailPageModel.emotionApi.updateShareCount(postId),
          _postDetailPageModel.shareCount++,
          _postDetailPageView.refreshData(_postDetailPageModel)
        });
  }

  void savePost(String postId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? email = prefs.getString('email');
    if (email != null) {
      _postDetailPageModel.postApi.updatePostSaved(postId).then((value) => {
            _postDetailPageModel.isSave = !_postDetailPageModel.isSave,
            _postDetailPageView.refreshData(_postDetailPageModel),
          });
    } else {
      _postDetailPageView.showAlertDialog();
    }
  }

  void onNavigateDetailPage(Post post) {
    _postDetailPageView.navigateToDetailPage(post);
  }

  void checkStatusLikeSave(String postId) {
    _postDetailPageModel.emotionApi.checkEmotion(postId);
    _postDetailPageView.refreshData(_postDetailPageModel);
  }

  void checkIsSend(int check, StateSetter sheetState) {
    if (check == 1) {
      sheetState(() {
        _postDetailPageModel.isSend = true;
      });
    } else {
      sheetState(() {
        _postDetailPageModel.isSend = false;
      });
    }
  }
}
