import 'package:capstone_project/entities/report.dart';
import 'package:capstone_project/models/report_send_history_page_model.dart';
import 'package:capstone_project/pages/report_send_detail_page/report_send_detail_page.dart';
import 'package:capstone_project/pages/report_send_history_page/report_card_part.dart';
import 'package:capstone_project/presenters/report_send_history_page_presenter.dart';
import 'package:capstone_project/views/report_send_history_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ReportSendHistoryPage extends StatefulWidget {
  const ReportSendHistoryPage({Key? key}) : super(key: key);

  @override
  State<ReportSendHistoryPage> createState() => _ReportSendHistoryPageState();
}

class _ReportSendHistoryPageState extends State<ReportSendHistoryPage>
    implements ReportSendHistoryPageView {
  late ReportSendHistoryPageModel _reportSendHistoryPageModel;
  late ReportSendHistoryPagePresenter _reportSendHistoryPagePresenter;

  @override
  void initState() {
    super.initState();
    _reportSendHistoryPagePresenter = ReportSendHistoryPagePresenter();
    _reportSendHistoryPagePresenter.view = this;
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
            'Báo Cáo Đã Gửi',
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
        body: FutureBuilder<List<Report>>(
          future: _reportSendHistoryPageModel.fetchListReport,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return SizedBox(
                height: 0.9.sh,
                width: 1.sw,
                child: const Center(
                  child: CircularProgressIndicator(),
                ),
              );
            }
            if (snapshot.hasData) {
              return Container(
                padding: EdgeInsets.only(
                    top: 0.02.sh, left: 0.02.sh, right: 0.02.sh),
                height: 0.9.sh,
                width: 1.sw,
                child: ListView.builder(
                  itemBuilder: (context, index) {
                    return ReportCardPart(
                      report: snapshot.data![index],
                      function: navigateToReportDetailPage,
                    );
                  },
                  itemCount: snapshot.data!.length,
                ),
              );
            }
            if (snapshot.hasError) {
              print(snapshot.error);
            }
            return Container();
          },
        ),
      ),
    );
  }

  @override
  void refreshData(ReportSendHistoryPageModel model) {
    setState(() {
      _reportSendHistoryPageModel = model;
    });
  }

  @override
  void navigateToReportDetailPage(String reportId) {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: ((context) => ReportSendDetailPage(
                  reportId: reportId,
                ))));
  }
}
