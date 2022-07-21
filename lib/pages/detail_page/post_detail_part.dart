import 'package:capstone_project/components/tag_cate.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_detail_page_model.dart';
import 'package:capstone_project/presenters/post_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class PostDetailPart extends StatelessWidget {
  final PostDetailPageModel postDetailPageModel;
  final PostDetailPagePresenter postDetailPagePresenter;
  const PostDetailPart(
      {Key? key,
      required this.postDetailPageModel,
      required this.postDetailPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Post>(
      future: postDetailPageModel.fetchPostDetail,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return SizedBox(
            height: 0.85.sh,
            width: 1.sw,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const CircularProgressIndicator(),
                SizedBox(
                  width: 0.03.sw,
                ),
                Text(
                  'Đang Tải...',
                  style: TextStyle(fontSize: 16.sp),
                ),
              ],
            ),
          );
        }
        if (snapshot.hasData) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                      onTap: (() => Navigator.pop(context)),
                      child: Icon(
                        Icons.arrow_back_ios,
                        color: Colors.blue,
                        size: 22.sp,
                      )),
                  GestureDetector(
                    onTap: () {
                      postDetailPagePresenter.savePost(snapshot.data!.postId);
                    },
                    child: FutureBuilder(
                        future: postDetailPageModel.fetchPostDetail,
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            return Icon(
                              postDetailPageModel.isSave
                                  ? Icons.bookmark
                                  : Icons.bookmark_outline,
                              size: 22.sp,
                              color: Colors.blue,
                            );
                          }
                          return Container();
                        }),
                  ),
                ],
              ),
              SizedBox(
                height: 0.02.sh,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  TagCate(
                      text: snapshot.data!.category.subCategory,
                      isBeingSelected: true),
                  Row(
                    children: [
                      Icon(
                        Icons.access_time_filled,
                        color: Colors.blue,
                        size: 22.sp,
                      ),
                      SizedBox(
                        width: 0.01.sw,
                      ),
                      Text(
                        postDetailPageModel
                            .convertToAgo(snapshot.data!.publicTime),
                        style: TextStyle(
                            fontSize: 12.sp, fontWeight: FontWeight.w500),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(
                height: 0.025.sh,
              ),
              SizedBox(
                width: 1.sw,
                child: Text(
                  snapshot.data!.title,
                  style:
                      TextStyle(fontSize: 24.sp, fontWeight: FontWeight.w700),
                ),
              ),
              SizedBox(
                height: 0.05.sh,
              ),
              Text(
                snapshot.data!.subTitle,
                style: TextStyle(
                    fontSize: 20.sp,
                    fontWeight: FontWeight.w600,
                    fontStyle: FontStyle.italic),
              ),
              SizedBox(
                height: 0.03.sh,
              ),
              SizedBox(
                height: 0.3.sh,
                width: 1.sw,
                child: ClipRRect(
                    borderRadius: BorderRadius.circular(15.r),
                    child: Image.network(
                      snapshot.data!.image,
                      fit: BoxFit.cover,
                    )),
              ),
              SizedBox(
                height: 0.01.sh,
              ),
              Html(
                data: snapshot.data!.description,
                style: {
                  "h1": Style(color: Colors.red),
                  "p": Style(fontSize: FontSize.xLarge),
                },
              ),
              SizedBox(
                height: 0.02.sh,
              ),
              Container(
                  alignment: Alignment.centerRight,
                  child: Text(
                    snapshot.data!.account.accountInfo.username,
                    style: TextStyle(fontSize: 16.sp),
                  )),
              SizedBox(
                height: 0.01.sh,
              ),
              Divider(
                color: Colors.grey.shade400,
                thickness: 1,
              ),
              SizedBox(
                height: 0.02.sh,
              ),
            ],
          );
        }
        if (snapshot.hasError) {
          print(snapshot.error);
        }
        return Container();
      },
    );
  }
}
