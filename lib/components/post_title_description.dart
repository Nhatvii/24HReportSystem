import 'package:capstone_project/entities/post.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class PostTitleDescription extends StatelessWidget {
  final Post post;
  final Function(Post) function;
  const PostTitleDescription(
      {Key? key, required this.post, required this.function})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 0.01.sh),
      height: 0.185.sh,
      width: 1.sw,
      child: GestureDetector(
        onTap: () => function(post),
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.r),
          ),
          elevation: 2,
          child: Row(
            children: [
              Container(
                  margin: EdgeInsets.only(right: 0.007.sh),
                  height: 0.185.sh,
                  width: 0.31.sw,
                  child: ClipRRect(
                    borderRadius:
                        BorderRadius.horizontal(left: Radius.circular(10.r)),
                    child: Image.network(
                      post.image,
                      fit: BoxFit.cover,
                    ),
                  )),
              Container(
                padding: EdgeInsets.all(0.008.sh),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    SizedBox(
                        height: 0.05.sh,
                        width: 0.55.sw,
                        child: Text(
                          post.title,
                          overflow: TextOverflow.ellipsis,
                          maxLines: 2,
                          style: TextStyle(
                              fontSize: 15.sp, fontWeight: FontWeight.w700),
                        )),
                    SizedBox(
                      height: 0.09.sh,
                      width: 0.55.sw,
                      child: Text(
                        post.subTitle,
                        overflow: TextOverflow.ellipsis,
                        maxLines: 4,
                        style: TextStyle(
                          fontSize: 12.sp,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
