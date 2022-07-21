import 'package:capstone_project/api/Comment/comment_api.dart';
import 'package:capstone_project/api/Emotion/emotion_api.dart';
import 'package:capstone_project/api/Post/post_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/comment.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:flutter/material.dart';
import 'package:flutter_share_me/flutter_share_me.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum Share { facebook, twitter }

class PostDetailPageModel {
  late Future<Post> fetchPostDetail;
  late Future<List<Post>> fetchListRelatedPost;
  late Future<List<Comment>> fetchListCommentByPostID;
  late TextEditingController comment;
  bool isLike = false;
  bool isSave = false;
  bool isSend = false;
  int likeCount = 0;
  int commentCount = 0;
  int shareCount = 0;
  late List<Comment> listComment;
  Constants constants = Constants();
  String? response;
  String? email;
  String? name;
  final FlutterShareMe flutterShareMe = FlutterShareMe();
  PostApi postApi = PostApi();
  CommentApi commentApi = CommentApi();
  EmotionApi emotionApi = EmotionApi();

  PostDetailPageModel(String postID, int categoryID) {
    emotionApi.updateViewCount(postID);
    fetchPostDetail = postApi.getPostDetail(postID);
    // .then((value) => checkEmotionStatus(postID));
    fetchListRelatedPost = Future.delayed(const Duration(hours: 24), () => []);
    fetchListCommentByPostID =
        Future.delayed(const Duration(hours: 24), () => []);
    comment = TextEditingController();
    listComment = [];
    getInstance();
  }

  Future<void> init(String postID, int categoryID) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    email = prefs.getString('email');
    // fetchPostDetail = postApi.getPostDetail(postID).then((value) {
    //   likeCount = value.likeCount;
    //   commentCount = value.commentCount;
    //   shareCount = value.shareCount;
    //   return value;
    // });
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

  Future<SharedPreferences> getInstance() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    email = prefs.getString('email');
    name = prefs.getString('username');
    return prefs;
  }

  checkEmotionStatus(String postId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    email = prefs.getString('email');
    if (email != null) {
      final checkEmotion = await emotionApi.checkEmotion(postId);
      Future.value(checkEmotion).then((dynamic value) => {
            for (var i in value)
              {
                isLike = i['emotionStatus'] ?? false,
                isSave = i['isSave'] ?? false,
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
