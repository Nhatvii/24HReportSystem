import 'dart:convert';

import 'package:capstone_project/entities/account.dart';

List<Comment> commentFromJson(String str) =>
    List<Comment>.from(json.decode(str).map((x) => Comment.fromJson(x)));

String commentToJson(List<Comment> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Comment {
  Comment({
    required this.commentId,
    required this.commentTitle,
    required this.createTime,
    required this.status,
    required this.postId,
    required this.user,
  });

  String commentId;
  String commentTitle;
  DateTime createTime;
  String status;
  String postId;
  Account user;

  factory Comment.fromJson(Map<String, dynamic> json) => Comment(
        commentId: json["commentId"],
        commentTitle: json["commentTitle"],
        createTime: DateTime.parse(json["createTime"]),
        status: json["status"],
        postId: json["postId"],
        user: Account.fromJson(json["user"]),
      );

  Map<String, dynamic> toJson() => {
        "commentId": commentId,
        "commentTitle": commentTitle,
        "createTime": createTime.toIso8601String(),
        "status": status,
        "postId": postId,
        "user": user.toJson(),
      };
}
