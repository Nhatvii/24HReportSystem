import 'package:capstone_project/models/user_profile_page_model.dart';
import 'package:flutter/material.dart';

abstract class UserProfilePageView {
  void refreshData(UserProfilePageModel model);

  void onEditUserInfo();

  void onClickEditInfo();

  void onCancelEdit();

  void showSnackBar(String msg, BuildContext context);

  void showToast(String msg);
}
