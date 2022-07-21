import 'package:capstone_project/models/search_post_page_model.dart';
import 'package:capstone_project/views/search_post_page_view.dart';

class SearchPostPagePresenter {
  late SearchPostPageModel _searchPostPageModel;
  late SearchPostPageView _searchPostPageView;

  SearchPostPagePresenter(String searchText) {
    _searchPostPageModel = SearchPostPageModel(searchText);
  }

  set view(SearchPostPageView view) {
    _searchPostPageView = view;
    _searchPostPageView.refreshData(_searchPostPageModel);
  }

  searchPost(String search) {
    _searchPostPageModel.search.text = search;
    _searchPostPageModel.fetchListPostBySearchText =
        _searchPostPageModel.postApi.getListPostBySearchText(search);
    _searchPostPageView.refreshData(_searchPostPageModel);
  }
}
