
import 'package:capstone_project/models/main_page_model.dart';

abstract class MainPageView {
  void refreshData(MainPageModel model);

  void onTabChanged(int position);
}