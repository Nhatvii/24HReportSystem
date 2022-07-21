// ignore_for_file: prefer_const_constructors

import 'package:capstone_project/components/rounded_text_icon.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/home_page_model.dart';
import 'package:capstone_project/pages/detail_page/post_detail_page.dart';
import 'package:capstone_project/pages/home_page/list_category_part.dart';
import 'package:capstone_project/pages/home_page/navigation_drawer.dart';
import 'package:capstone_project/pages/home_page/new_post_part.dart';
import 'package:capstone_project/pages/home_page/popular_post_part.dart';
import 'package:capstone_project/pages/login_page/login_page.dart';
import 'package:capstone_project/pages/report_send_history_page/report_send_history_page.dart';
import 'package:capstone_project/pages/search_post_page/search_post_page.dart';
import 'package:capstone_project/pages/see_more_page/see_more_new_post_page/see_more_new_post.dart';
import 'package:capstone_project/pages/see_more_page/see_more_popular_post_page/see_more_popular_post.dart';
import 'package:capstone_project/pages/user_profile_page/user_profile_page.dart';
import 'package:capstone_project/presenters/home_page_presenter.dart';
import 'package:capstone_project/views/home_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> implements HomePageView {
  late HomePagePresenter _homePagePresenter;
  late HomePageModel _homePageModel;

  @override
  void initState() {
    super.initState();
    _homePagePresenter = HomePagePresenter();
    _homePagePresenter.view = this;
    _homePagePresenter.init();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        key: _homePageModel.scaffoldKey,
        drawer: SizedBox(
            width: 0.7.sw,
            child: NavigationDrawer(
              homePageModel: _homePageModel,
              homePagePresenter: _homePagePresenter,
              navigateToProfilePage: navigateToProfilePage,
              navigateToReportSendHistoryPage: navigateToReportSendHistoryPage,
              navigateToLoginPage: navigateToLoginPage,
            )),
        body: Stack(
          children: [
            Container(
                height: 1.sh,
                width: 1.sw,
                padding: EdgeInsets.only(
                  top: 0.155.sh,
                  left: 0.02.sh,
                  right: 0.02.sh,
                  bottom: 0.01.sh,
                ),
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Bài Viết Mới Nhất',
                            style: TextStyle(
                                fontSize: 16.sp, fontWeight: FontWeight.w700),
                          ),
                          InkWell(
                            onTap: () => navigateToSeeMoreNewPostPage(),
                            child: Container(
                              padding: EdgeInsets.all(0.01.sh),
                              child: Text(
                                'Xem Thêm',
                                style: TextStyle(
                                    fontSize: 14.sp,
                                    fontWeight: FontWeight.w700,
                                    color: Colors.blue),
                              ),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 0.005.sh,
                      ),
                      NewPost(
                        homePageModel: _homePageModel,
                        homePagePresenter: _homePagePresenter,
                        function: navigateToDetailPage,
                      ),
                      SizedBox(
                        height: 0.015.sh,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Bài Viết Nổi Bật',
                            style: TextStyle(
                                fontSize: 16.sp, fontWeight: FontWeight.w700),
                          ),
                          InkWell(
                            onTap: () => navigateToSeeMorePopularPostPage(),
                            child: Container(
                              padding: EdgeInsets.all(0.01.sh),
                              child: Text(
                                'Xem Thêm',
                                style: TextStyle(
                                    fontSize: 14.sp,
                                    fontWeight: FontWeight.w700,
                                    color: Colors.blue),
                              ),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 0.005.sh,
                      ),
                      PopularPost(
                        homePageModel: _homePageModel,
                        function: navigateToDetailPage,
                      ),
                    ],
                  ),
                )),
            Positioned(
              top: 0,
              child: Container(
                height: 0.14.sh,
                width: 1.sw,
                padding: EdgeInsets.only(
                    top: 0.025.sh,
                    left: 0.025.sh,
                    right: 0.025.sh,),
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 2,
                      blurRadius: 2,
                      offset: Offset(0, 1),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GestureDetector(
                          onTap: () {
                            openDrawer();
                          },
                          child: Icon(
                            Icons.menu,
                            size: 25.sp,
                          ),
                        ),
                        RoundedTextIcon(
                          height: 0.045.sh,
                          width: 0.8.sw,
                          radius: 15.r,
                          icon: Icons.search,
                          controller: _homePageModel.search,
                          search: _homePageModel.search.text,
                          function: navigateToSearchPage,
                        ),
                      ],
                    ),
                    SizedBox(
                      height: 0.015.sh,
                    ),
                    ListCategory(
                        homePageModel: _homePageModel,
                        homePagePresenter: _homePagePresenter),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      // )),
    );
  }

  @override
  void onTapTagCategory(int categoryID, int index) {
    _homePagePresenter.onTapTagCategory(categoryID, index);
  }

  @override
  void refreshData(HomePageModel model) {
    setState(() {
      _homePageModel = model;
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
  void openDrawer() {
    _homePagePresenter.openDrawer();
  }

  @override
  void navigateToLoginPage() {
    Navigator.pop(context);
    Navigator.push(
        context, MaterialPageRoute(builder: ((context) => LoginPage())));
  }

  @override
  void logOut() {
    Navigator.pop(context);
  }

  @override
  void navigateToProfilePage() {
    Navigator.pop(context);
    Navigator.push(
        context, MaterialPageRoute(builder: ((context) => UserProfilePage())));
  }

  @override
  void navigateToSeeMoreNewPostPage() {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: ((context) => SeeMoreNewPostPage(
                  categoryId: _homePageModel.categoryIDDefault,
                  list: _homePageModel.listCate,
                  checkIndex: _homePageModel.checkIndex,
                ))));
  }

  @override
  void navigateToSeeMorePopularPostPage() {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: ((context) => SeeMorePopularPostPage(
                  categoryId: _homePageModel.categoryIDDefault,
                  list: _homePageModel.listCate,
                  checkIndex: _homePageModel.checkIndex,
                ))));
  }

  @override
  void navigateToReportSendHistoryPage() {
    Navigator.pop(context);
    Navigator.push(context,
        MaterialPageRoute(builder: ((context) => ReportSendHistoryPage())));
  }

  @override
  void navigateToSearchPage(String search) {
    _homePageModel.search.clear();
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: ((context) => SearchPostPage(searchText: search))));
  }
}
