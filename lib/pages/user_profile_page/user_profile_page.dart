import 'package:capstone_project/components/avatar_name.dart';
import 'package:capstone_project/entities/account.dart';
import 'package:capstone_project/models/user_profile_page_model.dart';
import 'package:capstone_project/pages/user_profile_page/edit_form_part.dart';
import 'package:capstone_project/pages/user_profile_page/view_form_part.dart';
import 'package:capstone_project/presenters/user_profile_page_presenter.dart';
import 'package:capstone_project/views/user_profile_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';

class UserProfilePage extends StatefulWidget {
  const UserProfilePage({Key? key}) : super(key: key);

  @override
  State<UserProfilePage> createState() => _UserProfilePageState();
}

class _UserProfilePageState extends State<UserProfilePage>
    implements UserProfilePageView {
  late UserProfilePageModel _userProfilePageModel;
  late UserProfilePagePresenter _userProfilePagePresenter;

  @override
  void initState() {
    super.initState();
    _userProfilePagePresenter = UserProfilePagePresenter();
    _userProfilePagePresenter.view = this;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          leading: Padding(
            padding: EdgeInsets.only(left: 0.02.sh),
            child: GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Icon(
                  Icons.arrow_back_ios,
                  size: 22.sp,
                )),
          ),
          title: Text(
            'Thông Tin Cá Nhân',
            style: TextStyle(fontSize: 16.sp, fontWeight: FontWeight.w700),
          ),
          centerTitle: true,
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(colors: <Color>[
                Color(0xFF56CCF2),
                Color(0xFF2F80ED),
              ]),
            ),
          ),
        ),
        body: SingleChildScrollView(
          child: Container(
            padding: EdgeInsets.all(0.02.sh),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                FutureBuilder<Account>(
                  future: _userProfilePageModel.fetchAccountUser,
                  builder: (context, snapshot) {
                    if (snapshot.hasError) {
                      print(snapshot.error);
                    }
                    if (snapshot.hasData) {
                      return Column(
                        children: [
                          SizedBox(
                            height: 0.05.sh,
                          ),
                          AvatarName(
                              height: 0.08.sh,
                              width: 0.16.sw,
                              radius: 35.r,
                              text: snapshot.data!.accountInfo.username,
                              fontSize: 25.sp),
                          SizedBox(
                            height: 0.01.sh,
                          ),
                          Text('Xin chào,',
                              style: TextStyle(
                                  fontSize: 16.sp,
                                  fontWeight: FontWeight.w600)),
                          SizedBox(
                            width: 0.7.sw,
                            child: Center(
                              child: Text(
                                snapshot.data!.accountInfo.username == ''
                                    ? snapshot.data!.email
                                    : snapshot.data!.accountInfo.username,
                                style: TextStyle(
                                    fontSize: 22.sp,
                                    fontWeight: FontWeight.w500),
                              ),
                            ),
                          ),
                          SizedBox(
                            height: 0.02.sh,
                          ),
                          Divider(
                            color: Colors.grey.shade300,
                            thickness: 1,
                            indent: 0.05.sw,
                            endIndent: 0.05.sw,
                          ),
                          SizedBox(
                            height: 0.04.sh,
                          ),
                          _userProfilePageModel.isEdit
                              ? EditFormPart(
                                  userProfilePageModel: _userProfilePageModel,
                                  editFunction: onEditUserInfo,
                                  cancelEditFunction: onCancelEdit,
                                )
                              : ViewFormPart(
                                  userProfilePageModel: _userProfilePageModel,
                                  isEditFunction: onClickEditInfo,
                                ),
                        ],
                      );
                    }
                    return Container();
                  },
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  refreshData(UserProfilePageModel model) {
    setState(() {
      _userProfilePageModel = model;
    });
  }

  @override
  void onEditUserInfo() {
    _userProfilePagePresenter.onEditUserInfo(context);
  }

  @override
  void showSnackBar(String msg, BuildContext context) {
    final snackBar = SnackBar(
      content: Text(
        msg,
        style: TextStyle(fontSize: 11.sp),
      ),
      backgroundColor: Colors.blue,
      duration: const Duration(seconds: 2),
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  @override
  void onCancelEdit() {
    _userProfilePagePresenter.onCancelEdit();
  }

  @override
  void onClickEditInfo() {
    _userProfilePagePresenter.onClickEditInfo();
  }

  @override
  void showToast(String msg) {
    Fluttertoast.showToast(
      msg: msg,
      gravity: ToastGravity.BOTTOM,
    );
  }
}
