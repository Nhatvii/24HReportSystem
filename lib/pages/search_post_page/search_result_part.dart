import 'package:capstone_project/components/post_title_description.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/search_post_page_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SearchResultPart extends StatelessWidget {
  final SearchPostPageModel searchPostPageModel;
  final Function(Post) function;
  const SearchResultPart(
      {Key? key, required this.searchPostPageModel, required this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Post>>(
        future: searchPostPageModel.fetchListPostBySearchText,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Container(
              height: 0.5.sh,
              alignment: Alignment.center,
              child: const CircularProgressIndicator(),
            );
          }
          if (snapshot.hasData) {
            if (snapshot.data!.isNotEmpty) {
              return ListView.builder(
                itemBuilder: (context, index) {
                  return PostTitleDescription(
                      post: snapshot.data![index], function: function);
                },
                itemCount: snapshot.data!.length,
              );
            } else {
              return SizedBox(
                  height: 0.5.sh,
                  child: Center(
                    child: Text(
                      'Không tìm thấy bài viết!',
                      style: TextStyle(
                          fontSize: 14.sp, fontWeight: FontWeight.w600),
                    ),
                  ));
            }
          }
          if (snapshot.hasError) {
            return SizedBox(
              height: 0.5.sh,
              child: Center(
                  child: Text(
                'Xảy ra lỗi: Không thể tải được bài viết',
                style: TextStyle(fontSize: 14.sp),
              )),
            );
          }
          return Container(
            height: 0.5.sh,
          );
        });
  }
}
