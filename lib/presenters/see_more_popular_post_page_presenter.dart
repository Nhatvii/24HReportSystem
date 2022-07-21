import 'package:capstone_project/entities/category.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/see_more_popular_post_page_model.dart';
import 'package:capstone_project/views/see_more_popular_post_page_view.dart';

class SeeMorePopularPostPagePresenter {
  late SeeMorePopularPostPageModel _seeMorePopularPostPageModel;
  late SeeMorePopularPostPageView _seeMorePopularPostPageView;

  SeeMorePopularPostPagePresenter(
      int categoryId, List<Category> list, int newCheckIndex) {
    _seeMorePopularPostPageModel =
        SeeMorePopularPostPageModel(categoryId, list, newCheckIndex);
  }

  set view(SeeMorePopularPostPageView view) {
    _seeMorePopularPostPageView = view;
    _seeMorePopularPostPageView.refreshData(_seeMorePopularPostPageModel);
  }

  void checkTagCate(int index) {
    _seeMorePopularPostPageModel.listSelectedTag.add(false);
    if (index == _seeMorePopularPostPageModel.checkIndex) {
      _seeMorePopularPostPageModel.listSelectedTag[index] = true;
    } else if (index != _seeMorePopularPostPageModel.checkIndex) {
      _seeMorePopularPostPageModel.listSelectedTag[index] = false;
    }
  }

  void onTapTagCategory(int categoryID, int index) {
    _seeMorePopularPostPageModel.checkIndex = index;
    _seeMorePopularPostPageModel.fetchPopularPost =
        _seeMorePopularPostPageModel.postApi.getListPopularPost(categoryID);
    _seeMorePopularPostPageView.refreshData(_seeMorePopularPostPageModel);
  }

  void onNavigateDetailPage(Post post) {
    _seeMorePopularPostPageView.onNavigateDetailPage(post);
  }
}
