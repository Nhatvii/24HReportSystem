import 'package:capstone_project/components/tag_cate.dart';
import 'package:capstone_project/models/see_more_popular_post_page_model.dart';
import 'package:capstone_project/presenters/see_more_popular_post_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ListCategoryPopularPost extends StatelessWidget {
  final SeeMorePopularPostPageModel seeMorePopularPostPageModel;
  final SeeMorePopularPostPagePresenter seeMorePopularPostPagePresenter;
  const ListCategoryPopularPost(
      {Key? key,
      required this.seeMorePopularPostPageModel,
      required this.seeMorePopularPostPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 0.04.sh,
        width: 1.sw,
        child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: seeMorePopularPostPageModel.listCategory.length,
            itemBuilder: (context, index) {
              seeMorePopularPostPagePresenter.checkTagCate(index);
              return GestureDetector(
                  onTap: () {
                    seeMorePopularPostPagePresenter.onTapTagCategory(
                        seeMorePopularPostPageModel
                            .listCategory[index].rootCategoryId,
                        index);
                  },
                  child: TagCate(
                      text:
                          seeMorePopularPostPageModel.listCategory[index].type,
                      isBeingSelected:
                          seeMorePopularPostPageModel.listSelectedTag[index]));
            }));
  }
}
