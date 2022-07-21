
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/home_page_model.dart';

abstract class HomePageView {

  void refreshData(HomePageModel model);

  void onTapTagCategory(int categoryID, int index);

  void navigateToSearchPage(String search);

  void navigateToDetailPage(Post post);

  void navigateToLoginPage();

  void navigateToProfilePage();

  void navigateToReportSendHistoryPage();

  void navigateToSeeMoreNewPostPage();

  void navigateToSeeMorePopularPostPage();

  void logOut();

  void openDrawer();
}