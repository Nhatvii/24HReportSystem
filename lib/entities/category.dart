// // To parse this JSON data, do
// //
// //     final category = categoryFromJson(jsonString);

// import 'dart:convert';

// List<Category> categoryFromJson(String str) =>
//     List<Category>.from(json.decode(str).map((x) => Category.fromJson(x)));

// String categoryToJson(List<Category> data) =>
//     json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

// class Category {
//   Category({
//     required this.categoryId,
//     required this.rootCategory,
//     required this.type,
//   });

//   int categoryId;
//   String type;
//   Category rootCategory;

//   factory Category.fromJson(Map<String, dynamic> json) => Category(
//         categoryId: json["categoryId"],
//         type: json["type"],
//         rootCategory: json["rootCategory"],
//       );

//   Map<String, dynamic> toJson() => {
//         "categoryId": categoryId,
//         "type": type,
//         "rootCategory": rootCategory,
//       };
// }

import 'dart:convert';

List<Category> categoryFromJson(String str) => List<Category>.from(json.decode(str).map((x) => Category.fromJson(x)));

String categoryToJson(List<Category> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Category {
    Category({
        required this.categoryId,
        required this.type,
        required this.rootCategory,
    });

    int categoryId;
    String type;
    Category? rootCategory;

    factory Category.fromJson(Map<String, dynamic> json) => Category(
        categoryId: json["categoryId"],
        type: json["type"],
        rootCategory: json["rootCategory"] == null ? null : Category.fromJson(json["rootCategory"]),
    );

    Map<String, dynamic> toJson() => {
        "categoryId": categoryId,
        "type": type,
        "rootCategory": rootCategory!.toJson(),
    };
}