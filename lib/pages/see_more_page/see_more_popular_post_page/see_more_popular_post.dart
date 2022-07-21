import 'package:capstone_project/entities/category.dart';
import 'package:capstone_project/models/see_more_popular_post_page_model.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/pages/detail_page/post_detail_page.dart';
import 'package:capstone_project/pages/see_more_page/see_more_popular_post_page/list_category_popular_post.dart';
import 'package:capstone_project/pages/see_more_page/see_more_popular_post_page/popular_post_see_more.dart';
import 'package:capstone_project/presenters/see_more_popular_post_page_presenter.dart';
import 'package:capstone_project/views/see_more_popular_post_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SeeMorePopularPostPage extends StatefulWidget {
  final int categoryId;
  final List<Category> list;
  final int checkIndex;
  const SeeMorePopularPostPage({
    Key? key,
    required this.categoryId,
    required this.list,
    required this.checkIndex,
  }) : super(key: key);

  @override
  State<SeeMorePopularPostPage> createState() => _SeeMorePopularPostPageState();
}

class _SeeMorePopularPostPageState extends State<SeeMorePopularPostPage>
    implements SeeMorePopularPostPageView {
  late SeeMorePopularPostPageModel _seeMorePopularPostPageModel;
  late SeeMorePopularPostPagePresenter _seeMorePopularPostPagePresenter;

  @override
  void initState() {
    super.initState();
    _seeMorePopularPostPagePresenter = SeeMorePopularPostPagePresenter(
        widget.categoryId, widget.list, widget.checkIndex);
    _seeMorePopularPostPagePresenter.view = this;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          leading: Padding(
            padding: EdgeInsets.only(left: 0.02.sh),
            child: GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Icon(
                  Icons.arrow_back_ios,
                  size: 22.sp,
                )),
          ),
          title: Text(
            'Bài Viết Nổi Bật',
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
              top: 0.015.sh,
              left: 0.02.sh,
              right: 0.02.sh,
              bottom: 0.02.sh,
            ),
            child: Column(
              children: [
                ListCategoryPopularPost(
                    seeMorePopularPostPageModel: _seeMorePopularPostPageModel,
                    seeMorePopularPostPagePresenter:
                        _seeMorePopularPostPagePresenter),
                SizedBox(
                  height: 0.015.sh,
                ),
                PopularPostSeeMore(
                  seeMorePopularPostPageModel: _seeMorePopularPostPageModel,
                  seeMorePopularPostPagePresenter:
                      _seeMorePopularPostPagePresenter,
                  function: onNavigateDetailPage,
                ),
              ],
            )),
      ),
    );
  }

  @override
  void onNavigateDetailPage(Post post) {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: ((context) => PostDetailPage(
                  postID: post.postId,
                  categoryID: post.category.categoryId,
                ))));
  }

  @override
  void refreshData(SeeMorePopularPostPageModel model) {
    setState(() {
      _seeMorePopularPostPageModel = model;
    });
  }
}
