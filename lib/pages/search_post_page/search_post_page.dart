import 'package:capstone_project/components/rounded_text_icon.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/search_post_page_model.dart';
import 'package:capstone_project/pages/detail_page/post_detail_page.dart';
import 'package:capstone_project/pages/search_post_page/search_result_part.dart';
import 'package:capstone_project/presenters/search_post_page_presenter.dart';
import 'package:capstone_project/views/search_post_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SearchPostPage extends StatefulWidget {
  final String searchText;
  const SearchPostPage({Key? key, required this.searchText}) : super(key: key);

  @override
  State<SearchPostPage> createState() => _SearchPostPageState();
}

class _SearchPostPageState extends State<SearchPostPage>
    implements SearchPostPageView {
  late SearchPostPageModel _searchPostPageModel;
  late SearchPostPagePresenter _searchPostPagePresenter;

  @override
  void initState() {
    super.initState();
    _searchPostPagePresenter = SearchPostPagePresenter(widget.searchText);
    _searchPostPagePresenter.view = this;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: _appBar(),
        body: SingleChildScrollView(
          child: Container(
            padding: EdgeInsets.all(0.02.sh),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Những bài viết liên quan đến từ khóa "${_searchPostPageModel.search.text}"',
                  style:
                      TextStyle(fontSize: 16.sp, fontWeight: FontWeight.w500),
                ),
                SizedBox(
                  height: 0.01.sh,
                ),
                SizedBox(
                  height: 0.75.sh,
                  width: 1.sw,
                  child: SearchResultPart(
                      searchPostPageModel: _searchPostPageModel,
                      function: navigateToDetailPage),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  _appBar() => PreferredSize(
        preferredSize: Size(MediaQuery.of(context).size.width, 0.14.sh),
        child: Stack(
          children: [
            Container(),
            Container(
              padding: EdgeInsets.only(
                  top: 0.02.sh, left: 0.02.sh, right: 0.02.sh, bottom: 0.04.sh),
              height: 0.1.sh,
              width: 1.sw,
              decoration: const BoxDecoration(
                gradient: LinearGradient(colors: <Color>[
                  Color(0xFF56CCF2),
                  Color(0xFF2F80ED),
                ]),
              ),
              child: Row(
                children: [
                  GestureDetector(
                      onTap: (() => Navigator.pop(context)),
                      child: Icon(
                        Icons.arrow_back_ios,
                        color: Colors.white,
                        size: 22.sp,
                      )),
                  Container(
                    width: 0.8.sw,
                    alignment: Alignment.center,
                    child: Text(
                      "Tìm Kiếm Bài Viết",
                      style: TextStyle(
                          fontSize: 16.sp,
                          fontWeight: FontWeight.w600,
                          color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              top: 0.07.sh,
              left: 0.05.sw,
              right: 0.05.sw,
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20.r),
                ),
                child: RoundedTextIcon(
                  height: 0.5.sh,
                  width: 1.sw,
                  radius: 20.r,
                  icon: Icons.search,
                  controller: _searchPostPageModel.search,
                  search: _searchPostPageModel.search.text,
                  function: _searchPostPagePresenter.searchPost,
                ),
              ),
            )
          ],
        ),
      );

  @override
  void refreshData(SearchPostPageModel model) {
    setState(() {
      _searchPostPageModel = model;
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
