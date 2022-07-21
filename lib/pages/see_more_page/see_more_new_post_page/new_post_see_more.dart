import 'package:capstone_project/components/post_title_description.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/see_more_new_post_page_model.dart';
import 'package:capstone_project/presenters/see_more_new_post_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class NewPostSeeMore extends StatelessWidget {
  final SeeMoreNewPostPageModel seeMoreNewPostPageModel;
  final SeeMoreNewPostPagePresenter seeMoreNewPostPagePresenter;
  final Function(Post) function;
  const NewPostSeeMore(
      {Key? key,
      required this.seeMoreNewPostPageModel,
      required this.seeMoreNewPostPagePresenter,
      required this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Post>>(
        future: seeMoreNewPostPageModel.fetchNewPost,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Container(
              height: 0.82.sh,
              alignment: Alignment.center,
              child: const CircularProgressIndicator(),
            );
          }
          if (snapshot.hasData) {
            if (snapshot.data!.isNotEmpty) {
              return SizedBox(
                height: 0.82.sh,
                width: 1.sw,
                child: ListView.builder(
                  itemBuilder: (context, index) {
                    return PostTitleDescription(
                        post: snapshot.data![index], function: function);
                  },
                  itemCount: snapshot.data!.length,
                ),
              );
            } else {
              return SizedBox(
                  height: 0.82.sh,
                  child: Center(
                    child: Text(
                      'Không có bài viết nào!',
                      style: TextStyle(
                          fontSize: 14.sp, fontWeight: FontWeight.w600),
                    ),
                  ));
            }
          }
          if (snapshot.hasError) {
            return SizedBox(
              height: 0.82.sh,
              child: Center(
                  child: Text(
                'Xảy ra lỗi: Không thể tải được bài viết',
                style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w600),
              )),
            );
          }
          return Container(
            height: 0.82.sh,
          );
        });
  }

}
