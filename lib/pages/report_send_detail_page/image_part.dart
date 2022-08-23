import 'package:capstone_project/entities/report_detail.dart';
import 'package:capstone_project/models/report_send_detail_page_model.dart';
import 'package:capstone_project/pages/report_send_detail_page/image_view.dart';
import 'package:capstone_project/presenters/report_send_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ImagePart extends StatelessWidget {
  final ReportSendDetailPageModel reportSendDetailPageModel;
  final ReportSendDetailPagePresenter reportSendDetailPagePresenter;
  const ImagePart(
      {Key? key,
      required this.reportSendDetailPageModel,
      required this.reportSendDetailPagePresenter})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(left: 0.01.sh),
          child: Text(
            'Hình ảnh',
            style: TextStyle(fontSize: 13.sp, fontWeight: FontWeight.w500),
          ),
        ),
        SizedBox(
          height: 0.01.sh,
        ),
        FutureBuilder<List<ReportDetail>>(
            future: reportSendDetailPageModel.fetchListImage,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const SizedBox(
                  child: Center(
                    child: CircularProgressIndicator(),
                  ),
                );
              }
              if (snapshot.hasData) {
                if (snapshot.data!.isNotEmpty) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: EdgeInsets.all(0.002.sh),
                        width: 1.sw,
                        constraints: BoxConstraints(
                          minHeight: 0.13.sh,
                        ),
                        child: GridView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount:
                                reportSendDetailPageModel.listImages.length,
                            gridDelegate:
                                SliverGridDelegateWithFixedCrossAxisCount(
                                    crossAxisCount: 4,
                                    crossAxisSpacing: 0.008.sh,
                                    mainAxisSpacing: 0.005.sw),
                            itemBuilder: (context, index) {
                              return GestureDetector(
                                onTap: () {
                                  Navigator.of(context).push(MaterialPageRoute(
                                      builder: (_) => ImageViewPage(
                                            listImages:
                                                reportSendDetailPageModel
                                                    .listImages,
                                            index: index,
                                          )));
                                },
                                child: SizedBox(
                                  height: 0.012.sh,
                                  width: 0.025.sw,
                                  child: Image.network(
                                    reportSendDetailPageModel
                                        .listImages[index].media,
                                    fit: BoxFit.cover,
                                    loadingBuilder: (BuildContext context,
                                        Widget child,
                                        ImageChunkEvent? loadingProgress) {
                                      if (loadingProgress == null) return child;
                                      return Center(
                                        child: CircularProgressIndicator(
                                          value: loadingProgress
                                                      .expectedTotalBytes !=
                                                  null
                                              ? loadingProgress
                                                      .cumulativeBytesLoaded /
                                                  loadingProgress
                                                      .expectedTotalBytes!
                                              : null,
                                        ),
                                      );
                                    },
                                  ),
                                ),
                              );
                            }),
                      ),
                    ],
                  );
                } else {
                  return Center(
                      child: Text(
                    'Không có hình ảnh',
                    style: TextStyle(fontSize: 12.sp),
                  ));
                }
              }
              return Container();
            }),
      ],
    );
  }
}
