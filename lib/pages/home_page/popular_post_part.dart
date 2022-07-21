import 'package:capstone_project/components/post_title_description.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/home_page_model.dart';
import 'package:flutter/material.dart';
// import 'package:sizer/sizer.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class PopularPost extends StatelessWidget {
  final Function(Post) function;
  final HomePageModel homePageModel;
  const PopularPost(
      {Key? key, required this.homePageModel, required this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Post>>(
        future: homePageModel.fetchPopularPost,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Container(
              height: 0.58.sh,
              alignment: Alignment.center,
              child: const CircularProgressIndicator(),
            );
          }
          if (snapshot.hasData) {
            if (snapshot.data!.isNotEmpty) {
              return SizedBox(
                height: 0.58.sh,
                child: ListView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  itemBuilder: (context, index) {
                    return PostTitleDescription(
                        post: snapshot.data![index], function: function);
                  },
                  itemCount:
                      snapshot.data!.length < 3 ? snapshot.data!.length : 3,
                ),
              );
            } else {
              return SizedBox(
                height: 0.58.sh,
                child: Center(
                    child: Text(
                  'Không có bài viết nào !!!',
                  style:
                      TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w600),
                )),
              );
            }
          }
          if (snapshot.hasError) {
            return SizedBox(
              height: 0.58.sh,
              child: Center(
                  child: Text(
                'Xảy ra lỗi: Không thể tải được bài viết',
                style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w600),
              )),
            );
          }
          return Container(
            height: 0.58.sh,
          );
        });
  }
}
