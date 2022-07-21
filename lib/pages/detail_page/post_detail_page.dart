import 'package:capstone_project/components/alert_dialog.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_detail_page_model.dart';
import 'package:capstone_project/pages/detail_page/bottom_bar_part.dart';
import 'package:capstone_project/pages/detail_page/post_detail_part.dart';
import 'package:capstone_project/pages/detail_page/related_post_part.dart';
import 'package:capstone_project/pages/login_page/login_page.dart';
import 'package:capstone_project/presenters/post_detail_page_presenter.dart';
import 'package:capstone_project/views/post_detail_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';

class PostDetailPage extends StatefulWidget {
  final String postID;
  final int categoryID;
  const PostDetailPage(
      {Key? key, required this.postID, required this.categoryID})
      : super(key: key);

  @override
  State<PostDetailPage> createState() => _PostDetailPageState();
}

class _PostDetailPageState extends State<PostDetailPage>
    implements PostDetailPageView {
  late PostDetailPagePresenter _postDetailPagePresenter;
  late PostDetailPageModel _postDetailPageModel;

  @override
  void initState() {
    super.initState();
    _postDetailPagePresenter =
        PostDetailPagePresenter(widget.postID, widget.categoryID);
    _postDetailPagePresenter.view = this;
    _postDetailPagePresenter.init(widget.postID, widget.categoryID);
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        bottomNavigationBar: Padding(
            padding: EdgeInsets.only(
              bottom: MediaQuery.of(context).viewInsets.bottom,
            ),
            child: BottomBar(
              postDetailPageModel: _postDetailPageModel,
              postDetailPagePresenter: _postDetailPagePresenter,
              function: showAlertDialog,
            )),
        resizeToAvoidBottomInset: false,
        extendBody: true,
        body: GestureDetector(
          onTap: () {
            FocusManager.instance.primaryFocus?.unfocus();
          },
          child: Padding(
            padding: EdgeInsets.only(
              top: 0.02.sh,
              left: 0.02.sh,
              right: 0.02.sh,
              bottom: 0.01.sh,
            ),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  PostDetailPart(
                      postDetailPageModel: _postDetailPageModel,
                      postDetailPagePresenter: _postDetailPagePresenter),
                  RelatedPostPart(
                      postDetailPageModel: _postDetailPageModel,
                      postDetailPagePresenter: _postDetailPagePresenter,
                      function: navigateToDetailPage),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void refreshData(PostDetailPageModel model) {
    setState(() {
      _postDetailPageModel = model;
    });
  }

  @override
  void navigateToDetailPage(Post post) {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: ((context) => PostDetailPage(
                  postID: post.postId,
                  categoryID: post.category.categoryId,
                ))));
  }

  @override
  void showAlertDialog() {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialogCustom(
              title: Text(
                'Thông Báo',
                style: TextStyle(fontSize: 13.sp),
              ),
              content: Text('Đăng nhập để thực hiện tính năng',
                  style: TextStyle(fontSize: 13.sp)),
              confirmFunction: TextButton(
                child: Text("Đăng Nhập", style: TextStyle(fontSize: 12.sp)),
                onPressed: () {
                  Navigator.pop(context);
                  Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: ((context) => const LoginPage())))
                      .then((val) => {
                            if (val == true)
                              {
                                _postDetailPagePresenter.init(
                                    widget.postID, widget.categoryID)
                              }
                          });
                },
              ),
              cancelFunction: TextButton(
                child: Text("Hủy", style: TextStyle(fontSize: 12.sp)),
                onPressed: () => Navigator.pop(context),
              ));
        });
  }

  @override
  void showCommentBadWordDialog(String title) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialogCustom(
              title: Text(
                'Thông Báo',
                style: TextStyle(fontSize: 13.sp),
              ),
              content: Text(title, style: TextStyle(fontSize: 13.sp)),
              confirmFunction: Container(),
              cancelFunction: TextButton(
                child: Text("OK", style: TextStyle(fontSize: 12.sp)),
                onPressed: () => Navigator.pop(context),
              ));
        });
  }

  @override
  void showToast(String msg) {
    Fluttertoast.showToast(
      msg: msg,
      gravity: ToastGravity.BOTTOM,
    );
  }
}
