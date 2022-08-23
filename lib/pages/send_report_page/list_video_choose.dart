import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ListVideoChoose extends StatelessWidget {
  final List<File> list;
  final Function(int, File) function;
  const ListVideoChoose({Key? key, required this.list, required this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return list.isEmpty
        ? Container()
        : Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 0.01.sh),
                child: Text(
                  'Video',
                  style: TextStyle(fontSize: 12.sp),
                ),
              ),
              SizedBox(
                height: 0.015.sh,
              ),
              Container(
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
                              onTap: () => function(index, list[index]),
                              // onTap: () => sendReportPagePresenter.removeImage(
                              //     index, list[index]),
                              child: Container(
                                height: 0.12.sh,
                                width: 0.24.sw,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                    color: Colors.grey.shade300,
                                    width: 1,
                                  ),
                                ),
                                child: Image.file(
                                  File(list[index].path),
                                  fit: BoxFit.cover,
                                ),
                                // Image.asset(
                                //   'assets/images/video.png',
                                //   fit: BoxFit.cover,
                                // ),
                              ),
                            ),
                            // Text(basename(list[index].path)),
                          ]),
                        );
                      })),
            ],
          );
  }
}
