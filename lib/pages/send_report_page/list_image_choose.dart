import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
// import 'package:path/path.dart';

class ListImageChoose extends StatelessWidget {
  final List<File> list;
  final Function(int, File) function;
  const ListImageChoose(
      {Key? key,
      required this.list,
      required this.function})
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
                  'Hình ảnh',
                  style: TextStyle(fontSize: 12.sp),
                ),
              ),
              SizedBox(
                height: 0.015.sh,
              ),
              Container(
                width: 1.sw,
                // color: Colors.red,
                constraints: BoxConstraints(
                  minHeight: 0.13.sh,
                ),
                child: GridView.builder(
                    padding: EdgeInsets.all(0.005.sh),
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: list.length,
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 4,
                        crossAxisSpacing: 0.002.sh,
                        mainAxisSpacing: 0.008.sh),
                    itemBuilder: (context, index) {
                      return Container(
                        margin: EdgeInsets.only(right: 0.005.sh),
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.grey.shade300,
                            width: 1,
                          ),
                        ),
                        child: GestureDetector(
                          onTap: () => function(index, list[index]),
                          child: SizedBox(
                            height: 0.12.sh,
                            width: 0.24.sw,
                            child: Image.file(
                              File(list[index].path),
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      );
                    }),
              ),
            ],
          );
    // Container(
    //     height: 0.12.sh,
    //     width: 0.5.sw,
    //     alignment: Alignment.center,
    //     child: ListView.builder(
    //         scrollDirection: Axis.horizontal,
    //         itemCount: list.length,
    //         itemBuilder: (context, index) {
    //           return Container(
    //             margin: EdgeInsets.only(right: 0.01.sw),
    //             child: Column(children: [
    //               GestureDetector(
    //                 onTap: () => sendReportPagePresenter.removeImage(index, list[index]),
    //                 child: SizedBox(
    //                   height: 0.12.sh,
    //                   width: 0.24.sw,
    //                   child: Image.file(
    //                     File(list[index].path),
    //                     fit: BoxFit.cover,
    //                   ),
    //                 ),
    //               ),
    //               // Text(basename(list[index].path)),
    //             ]),
    //           );
    //         }));
  }
}
