import 'package:capstone_project/components/post_title_description.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_detail_page_model.dart';
import 'package:capstone_project/presenters/post_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class RelatedPostPart extends StatelessWidget {
  final PostDetailPageModel postDetailPageModel;
  final PostDetailPagePresenter postDetailPagePresenter;
  final Function(Post) function;
  const RelatedPostPart(
      {Key? key,
      required this.postDetailPageModel,
      required this.postDetailPagePresenter,
      required this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Bài Viết Liên Quan',
            style: TextStyle(fontSize: 16.sp, fontWeight: FontWeight.w700)),
        SizedBox(
          height: 0.01.sh,
        ),
        FutureBuilder<List<Post>>(
            future: postDetailPageModel.fetchListRelatedPost,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Container(
                  height: 0.58.sh,
                  alignment: Alignment.center,
                  child: const CircularProgressIndicator(),
                );
              }
              if (snapshot.hasData) {
                return SizedBox(
                  height: 0.58.sh,
                  child: ListView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    itemBuilder: (context, index) {
                      return PostTitleDescription(
                        post: snapshot.data![index],
                        function: function,
                      );
                    },
                    itemCount:
                        snapshot.data!.length < 3 ? snapshot.data!.length : 3,
                  ),
                );
              }
              if (snapshot.hasError) {
                return SizedBox(
                  height: 0.58.sh,
                  child: Center(
                    child: Text(
                      'Xảy ra lỗi: Không thể tải được bài viết',
                      style: TextStyle(fontSize: 12.sp),
                    ),
                  ),
                );
              }
              return SizedBox(
                height: 0.58.sh,
              );
            }),
        SizedBox(
          height: 0.15.sh,
        ),
      ],
    );
  }
}
