import 'package:capstone_project/models/user_profile_page_model.dart';
import 'package:capstone_project/views/user_profile_page_view.dart';
import 'package:flutter/material.dart';

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

  Future<void> init() async {
    await _userProfilePageModel.init();
    _userProfilePageView.refreshData(_userProfilePageModel);
  }

  void onEditUserInfo(BuildContext context) {
    if (_userProfilePageModel.email.text.trim().isEmpty) {
      _userProfilePageModel.msg = 'Vui lòng cập nhật email';
      _userProfilePageView.showToast(_userProfilePageModel.msg!);
      _userProfilePageView.refreshData(_userProfilePageModel);
    } else {
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
                        _userProfilePageModel.accountApi
                            .getAccountInfo()
                            .then((value) {
                      _userProfilePageModel.email.text = value.email;
                      _userProfilePageModel.name.text =
                          value.accountInfo.fullname;
                      _userProfilePageModel.phone.text = value.phoneNumber;
                      _userProfilePageModel.address.text =
                          value.accountInfo.address;
                      _userProfilePageModel.identityCard.text =
                          value.accountInfo.identityCard;
                      return value;
                    }),
                    _userProfilePageModel.isEdit =
                        !_userProfilePageModel.isEdit,
                    _userProfilePageModel.msg = 'Cập nhật thành công',
                    _userProfilePageView.showToast(_userProfilePageModel.msg!),
                    _userProfilePageView.refreshData(_userProfilePageModel),
                  }
                else
                  {
                    _userProfilePageModel.msg = value['error']['message'],
                    _userProfilePageView.showToast(_userProfilePageModel.msg!),
                    _userProfilePageView.refreshData(_userProfilePageModel),
                  }
              });
    }
  }

  void onClickEditInfo() {
    _userProfilePageModel.isEdit = true;
    _userProfilePageView.refreshData(_userProfilePageModel);
  }

  void onCancelEdit() {
    _userProfilePageModel.fetchAccountUser =
        _userProfilePageModel.accountApi.getAccountInfo().then((value) {
      _userProfilePageModel.email.text = value.email;
      _userProfilePageModel.name.text = value.accountInfo.fullname;
      _userProfilePageModel.phone.text = value.phoneNumber;
      _userProfilePageModel.address.text = value.accountInfo.address;
      _userProfilePageModel.identityCard.text = value.accountInfo.identityCard;
      return value;
    });
    _userProfilePageModel.isEdit = false;
    _userProfilePageView.refreshData(_userProfilePageModel);
  }

  void onChangeNewPassword() async {
    if (_userProfilePageModel.oldPassword.text.trim().isEmpty ||
        _userProfilePageModel.newPassword.text.trim().isEmpty) {
      _userProfilePageModel.msg = 'Vui lòng điền mật khẩu';
      _userProfilePageView.showToast(_userProfilePageModel.msg!);
      _userProfilePageView.refreshData(_userProfilePageModel);
    } else if (_userProfilePageModel.newPassword.text.trim().length < 6) {
      _userProfilePageModel.msg = "Mật khẩu phải có ít nhất 6 kí tự";
      _userProfilePageView.showToast(_userProfilePageModel.msg!);
      _userProfilePageView.refreshData(_userProfilePageModel);
    } else {
      _userProfilePageModel.accountApi
          .updateNewPassword(
              _userProfilePageModel.userPrefs.getAccountId()!,
              _userProfilePageModel.oldPassword.text,
              _userProfilePageModel.newPassword.text)
          .then((value) => {
                if (value['error'] == null)
                  {
                    _userProfilePageModel.oldPassword.clear(),
                    _userProfilePageModel.newPassword.clear(),
                    _userProfilePageView.showToast('Cập nhật thành công'),
                    _userProfilePageView.refreshData(_userProfilePageModel),
                  }
                else
                  {
                    _userProfilePageModel.msg = 'Sai mật khẩu cũ',
                    _userProfilePageView.showToast(_userProfilePageModel.msg!),
                    _userProfilePageView.refreshData(_userProfilePageModel),
                  }
              });
    }
  }

  void showPass(int check) {
    if (check == 1) {
      _userProfilePageModel.showOldPass = !_userProfilePageModel.showOldPass;
      _userProfilePageView.refreshData(_userProfilePageModel);
    } else {
      _userProfilePageModel.showNewPass = !_userProfilePageModel.showNewPass;
      _userProfilePageView.refreshData(_userProfilePageModel);
    }
  }
}
