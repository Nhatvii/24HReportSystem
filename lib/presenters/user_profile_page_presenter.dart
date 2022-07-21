import 'package:capstone_project/models/user_profile_page_model.dart';
import 'package:capstone_project/views/user_profile_page_view.dart';
import 'package:flutter/cupertino.dart';

class UserProfilePagePresenter {
  late UserProfilePageModel _userProfilePageModel;
  late UserProfilePageView _userProfilePageView;

  UserProfilePagePresenter() {
    _userProfilePageModel = UserProfilePageModel();
  }

  set view(UserProfilePageView view) {
    _userProfilePageView = view;
    _userProfilePageView.refreshData(_userProfilePageModel);
  }

  void onEditUserInfo(BuildContext context) {
    if (_userProfilePageModel.isEdit == true) {
      _userProfilePageModel.accountApi
          .updateUserInfo(
              _userProfilePageModel.email.text.trim(),
              _userProfilePageModel.name.text.trim(),
              _userProfilePageModel.address.text.trim(),
              _userProfilePageModel.phone.text.trim(),
              _userProfilePageModel.identityCard.text.trim())
          .then((value) => {
                if (value['error'] == null)
                  {
                    _userProfilePageModel.fetchAccountUser =
                        _userProfilePageModel.accountApi.getAccountInfo(),
                    _userProfilePageModel.isEdit =
                        !_userProfilePageModel.isEdit,
                    _userProfilePageModel.msg = 'Cập nhật thành công',
                    _userProfilePageView.showSnackBar(
                        _userProfilePageModel.msg!, context),
                    _userProfilePageView.refreshData(_userProfilePageModel),
                  }
                else
                  {
                    _userProfilePageModel.msg = 'Cập nhật không thành công',
                    _userProfilePageView.showSnackBar(
                        _userProfilePageModel.msg!, context),
                    _userProfilePageView.refreshData(_userProfilePageModel),
                  }
              });
    } else {
      _userProfilePageModel.isEdit = !_userProfilePageModel.isEdit;
      _userProfilePageView.refreshData(_userProfilePageModel);
    }
  }
}
