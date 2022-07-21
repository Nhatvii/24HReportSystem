// To parse this JSON data, do
//
//     final subCategory = subCategoryFromJson(jsonString);

import 'dart:convert';

import 'package:capstone_project/entities/category.dart';

List<SubCategory> subCategoryFromJson(String str) => List<SubCategory>.from(json.decode(str).map((x) => SubCategory.fromJson(x)));

String subCategoryToJson(List<SubCategory> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class SubCategory {
    SubCategory({
        required this.categoryId,
        required this.subCategory,
        required this.rootCategoryNavigation,
    });

    int categoryId;
    String subCategory;
    Category rootCategoryNavigation;

    factory SubCategory.fromJson(Map<String, dynamic> json) => SubCategory(
        categoryId: json["categoryId"],
        subCategory: json["subCategory"],
        rootCategoryNavigation: Category.fromJson(json["rootCategoryNavigation"]),
    );

    Map<String, dynamic> toJson() => {
        "categoryId": categoryId,
        "subCategory": subCategory,
        "rootCategoryNavigation": rootCategoryNavigation.toJson(),
    };
}