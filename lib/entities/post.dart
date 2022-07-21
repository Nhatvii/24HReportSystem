import 'dart:convert';

import 'package:capstone_project/entities/account.dart';
import 'package:capstone_project/entities/sub_category.dart';

List<Post> postFromJson(String str) =>
    List<Post>.from(json.decode(str).map((x) => Post.fromJson(x)));

String postToJson(List<Post> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Post {
  Post({
    required this.postId,
    required this.title,
    required this.subTitle,
    required this.createTime,
    required this.publicTime,
    required this.description,
    required this.video,
    required this.image,
    required this.viewCount,
    required this.likeCount,
    required this.commentCount,
    required this.shareCount,
    // required this.editorId,
    required this.status,
    required this.category,
    required this.account,
  });

  String postId;
  String title;
  String subTitle;
  DateTime createTime;
  DateTime publicTime;
  String description;
  String video;
  String image;
  int viewCount;
  int likeCount;
  int commentCount;
  int shareCount;
  // String editorId;
  String status;
  SubCategory category;
  Account account;

  factory Post.fromJson(Map<String, dynamic> json) => Post(
        postId: json["postId"],
        title: json["title"],
        subTitle: json["subTitle"],
        createTime: DateTime.parse(json["createTime"]),
        publicTime: json["publicTime"] == null
            ? DateTime.now()
            : DateTime.parse(json["publicTime"]),
        description: json["description"],
        video: json["video"],
        image: json["image"],
        viewCount: json["viewCount"] ?? 0,
        likeCount: json["likeCount"] ?? 0,
        commentCount: json["commentCount"] ?? 0,
        shareCount: json["shareCount"] ?? 0,
        // editorId: json["editorId"],
        status: json["status"],
        category: SubCategory.fromJson(json["category"]),
        account: Account.fromJson(json["editor"]),
      );

  Map<String, dynamic> toJson() => {
        "postId": postId,
        "title": title,
        "subTitle": subTitle,
        "createTime": createTime.toIso8601String(),
        "publicTime": publicTime.toIso8601String(),
        "description": description,
        "video": video,
        "image": image,
        "viewCount": viewCount,
        "likeCount": likeCount,
        "commentCount": commentCount,
        "shareCount": shareCount,
        // "editorId": editorId,
        "status": status,
        "category": category.toJson(),
        "editor": account.toJson(),
      };
}
