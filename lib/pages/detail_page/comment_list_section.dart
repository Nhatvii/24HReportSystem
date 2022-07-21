import 'package:capstone_project/components/avatar_name.dart';
import 'package:capstone_project/entities/comment.dart';
import 'package:capstone_project/models/post_detail_page_model.dart';
import 'package:capstone_project/presenters/post_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CommentListSection extends StatelessWidget {
  final PostDetailPageModel postDetailPageModel;
  final PostDetailPagePresenter postDetailPagePresenter;
  final StateSetter sheetState;
  const CommentListSection(
      {Key? key,
      required this.postDetailPageModel,
      required this.postDetailPagePresenter,
      required this.sheetState})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Comment>>(
        future: postDetailPageModel.fetchListCommentByPostID,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Container(
              height: 0.7.sh,
              alignment: Alignment.center,
              child: const CircularProgressIndicator(),
            );
          }
          if (snapshot.hasData) {
            if (snapshot.data!.isNotEmpty) {
              return GestureDetector(
                onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
                child: Container(
                  height: 0.7.sh,
                  padding: EdgeInsets.only(
                    top: 0.025.sh,
                    left: 0.035.sw,
                    right: 0.035.sw,
                    bottom: MediaQuery.of(context).viewInsets.bottom != 0
                        ? 0.12.sh
                        : 0.012.sh,
                  ),
                  child: ListView.builder(
                    itemBuilder: (context, index) {
                      // return tagComment(snapshot.data![index]);
                      return tagComment(
                          postDetailPageModel.listComment[index], index);
                    },
                    // itemCount: snapshot.data!.length,
                    itemCount: postDetailPageModel.listComment.length,
                  ),
                ),
              );
            } else {
              return SizedBox(
                height: 0.7.sh,
                child: Center(
                  child: Text(
                    'Hãy là người đầu tiên bình luận',
                    style: TextStyle(
                        fontSize: 14.sp,
                        color: Colors.black,
                        fontWeight: FontWeight.w500),
                  ),
                ),
              );
            }
          }
          if (snapshot.hasError) {
            SizedBox(
              height: 0.7.sh,
              child: Center(
                child: Text(
                  'Xảy ra lỗi: Không tải được bình luận',
                  style: TextStyle(
                      fontSize: 11.sp,
                      color: Colors.black,
                      fontWeight: FontWeight.w500),
                ),
              ),
            );
          }
          return SizedBox(
            height: 0.7.sh,
          );
        });
  }

  Widget tagComment(Comment comment, int index) {
    return Container(
      margin: EdgeInsets.only(bottom: 0.02.sh),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          AvatarName(
              height: 0.05.sh,
              width: 0.1.sw,
              radius: 35.r,
              text: comment.user.accountInfo.username.isEmpty
                  ? comment.user.email
                  : comment.user.accountInfo.username,
              fontSize: 16.sp),
          SizedBox(
            width: 0.02.sw,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                margin: EdgeInsets.only(bottom: 0.005.sh),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(15.r),
                  color: Colors.grey.shade300,
                ),
                constraints: BoxConstraints(
                  maxWidth: 0.78.sw,
                ),
                child: Padding(
                  padding: EdgeInsets.all(0.015.sh),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          comment.user.accountInfo.username.isEmpty
                              ? comment.user.email
                              : comment.user.accountInfo.username,
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 13.sp,
                              fontWeight: FontWeight.w500),
                        ),
                        SizedBox(
                          height: 0.005.sh,
                        ),
                        Text(
                          comment.commentTitle,
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 12.sp,
                          ),
                        )
                      ]),
                ),
              ),
              Container(
                  padding: EdgeInsets.symmetric(horizontal: 0.025.sw),
                  child: Row(
                    children: [
                      comment.user.email == postDetailPageModel.email
                          ? Row(
                              children: [
                                Text(
                                  'Chỉnh Sửa',
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 11.sp,
                                  ),
                                ),
                                SizedBox(
                                  width: 0.02.sw,
                                ),
                                GestureDetector(
                                  onTap: () {
                                    print('1');
                                    postDetailPagePresenter.deleteComment(
                                        comment.commentId, index, sheetState);
                                  },
                                  child: Text(
                                    'Xóa',
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 11.sp,
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 0.02.sw,
                                ),
                              ],
                            )
                          : Container(),
                      Text(
                        postDetailPageModel.convertToAgo(comment.createTime),
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 11.sp,
                        ),
                      ),
                    ],
                  ))
            ],
          ),
        ],
      ),
    );
  }
}
