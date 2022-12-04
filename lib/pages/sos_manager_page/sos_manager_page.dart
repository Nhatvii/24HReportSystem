import 'package:capstone_project/models/sos_manager_page_model.dart';
import 'package:capstone_project/pages/sos_manager_page/sos_manager_drawer.dart';
import 'package:capstone_project/pages/sos_manager_page/sos_request_list.dart';
import 'package:capstone_project/presenters/sos_manager_page_presenter.dart';
import 'package:capstone_project/views/sos_manager_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SosManagerPage extends StatefulWidget {
  final String officeId;
  const SosManagerPage({super.key, required this.officeId});

  @override
  State<SosManagerPage> createState() => _SosManagerPageState();
}

class _SosManagerPageState extends State<SosManagerPage>
    implements SosManagerPageView {
  late SosManagerPageModel _sosManagerPageModel;
  late SosManagerPagePresenter _sosManagerPagePresenter;

  @override
  void initState() {
    super.initState();
    _sosManagerPagePresenter = SosManagerPagePresenter(widget.officeId);
    _sosManagerPagePresenter.view = this;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Danh sách yêu cầu hỗ trợ',
          style: TextStyle(fontSize: 16.sp),
        ),
        centerTitle: true,
      ),
      drawer: SizedBox(width: 0.7.sw, child: SosManagerDrawer()),
      body: SafeArea(
        child: Container(
          padding: EdgeInsets.all(0.02.sh),
          child: SosRequestList(sosManagerPageModel: _sosManagerPageModel),
        ),
      ),
    );
  }

  @override
  void refreshData(SosManagerPageModel model) {
    setState(() {
      _sosManagerPageModel = model;
    });
  }
}
