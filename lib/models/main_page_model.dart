import 'package:capstone_project/pages/home_page/home_page.dart';
import 'package:capstone_project/pages/post_saved_page/post_saved_page.dart';
import 'package:capstone_project/pages/send_report_page/send_report_page.dart';
import 'package:capstone_project/pages/sos_page/sos_page.dart';
import 'package:flutter/material.dart';

class MainPageModel {
  late int countpage;
  late final List<Widget> pages;

  MainPageModel(int page) {
    countpage = page;
    pages = [
      const HomePage(),
      const SendReportPage(),
      const SosPage(),
      const SavedPostPage(),
    ];
  }
}
