import 'package:capstone_project/api/Comment/comment_api.dart';
import 'package:capstone_project/api/Emotion/emotion_api.dart';
import 'package:capstone_project/api/Post/post_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/comment.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/helper/user_preferences.dart';
import 'package:flutter/material.dart';
import 'package:flutter_share_me/flutter_share_me.dart';

enum Share { facebook, twitter }

class PostDetailPageModel {
  late Future<Post> fetchPostDetail;
  late Future<List<Post>> fetchListRelatedPost;
  late Future<List<Comment>> fetchListCommentByPostID;
  late TextEditingController comment;
  late TextEditingController editComment;
  late List<bool> listEditComment;
  late List<Comment> listComment;
  bool isLike = false;
  bool isSave = false;
  bool isSend = false;
  int likeCount = 0;
  int commentCount = 0;
  int shareCount = 0;
  int cancelIndex = 0;
  Constants constants = Constants();
  String? response;
  final FlutterShareMe flutterShareMe = FlutterShareMe();
  PostApi postApi = PostApi();
  CommentApi commentApi = CommentApi();
  EmotionApi emotionApi = EmotionApi();
  UserPreferences userPrefs = UserPreferences();

  PostDetailPageModel(String postID, int categoryID) {
    emotionApi.updateViewCount(postID);
    fetchPostDetail = postApi.getPostDetail(postID);
    fetchListRelatedPost = Future.delayed(const Duration(hours: 24), () => []);
    fetchListCommentByPostID =
        Future.delayed(const Duration(hours: 24), () => []);
    comment = TextEditingController();
    editComment = TextEditingController();
    listEditComment = [];
    listComment = [];
  }

  Future<void> init(String postID, int categoryID) async {
    await postApi.getPostDetail(postID).then((value) {
      likeCount = value.likeCount;
      commentCount = value.commentCount;
      shareCount = value.shareCount;
      return value;
    });
    await checkEmotionStatus(postID);
    fetchListRelatedPost = postApi.getListRelatedPost(categoryID);
    fetchListCommentByPostID =
        commentApi.getListComment(postID).then((value) => listComment = value);
  }

  checkEmotionStatus(String postId) async {
    List result;
    if (userPrefs.getAccountId() != null) {
      final checkEmotion = await emotionApi.checkEmotion(postId);
      Future.value(checkEmotion).then((dynamic value) => {
            if (value.isNotEmpty)
              {
                print(value),
                result = value as List,
                if (result.length == 1)
                  {
                    value[0]['emotionStatus'] == 'Like' ||
                            value[0]['emotionStatus'] == 'Unlike'
                        ? isLike =
                            value[0]['emotionStatus'] == 'Like' ? true : false
                        : isSave =
                            value[0]['emotionStatus'] == 'Save' ? true : false,
                  }
                else
                  {
                    value[0]['emotionStatus'] == 'Like' ||
                            value[0]['emotionStatus'] == 'Unlike'
                        ? {
                            isLike = value[0]['emotionStatus'] == 'Like'
                                ? true
                                : false,
                            isSave = value[1]['emotionStatus'] == 'Save'
                                ? true
                                : false,
                          }
                        : {
                            isSave = value[0]['emotionStatus'] == 'Save'
                                ? true
                                : false,
                            isLike = value[1]['emotionStatus'] == 'Like'
                                ? true
                                : false,
                          }
                  }
              }
            else
              {
                isLike = false,
                isSave = false,
              }
          });
    } else {
      isLike = false;
      isSave = false;
    }
  }

  String convertToAgo(DateTime input) {
    Duration diff = DateTime.now().difference(input);

    if (diff.inDays >= 1) {
      return '${diff.inDays} ngày trước';
    } else if (diff.inHours >= 1) {
      return '${diff.inHours} giờ trước';
    } else if (diff.inMinutes >= 1) {
      return '${diff.inMinutes} phút trước';
    } else if (diff.inSeconds >= 1) {
      return '${diff.inSeconds} giây trước';
    } else {
      return 'vừa xong';
    }
  }

  Future sharePost(String msg, String postId, Share share) async {
    var url = '${constants.shareUrl}/$postId';
    switch (share) {
      case Share.facebook:
        response = await flutterShareMe.shareToFacebook(msg: msg, url: url);
        break;
      case Share.twitter:
        response = await flutterShareMe.shareToTwitter(msg: msg, url: url);
        break;
    }
    return response;
  }
}
