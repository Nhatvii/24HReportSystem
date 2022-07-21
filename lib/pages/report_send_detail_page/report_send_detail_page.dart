import 'package:capstone_project/models/report_send_detail_page_model.dart';
import 'package:capstone_project/pages/report_send_detail_page/report_send_info_detail_part.dart';
import 'package:capstone_project/presenters/report_send_detail_page_presenter.dart';
import 'package:capstone_project/views/report_send_detail_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ReportSendDetailPage extends StatefulWidget {
  final String reportId;
  const ReportSendDetailPage({Key? key, required this.reportId})
      : super(key: key);

  @override
  State<ReportSendDetailPage> createState() => _ReportSendDetailPageState();
}

class _ReportSendDetailPageState extends State<ReportSendDetailPage>
    implements ReportSendDetailPageView {
  late ReportSendDetailPageModel _reportSendDetailPageModel;
  late ReportSendDetailPagePresenter _reportSendDetailPagePresenter;

  @override
  void initState() {
    super.initState();
    _reportSendDetailPagePresenter =
        ReportSendDetailPagePresenter(widget.reportId);
    _reportSendDetailPagePresenter.view = this;
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
            'Chi Tiết Báo Cáo',
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
        body: Padding(
          padding: EdgeInsets.all(0.02.sh),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 5.h,
                ),
                ReportSendInfoDetailPart(
                    reportSendDetailPageModel: _reportSendDetailPageModel),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void refreshData(ReportSendDetailPageModel model) {
    setState(() {
      _reportSendDetailPageModel = model;
    });
  }
}
