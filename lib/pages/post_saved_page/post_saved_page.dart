import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_saved_page_model.dart';
import 'package:capstone_project/pages/detail_page/post_detail_page.dart';
import 'package:capstone_project/pages/post_saved_page/list_post_saved_part.dart';
import 'package:capstone_project/presenters/post_saved_page_presenter.dart';
import 'package:capstone_project/views/post_saved_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SavedPostPage extends StatefulWidget {
  const SavedPostPage({Key? key}) : super(key: key);

  @override
  State<SavedPostPage> createState() => _SavedPostPageState();
}

class _SavedPostPageState extends State<SavedPostPage>
    implements PostSavedPageView {
  late PostSavedPageModel _postSavedPageModel;
  late PostSavedPagePresenter _postSavedPagePresenter;

  @override
  void initState() {
    super.initState();
    _postSavedPagePresenter = PostSavedPagePresenter();
    _postSavedPagePresenter.view = this;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Bài Viết Đã Lưu',
          style: TextStyle(fontSize: 16.sp, fontWeight: FontWeight.w700),
        ),
        centerTitle: true,
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(colors: <Color>[
              Color(0xFF56CCF2),
              Color(0xFF2F80ED),
            ]),
          ),
        ),
      ),
      body: Container(
        height: 1.sh,
        width: 1.sw,
        padding: EdgeInsets.only(
          top: 0.04.sh,
          left: 0.02.sh,
          right: 0.02.sh,
        ),
        child: PostSavedPart(
          postSavedPageModel: _postSavedPageModel,
          function: navigateToDetailPage,
        ),
      ),
    );
  }

  @override
  void refreshData(PostSavedPageModel model) {
    setState(() {
      _postSavedPageModel = model;
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
}
