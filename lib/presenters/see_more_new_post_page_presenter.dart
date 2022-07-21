import 'package:capstone_project/entities/category.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/see_more_new_post_page_model.dart';
import 'package:capstone_project/views/see_more_new_post_page_view.dart';

class SeeMoreNewPostPagePresenter {
  late SeeMoreNewPostPageModel _seeMoreNewPostPageModel;
  late SeeMoreNewPostPageView _seeMoreNewPostPageView;

  SeeMoreNewPostPagePresenter(
      int categoryId, List<Category> list, int checkIndex) {
    _seeMoreNewPostPageModel =
        SeeMoreNewPostPageModel(categoryId, list, checkIndex);
  }

  set view(SeeMoreNewPostPageView view) {
    _seeMoreNewPostPageView = view;
    _seeMoreNewPostPageView.refreshData(_seeMoreNewPostPageModel);
  }

  void checkTagCate(int index) {
    _seeMoreNewPostPageModel.listSelectedTag.add(false);
    if (index == _seeMoreNewPostPageModel.checkIndex) {
      _seeMoreNewPostPageModel.listSelectedTag[index] = true;
    } else if (index != _seeMoreNewPostPageModel.checkIndex) {
      _seeMoreNewPostPageModel.listSelectedTag[index] = false;
    }
  }

  void onTapTagCategory(int categoryID, int index) {
    _seeMoreNewPostPageModel.checkIndex = index;
    _seeMoreNewPostPageModel.fetchNewPost =
        _seeMoreNewPostPageModel.postApi.getListNewPost(categoryID);
    _seeMoreNewPostPageView.refreshData(_seeMoreNewPostPageModel);
  }

  void onNavigateDetailPage(Post post) {
    _seeMoreNewPostPageView.onNavigateDetailPage(post);
  }
}
