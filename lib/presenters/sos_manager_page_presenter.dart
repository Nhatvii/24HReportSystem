import 'package:capstone_project/models/sos_manager_page_model.dart';
import 'package:capstone_project/views/sos_manager_page_view.dart';

class SosManagerPagePresenter {
  late SosManagerPageModel _sosManagerPageModel;
  late SosManagerPageView _sosManagerPageView;

  SosManagerPagePresenter(String officeId) {
    _sosManagerPageModel = SosManagerPageModel(officeId);
  }

  set view(SosManagerPageView view) {
    _sosManagerPageView = view;
    _sosManagerPageView.refreshData(_sosManagerPageModel);
  }
}
