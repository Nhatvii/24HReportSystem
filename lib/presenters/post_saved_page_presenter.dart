import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/post_saved_page_model.dart';
import 'package:capstone_project/views/post_saved_page_view.dart';

class PostSavedPagePresenter {
  late PostSavedPageView _postSavedPageView;
  late PostSavedPageModel _postSavedPageModel;

  PostSavedPagePresenter() {
    _postSavedPageModel = PostSavedPageModel();
  }

  set view(PostSavedPageView view) {
    _postSavedPageView = view;
    _postSavedPageView.refreshData(_postSavedPageModel);
  }

  void onNavigateToDetailPage(Post post) {
    _postSavedPageView.navigateToDetailPage(post);
  }
}
