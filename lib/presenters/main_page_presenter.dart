import 'package:capstone_project/models/main_page_model.dart';
import 'package:capstone_project/views/main_page_view.dart';

class MainPagePresenter {
  late MainPageModel _mainPageModel;
  late MainPageView _mainPageView;

  MainPagePresenter(int page) {
    _mainPageModel = MainPageModel(page);
  }

  set view(MainPageView view) {
    _mainPageView = view;
    _mainPageView.refreshData(_mainPageModel);
  }

  void onTabChanged(int position) {
    _mainPageModel.countpage = position;
  }
}