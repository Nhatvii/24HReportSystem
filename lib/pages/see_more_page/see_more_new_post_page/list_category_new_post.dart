import 'package:capstone_project/components/tag_cate.dart';
import 'package:capstone_project/models/see_more_new_post_page_model.dart';
import 'package:capstone_project/presenters/see_more_new_post_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ListCategoryNewPost extends StatelessWidget {
  final SeeMoreNewPostPageModel seeMoreNewPostPageModel;
  final SeeMoreNewPostPagePresenter seeMoreNewPostPagePresenter;
  const ListCategoryNewPost(
      {Key? key,
      required this.seeMoreNewPostPageModel,
      required this.seeMoreNewPostPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 0.04.sh,
        width: 1.sw,
        child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: seeMoreNewPostPageModel.listCategory.length,
            itemBuilder: (context, index) {
              seeMoreNewPostPagePresenter.checkTagCate(index);
              return GestureDetector(
                  onTap: () {
                    seeMoreNewPostPagePresenter.onTapTagCategory(
                        seeMoreNewPostPageModel
                            .listCategory[index].rootCategoryId,
                        index);
                  },
                  child: TagCate(
                      text: seeMoreNewPostPageModel.listCategory[index].type,
                      isBeingSelected:
                          seeMoreNewPostPageModel.listSelectedTag[index]));
            }));
  }
}
