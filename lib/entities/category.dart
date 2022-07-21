// To parse this JSON data, do
//
//     final category = categoryFromJson(jsonString);

import 'dart:convert';

List<Category> categoryFromJson(String str) =>
    List<Category>.from(json.decode(str).map((x) => Category.fromJson(x)));

String categoryToJson(List<Category> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Category {
  Category({
    required this.rootCategoryId,
    required this.type,
  });

  int rootCategoryId;
  String type;

  factory Category.fromJson(Map<String, dynamic> json) => Category(
        rootCategoryId: json["rootCategoryId"],
        type: json["type"],
      );

  Map<String, dynamic> toJson() => {
        "rootCategoryId": rootCategoryId,
        "type": type,
      };
}
