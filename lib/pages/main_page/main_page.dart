// // ignore_for_file: prefer_const_constructors, non_constant_identifier_names

import 'package:capstone_project/models/main_page_model.dart';
import 'package:capstone_project/presenters/main_page_presenter.dart';
import 'package:capstone_project/views/main_page_view.dart';
import 'package:fancy_bottom_navigation/fancy_bottom_navigation.dart';
import 'package:flutter/material.dart';

class MainPage extends StatefulWidget {
  final int page;
  const MainPage({Key? key, required this.page}) : super(key: key);

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> implements MainPageView {
  late MainPagePresenter _mainPagePresenter;
  late MainPageModel _mainPageModel;

  @override
  void initState() {
    super.initState();
    _mainPagePresenter = MainPagePresenter(widget.page);
    _mainPagePresenter.view = this;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: _mainPageModel.pages[_mainPageModel.countpage],
        bottomNavigationBar: bottomNavigationCustom(),
        extendBody: true,
      ),
    );
  }

  bottomNavigationCustom() {
    return FancyBottomNavigation(
        inactiveIconColor: Colors.black,
        textColor: Theme.of(context).primaryColor,
        tabs: [
          TabData(iconData: Icons.home, title: "Trang Chủ"),
          TabData(iconData: Icons.add_card, title: "Gửi Đơn"),
          TabData(iconData: Icons.emergency, title: "SOS"),
          TabData(iconData: Icons.bookmark, title: "Đã Lưu"),
        ],
        onTabChangedListener: (position) {
          setState(() {
            onTabChanged(position);
          });
        });
  }

  @override
  void onTabChanged(int position) {
    _mainPagePresenter.onTabChanged(position);
  }

  @override
  void refreshData(MainPageModel model) {
    setState(() {
      _mainPageModel = model;
    });
  }
}
