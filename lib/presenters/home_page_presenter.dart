import 'package:capstone_project/models/home_page_model.dart';
import 'package:capstone_project/views/home_page_view.dart';
import 'package:firebase_auth/firebase_auth.dart';

class HomePagePresenter {
  late HomePageModel _homePageModel;
  late HomePageView _homePageView;

  HomePagePresenter() {
    _homePageModel = HomePageModel();
  }

  set view(HomePageView view) {
    _homePageView = view;
    _homePageView.refreshData(_homePageModel);
  }

  void checkTagCate(int index) {
    _homePageModel.listSelectedTag.add(false);
    if (index == _homePageModel.checkIndex) {
      _homePageModel.listSelectedTag[index] = true;
    } else if (index != _homePageModel.checkIndex) {
      _homePageModel.listSelectedTag[index] = false;
    }
  }

  Future<void> init() async {
    await _homePageModel.init();
    _homePageView.refreshData(_homePageModel);
  }

  void onTapTagCategory(int categoryID, int index) {
    _homePageModel.checkIndex = index;
    _homePageModel.getPostById(categoryID);
    _homePageView.refreshData(_homePageModel);
  }

  void logOut() async {
    if (FirebaseAuth.instance.currentUser != null) {
      _homePageModel.googleServices.signOut().whenComplete(() async {
        await _homePageModel.userPrefs.logOut();
        _homePageView.logOut();
      });
    } else {
      await _homePageModel.userPrefs.logOut();
      _homePageView.logOut();
    }
  }

  void openDrawer() {
    _homePageModel.scaffoldKey.currentState!.openDrawer();
  }

  void onClickToSosPage() {
    if (_homePageModel.userPrefs.getAccountId() != null) {
      _homePageView.navigateToUserSosRequestPage();
    } else {
      _homePageView.showLoginDialog();
    }
  }
}
