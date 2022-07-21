import 'package:capstone_project/components/avatar_name.dart';
import 'package:capstone_project/components/icon_and_number.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_detail_page_model.dart';
import 'package:capstone_project/pages/detail_page/bottom_share_sheet.dart';
import 'package:capstone_project/pages/detail_page/comment_list_section.dart';
import 'package:capstone_project/presenters/post_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BottomBar extends StatefulWidget {
  final PostDetailPageModel postDetailPageModel;
  final PostDetailPagePresenter postDetailPagePresenter;
  final Function function;
  const BottomBar({
    Key? key,
    required this.postDetailPageModel,
    required this.postDetailPagePresenter,
    required this.function,
  }) : super(key: key);

  @override
  State<BottomBar> createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Post>(
        future: widget.postDetailPageModel.fetchPostDetail,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return Container(
              height: 0.1.sh,
              width: 1.sw,
              padding: EdgeInsets.all(0.02.sh),
              decoration: const BoxDecoration(
                color: Colors.white,
              ),
              child: Row(children: [
                GestureDetector(
                    onTap: () {
                      Navigator.of(context).pop();
                    },
                    child: Icon(
                      Icons.arrow_back_ios,
                      color: Colors.blue,
                      size: 22.sp,
                    )),
                GestureDetector(
                  onTap: () {
                    widget.postDetailPagePresenter
                        .loadCommentByPostId(snapshot.data!.postId);
                    showBottomSheet(widget.postDetailPageModel,
                        widget.postDetailPagePresenter, snapshot.data!.postId);
                  },
                  child: Container(
                    height: 0.07.sh,
                    width: 0.42.sw,
                    padding: EdgeInsets.only(left: 0.01.sh),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade200,
                      borderRadius: BorderRadius.circular(15.r),
                    ),
                    child: TextFormField(
                      style: TextStyle(fontSize: 14.sp),
                      enabled: false,
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        hintText: 'Viết Bình Luận...',
                      ),
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      onTap: () {
                        widget.postDetailPagePresenter
                            .likePost(snapshot.data!.postId);
                      },
                      child: IconAndNumber(
                        height: 0.05.sh,
                        width: 0.05.sw,
                        icon: FutureBuilder(
                            future: widget.postDetailPageModel.fetchPostDetail,
                            builder: (context, snapshot) {
                              if (snapshot.hasData) {
                                return Icon(
                                  widget.postDetailPageModel.isLike
                                      ? Icons.thumb_up
                                      : Icons.thumb_up_outlined,
                                  size: 22.sp,
                                  color: Colors.blue,
                                );
                              }
                              return Container();
                            }),
                        text: Text(
                          widget.postDetailPageModel.likeCount.toString(),
                          style: TextStyle(
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w500,
                              color: Colors.black),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        widget.postDetailPagePresenter
                            .loadCommentByPostId(snapshot.data!.postId);
                        showBottomSheet(
                            widget.postDetailPageModel,
                            widget.postDetailPagePresenter,
                            snapshot.data!.postId);
                      },
                      child: IconAndNumber(
                        height: 0.05.sh,
                        width: 0.05.sw,
                        icon: Icon(
                          Icons.chat_bubble_outline,
                          size: 22.sp,
                          color: Colors.blue,
                        ),
                        text: Text(
                          widget.postDetailPageModel.commentCount.toString(),
                          style: TextStyle(
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w500,
                              color: Colors.black),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        showShareSheet(widget.postDetailPagePresenter,
                            snapshot.data!.title, snapshot.data!.postId);
                      },
                      child: IconAndNumber(
                        height: 0.05.sh,
                        width: 0.05.sw,
                        icon: Icon(
                          Icons.share_outlined,
                          size: 22.sp,
                          color: Colors.blue,
                        ),
                        text: Text(
                          widget.postDetailPageModel.shareCount.toString(),
                          style: TextStyle(
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w500,
                              color: Colors.black),
                        ),
                      ),
                    ),
                  ],
                ),
              ]),
            );
          }
          return Container();
        });
  }

  Future showShareSheet(
      PostDetailPagePresenter presenter, String title, String postId) {
    return showModalBottomSheet(
        backgroundColor: Colors.transparent,
        context: context,
        builder: (context) {
          return BottomShareSheet(
              postDetailPagePresenter: presenter, title: title, postId: postId);
        });
  }

  Future showBottomSheet(PostDetailPageModel model,
      PostDetailPagePresenter presenter, String postId) {
    return showModalBottomSheet(
        isScrollControlled: true,
        backgroundColor: Colors.transparent,
        context: context,
        builder: (context) {
          return StatefulBuilder(
              builder: (BuildContext context, StateSetter sheetState) {
            return Padding(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom,
              ),
              child: bottomSheet(sheetState, model, presenter, postId),
            );
          });
        });
  }

  Widget bottomSheet(StateSetter sheetState, PostDetailPageModel model,
      PostDetailPagePresenter presenter, String postId) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () => Navigator.of(context).pop(),
      child: DraggableScrollableSheet(
        initialChildSize: 0.8,
        minChildSize: 0.6,
        maxChildSize: 0.8,
        builder: ((context, scrollController) => Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(25.r)),
              ),
              child: Stack(
                children: [
                  CommentListSection(
                    postDetailPageModel: model,
                    postDetailPagePresenter: presenter,
                    sheetState: sheetState,
                  ),
                  Positioned(
                    bottom: 0,
                    child: Container(
                      width: 1.sw,
                      padding: EdgeInsets.symmetric(
                        vertical: 0.01.sh,
                        horizontal: 0.025.sw,
                      ),
                      decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border(
                              top: BorderSide(
                                  color: Colors.grey, width: 0.002.sw))),
                      child: model.email == null
                          ? GestureDetector(
                              onTap: () => widget.function(),
                              child: SizedBox(
                                height: 0.05.sh,
                                child: Center(
                                  child: Text(
                                    'Đăng nhập để bình luận',
                                    style: TextStyle(
                                        fontSize: 14.sp,
                                        fontWeight: FontWeight.w500),
                                  ),
                                ),
                              ),
                            )
                          : Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                AvatarName(
                                    height: 0.06.sh,
                                    width: 0.12.sw,
                                    radius: 35.r,
                                    text: model.name == null
                                        ? model.email!
                                        : model.name!,
                                    fontSize: 18.sp),
                                SizedBox(
                                  width: 0.03.sw,
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Bình luận ít nhất 16 kí tự',
                                      style: TextStyle(
                                        fontSize: 12.sp,
                                      ),
                                    ),
                                    SizedBox(
                                      height: 0.003.sh,
                                    ),
                                    Container(
                                      height: 0.08.sh,
                                      width: 0.78.sw,
                                      color: Colors.white,
                                      alignment: Alignment.center,
                                      child: TextFormField(
                                        onChanged: (value) {
                                          if (value.length >= 16) {
                                            widget.postDetailPagePresenter
                                                .checkIsSend(1, sheetState);
                                          } else {
                                            widget.postDetailPagePresenter
                                                .checkIsSend(2, sheetState);
                                          }
                                        },
                                        style: TextStyle(fontSize: 14.sp),
                                        maxLines: 2,
                                        keyboardType: TextInputType.multiline,
                                        maxLength: 100,
                                        controller: model.comment,
                                        decoration: InputDecoration(
                                          isDense: true,
                                          contentPadding: EdgeInsets.symmetric(
                                              vertical: 0.01.sh,
                                              horizontal: 0.03.sw),
                                          enabledBorder: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(15.r),
                                          ),
                                          focusedBorder: OutlineInputBorder(
                                              borderRadius:
                                                  BorderRadius.circular(15.r),
                                              borderSide: BorderSide(
                                                  color: Colors.blue,
                                                  width: 0.2.w)),
                                          hintText: 'Viết Bình Luận...',
                                          suffixIcon:
                                              widget.postDetailPageModel.isSend
                                                  ? InkWell(
                                                      onTap: () {
                                                        FocusManager.instance
                                                            .primaryFocus
                                                            ?.unfocus();
                                                        sheetState(() {
                                                          widget
                                                              .postDetailPagePresenter
                                                              .postComment(
                                                                  postId,
                                                                  sheetState);
                                                        });
                                                      },
                                                      child: Icon(
                                                        Icons.send_rounded,
                                                        size: 22.sp,
                                                        color: Colors.blue,
                                                      ))
                                                  : Icon(
                                                      Icons.send_rounded,
                                                      size: 22.sp,
                                                      color: Colors.grey,
                                                    ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                    ),
                  ),
                ],
              ),
            )),
      ),
    );
  }
}
