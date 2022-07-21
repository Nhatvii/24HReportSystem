import 'package:capstone_project/models/post_detail_page_model.dart';
import 'package:capstone_project/presenters/post_detail_page_presenter.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BottomShareSheet extends StatelessWidget {
  final PostDetailPagePresenter postDetailPagePresenter;
  final String title;
  final String postId;
  const BottomShareSheet(
      {Key? key,
      required this.postDetailPagePresenter,
      required this.title,
      required this.postId})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 0.15.sh,
      width: 1.sw,
      padding: EdgeInsets.symmetric(horizontal: 0.02.sw, vertical: 0.02.sh),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(15.r)),
      ),
      child: Column(
        children: [
          Container(
            height: 0.03.sh,
            width: 1.sw,
            alignment: Alignment.center,
            child: Text(
              'Chia Sẻ Qua',
              style: TextStyle(fontSize: 14.sp),
            ),
          ),
          SizedBox(
            height: 0.02.sh,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              GestureDetector(
                  onTap: () {
                    Navigator.pop(context);
                    postDetailPagePresenter.onSharePostClicked(
                        title, postId, Share.facebook);
                  },
                  child: Icon(
                    FontAwesomeIcons.facebook,
                    size: 25.sp,
                    color: Colors.blue,
                  )),
              SizedBox(
                width: 0.05.sw,
              ),
              GestureDetector(
                onTap: () {
                  Navigator.pop(context);
                  postDetailPagePresenter.onSharePostClicked(
                      title, postId, Share.twitter);
                },
                child: Icon(
                  FontAwesomeIcons.twitter,
                  size: 25.sp,
                  color: Colors.blue,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
