import 'package:capstone_project/components/icon_and_number.dart';
import 'package:capstone_project/entities/post.dart';
import 'package:capstone_project/models/home_page_model.dart';
import 'package:capstone_project/presenters/home_page_presenter.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class NewPost extends StatelessWidget {
  final Function(Post) function;
  final HomePageModel homePageModel;
  final HomePagePresenter homePagePresenter;
  const NewPost({
    Key? key,
    required this.function,
    required this.homePageModel,
    required this.homePagePresenter,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Post>>(
        future: homePageModel.fetchNewPost,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Container(
              height: 0.43.sh,
              alignment: Alignment.center,
              child: const CircularProgressIndicator(),
            );
          }
          if (snapshot.hasData) {
            if (snapshot.data!.isNotEmpty) {
              return CarouselSlider.builder(
                options: CarouselOptions(
                  autoPlay: true,
                  autoPlayAnimationDuration: const Duration(seconds: 2),
                  padEnds: false,
                  height: 0.43.sh,
                  enableInfiniteScroll: false,
                  viewportFraction: 0.95,
                ),
                itemCount: snapshot.data!.length < 5 ? snapshot.data!.length : 5,
                itemBuilder: (context, index, realIndex) {
                  return newPostSlide(snapshot.data![index], context);
                },
              );
            } else {
              return SizedBox(
                  height: 0.43.sh,
                  child: Center(
                    child: Text(
                      'Không có bài viết nào !!!',
                      style: TextStyle(
                          fontSize: 14.sp, fontWeight: FontWeight.w600),
                    ),
                  ));
            }
          }
          if (snapshot.hasError) {
            return SizedBox(
              height: 0.43.sh,
              child: Center(
                  child: Text(
                'Xảy ra lỗi: Không thể tải được bài viết',
                style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w600),
              )),
            );
          }
          return Container(
            height: 0.43.sh,
          );
        });
  }

  Widget newPostSlide(Post post, BuildContext context) {
    return Container(
      margin: EdgeInsets.only(right: 0.005.sh),
      child: GestureDetector(
        onTap: () => function(post),
        child: Container(
          height: 0.43.sh,
          width: 1.sw,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15.r),
          ),
          child: Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(15.r),
            ),
            elevation: 2,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 0.25.sh,
                  width: 1.sw,
                  child: ClipRRect(
                      borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(15.r),
                          topRight: Radius.circular(15.r)),
                      child: Image.network(
                        post.image,
                        fit: BoxFit.cover,
                      )),
                ),
                Container(
                    padding: EdgeInsets.all(0.015.sh),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Lừa Đảo Qua ${post.category.subCategory}',
                          style: TextStyle(
                              fontSize: 13.sp,
                              color: Colors.grey,
                              fontWeight: FontWeight.w500),
                        ),
                        SizedBox(
                          height: 0.01.sh,
                        ),
                        Text(post.title,
                            overflow: TextOverflow.ellipsis,
                            maxLines: 2,
                            style: TextStyle(
                                fontSize: 16.sp,
                                color: Colors.black,
                                fontWeight: FontWeight.w500)),
                        SizedBox(
                          height: 0.01.sh,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Icon(
                                  Icons.access_time_filled,
                                  color: Colors.blue,
                                  size: 20.sp,
                                ),
                                SizedBox(
                                  width: 0.005.sw,
                                ),
                                Text(
                                  homePageModel.convertToAgo(post.publicTime),
                                  style: TextStyle(
                                      fontSize: 12.sp,
                                      fontWeight: FontWeight.w500,
                                      color: Colors.black),
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                IconAndNumber(
                                    height: 0.03.sh,
                                    width: 0,
                                    icon: Icon(
                                      Icons.thumb_up,
                                      color: Colors.blue,
                                      size: 20.sp,
                                    ),
                                    text: Text(
                                      post.likeCount.toString(),
                                      style: TextStyle(
                                          fontSize: 12.sp,
                                          fontWeight: FontWeight.w500,
                                          color: Colors.black),
                                    )),
                                IconAndNumber(
                                    height: 0.03.sh,
                                    width: 0,
                                    icon: Icon(
                                      Icons.visibility,
                                      color: Colors.blue,
                                      size: 20.sp,
                                    ),
                                    text: Text(
                                      post.viewCount.toString(),
                                      style: TextStyle(
                                          fontSize: 12.sp,
                                          fontWeight: FontWeight.w500,
                                          color: Colors.black),
                                    )),
                              ],
                            ),
                          ],
                        ),
                      ],
                    )),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
