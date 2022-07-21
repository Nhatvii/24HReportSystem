import 'dart:io';

import 'package:capstone_project/presenters/send_report_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
// import 'package:path/path.dart';

class ListImageChoose extends StatelessWidget {
  final List<File> list;
  final SendReportPagePresenter sendReportPagePresenter;
  const ListImageChoose(
      {Key? key, required this.list, required this.sendReportPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return list.isEmpty
        ? SizedBox(
            height: 0.12.sh,
          )
        : Container(
            height: 0.12.sh,
            width: 1.sw,
            alignment: Alignment.center,
            child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: list.length,
                itemBuilder: (context, index) {
                  return Container(
                    margin: EdgeInsets.only(right: 0.01.sw),
                    child: Column(children: [
                      GestureDetector(
                        onTap: () => sendReportPagePresenter.removeImage(index, list[index]),
                        child: SizedBox(
                          height: 0.12.sh,
                          width: 0.24.sw,
                          child: Image.file(
                            File(list[index].path),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      // Text(basename(list[index].path)),
                    ]),
                  );
                }));
  }
}
