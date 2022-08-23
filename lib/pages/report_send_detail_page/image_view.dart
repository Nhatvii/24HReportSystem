import 'package:capstone_project/entities/report_detail.dart';
import 'package:flutter/material.dart';
import 'package:photo_view/photo_view.dart';
import 'package:photo_view/photo_view_gallery.dart';

class ImageViewPage extends StatefulWidget {
  final PageController pageController;
  final List<ReportDetail> listImages;
  final int index;
  ImageViewPage({Key? key, required this.listImages, required this.index})
      : pageController = PageController(initialPage: index),
        super(key: key);

  @override
  State<ImageViewPage> createState() => _ImageViewPageState();
}

class _ImageViewPageState extends State<ImageViewPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: PhotoViewGallery.builder(
            pageController: widget.pageController,
            scrollDirection: Axis.horizontal,
            itemCount: widget.listImages.length,
            builder: (context, index) {
              return PhotoViewGalleryPageOptions(
                imageProvider: NetworkImage(widget.listImages[index].media),
                minScale: PhotoViewComputedScale.contained,
                maxScale: PhotoViewComputedScale.contained * 4,
              );
            }),
      ),
    );
  }
}
