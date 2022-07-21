import 'package:capstone_project/components/avatar_name.dart';
import 'package:capstone_project/components/underline_text.dart';
import 'package:capstone_project/entities/account.dart';
import 'package:capstone_project/models/user_profile_page_model.dart';
import 'package:capstone_project/presenters/user_profile_page_presenter.dart';
import 'package:capstone_project/views/user_profile_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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
                          Row(
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Xin chào,',
                                      style: TextStyle(
                                          fontSize: 25.sp,
                                          fontWeight: FontWeight.w600)),
                                  SizedBox(
                                    width: 0.7.sw,
                                    child: Text(
                                      snapshot.data!.accountInfo.username == ''
                                          ? snapshot.data!.email
                                          : snapshot.data!.accountInfo.username,
                                      style: TextStyle(
                                          fontSize: 18.sp,
                                          fontWeight: FontWeight.w500),
                                    ),
                                  ),
                                ],
                              ),
                              AvatarName(
                                  height: 0.08.sh,
                                  width: 0.16.sw,
                                  radius: 35.r,
                                  text:
                                      snapshot.data!.accountInfo.username == ''
                                          ? snapshot.data!.email
                                          : snapshot.data!.accountInfo.username,
                                  fontSize: 25.sp)
                            ],
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
                            height: 0.06.sh,
                          ),
                          UnderlineText(
                            controller: _userProfilePageModel.email,
                            text: 'Email',
                            height: 0.08.sh,
                            width: 1.sw,
                            enabled: false,
                            inputType: TextInputType.emailAddress,
                          ),
                          SizedBox(
                            height: 0.005.sh,
                          ),
                          UnderlineText(
                            controller: _userProfilePageModel.name,
                            text: 'Họ và Tên',
                            height: 0.08.sh,
                            width: 1.sw,
                            enabled: _userProfilePageModel.isEdit,
                            inputType: TextInputType.name,
                          ),
                          SizedBox(
                            height: 0.005.sh,
                          ),
                          UnderlineText(
                            controller: _userProfilePageModel.address,
                            text: 'Địa Chỉ',
                            height: 0.08.sh,
                            width: 1.sw,
                            enabled: _userProfilePageModel.isEdit,
                            inputType: TextInputType.streetAddress,
                          ),
                          SizedBox(
                            height: 0.005.sh,
                          ),
                          UnderlineText(
                            controller: _userProfilePageModel.phone,
                            text: 'Số Điện Thoại',
                            height: 0.08.sh,
                            width: 1.sw,
                            enabled: false,
                            inputType: TextInputType.phone,
                          ),
                          SizedBox(
                            height: 0.005.sh,
                          ),
                          UnderlineText(
                            controller: _userProfilePageModel.identityCard,
                            text: 'CCCD/CMND',
                            height: 0.08.sh,
                            width: 1.sw,
                            enabled: _userProfilePageModel.isEdit,
                            inputType: TextInputType.number,
                          ),
                          SizedBox(
                            height: 0.1.sh,
                          ),
                          Center(
                            child: GestureDetector(
                              onTap: () {
                                onEditUserInfo();
                              },
                              child: Container(
                                height: 0.055.sh,
                                width: 0.55.sw,
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(10.r),
                                  gradient:
                                      const LinearGradient(colors: <Color>[
                                    Color(0xFF56CCF2),
                                    Color(0xFF2F80ED),
                                  ]),
                                ),
                                child: Text(
                                    _userProfilePageModel.isEdit
                                        ? 'Xác Nhận'
                                        : 'Chỉnh Sửa',
                                    style: TextStyle(
                                        fontSize: 16.sp, color: Colors.white)),
                              ),
                            ),
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
}
