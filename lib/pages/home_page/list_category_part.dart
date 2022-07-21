import 'package:capstone_project/components/tag_cate.dart';
import 'package:capstone_project/entities/category.dart';
import 'package:capstone_project/models/home_page_model.dart';
import 'package:capstone_project/presenters/home_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ListCategory extends StatefulWidget {
  final HomePageModel homePageModel;
  final HomePagePresenter homePagePresenter;
  const ListCategory(
      {Key? key, required this.homePageModel, required this.homePagePresenter})
      : super(key: key);

  @override
  State<ListCategory> createState() => _ListCategoryState();
}

class _ListCategoryState extends State<ListCategory> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Category>>(
      future: widget.homePageModel.fetchListCategory,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return SizedBox(
              height: 0.043.sh,
              width: 1.sw,
              child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    widget.homePagePresenter.checkTagCate(index);
                    return GestureDetector(
                        onTap: () {
                          widget.homePagePresenter.onTapTagCategory(
                              snapshot.data![index].rootCategoryId, index);
                        },
                        child: TagCate(
                            text: snapshot.data![index].type,
                            isBeingSelected:
                                widget.homePageModel.listSelectedTag[index]));
                  }));
        }
        if (snapshot.hasError) {
          print(snapshot.error);
        }
        return Container(
          height: 0.043.sh,
        );
      },
    );
  }
}
