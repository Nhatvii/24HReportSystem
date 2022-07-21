import 'package:capstone_project/components/avatar_name.dart';
import 'package:capstone_project/components/list_tile_drawer.dart';
import 'package:capstone_project/models/home_page_model.dart';
import 'package:capstone_project/presenters/home_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class NavigationDrawer extends StatelessWidget {
  final HomePageModel homePageModel;
  final HomePagePresenter homePagePresenter;
  final Function navigateToProfilePage;
  final Function navigateToReportSendHistoryPage;
  final Function navigateToLoginPage;
  const NavigationDrawer({
    Key? key,
    required this.homePageModel,
    required this.homePagePresenter,
    required this.navigateToProfilePage,
    required this.navigateToReportSendHistoryPage,
    required this.navigateToLoginPage,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SingleChildScrollView(
        child: Column(
          children: [
            homePageModel.email != null
                ? loginHeader(context)
                : notLoginHeader(context),
            homePageModel.email != null
                ? loginDrawer(context)
                : notLoginDrawer(context),
          ],
        ),
      ),
    );
  }

  Widget notLoginHeader(BuildContext context) {
    return UserAccountsDrawerHeader(
      currentAccountPicture: AvatarName(
        height: 0.008.sh,
        width: 0.016.sw,
        radius: 35.r,
        text: 'User',
        fontSize: 22.sp,
      ),
      accountName: Text(
        'User',
        style: TextStyle(
          fontSize: 16.sp,
          color: Colors.white,
        ),
      ),
      accountEmail: Text(
        'user@gmail.com',
        style: TextStyle(
          fontSize: 14.sp,
          color: Colors.white,
        ),
      ),
      decoration: const BoxDecoration(
        gradient: LinearGradient(begin: Alignment.centerLeft, colors: <Color>[
          Color(0xFF56CCF2),
          Color(0xFF2F80ED),
        ]),
      ),
    );
  }

  Widget loginHeader(BuildContext context) {
    return UserAccountsDrawerHeader(
      currentAccountPicture: AvatarName(
        height: 0.008.sh,
        width: 0.016.sw,
        radius: 35.r,
        text: homePageModel.name == null
            ? homePageModel.email!
            : homePageModel.name!,
        fontSize: 22.sp,
      ),
      accountName: Text(
        homePageModel.name ?? '',
        style: TextStyle(
          fontSize: 16.sp,
          color: Colors.white,
        ),
      ),
      accountEmail: Text(
        homePageModel.email!,
        style: TextStyle(
          fontSize: 14.sp,
          color: Colors.white,
        ),
      ),
      decoration: const BoxDecoration(
        gradient: LinearGradient(begin: Alignment.centerLeft, colors: <Color>[
          Color(0xFF56CCF2),
          Color(0xFF2F80ED),
        ]),
      ),
    );
  }

  Widget loginDrawer(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 0.001.sh),
      child: Wrap(
        runSpacing: 0.01.sh,
        children: [
          ListTileDrawer(
            icon: Icon(
              Icons.person,
              size: 22.sp,
            ),
            text: Text(
              'Thông tin cá nhân',
              style: TextStyle(fontSize: 14.sp),
            ),
            function: () => navigateToProfilePage(),
          ),
          Divider(
            color: Colors.grey.shade300,
            thickness: 1,
          ),
          ListTileDrawer(
              icon: Icon(
                FontAwesomeIcons.clipboardList,
                size: 20.sp,
              ),
              text: Text(
                'Báo cáo đã gửi',
                style: TextStyle(fontSize: 14.sp),
              ),
              function: () => navigateToReportSendHistoryPage()),
          Divider(
            color: Colors.grey.shade300,
            thickness: 1,
          ),
          SizedBox(
            height: 0.015.sh,
          ),
          Divider(
            color: Colors.grey.shade300,
            thickness: 1,
          ),
          ListTileDrawer(
              icon: Icon(Icons.logout, size: 22.sp),
              text: Text(
                'Đăng xuất',
                style: TextStyle(fontSize: 14.sp, color: Colors.red),
              ),
              function: homePagePresenter.logOut),
        ],
      ),
    );
  }

  Widget notLoginDrawer(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 0.001.sh),
      child: Wrap(
        runSpacing: 0.01.sh,
        children: [
          ListTileDrawer(
              icon: Icon(Icons.login, size: 22.sp),
              text: Text(
                'Đăng Nhập',
                style: TextStyle(fontSize: 14.sp),
              ),
              function: () => navigateToLoginPage()),
          Divider(
            color: Colors.grey.shade300,
            thickness: 1,
          )
        ],
      ),
    );
  }
}
