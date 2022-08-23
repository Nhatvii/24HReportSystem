import 'dart:io';

import 'package:audioplayers/audioplayers.dart';
import 'package:capstone_project/api/Report/report_api.dart';
import 'package:capstone_project/api/Report_Detail/report_detail_api.dart';
import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/report.dart';
import 'package:capstone_project/entities/report_detail.dart';
import 'package:chewie/chewie.dart';
import 'package:video_player/video_player.dart';
import 'package:video_thumbnail/video_thumbnail.dart';

class ReportSendDetailPageModel {
  late Future<Report> fetchReportDetail;
  late Future<List<ReportDetail>> fetchListImage;
  late Future<List<ReportDetail>> fetchListVideo;
  late Future<List<ReportDetail>> fetchListRecord;
  late bool isPlaying;
  String? recordUrl;
  Constants constants = Constants();
  ReportApi reportApi = ReportApi();
  ReportDetailApi reportDetailApi = ReportDetailApi();
  VideoPlayerController? controller;
  ChewieController? chewieController;
  late List<Map<dynamic, String>> listVideos;
  late List<ReportDetail> listImages;
  final audioPlayer = AudioPlayer();
  late Duration duration;
  late Duration position;

  ReportSendDetailPageModel(String reportId) {
    fetchReportDetail = reportApi.getReportDetail(reportId);
    fetchListImage = Future.delayed(const Duration(hours: 24), () => []);
    fetchListVideo = Future.delayed(const Duration(hours: 24), () => []);
    fetchListRecord = Future.delayed(const Duration(hours: 24), () => []);
    isPlaying = false;
    controller = VideoPlayerController.network('');
    chewieController = ChewieController(videoPlayerController: controller!);
    listVideos = [];
    listImages = [];
    duration = Duration.zero;
    position = Duration.zero;
  }

  Future init(String reportId) async {
    fetchListImage = reportDetailApi
        .getListImageByReportId(reportId)
        .then((value) => listImages = value);
    fetchListRecord =
        reportDetailApi.getListRecordByReportId(reportId).then((value) {
      if (value.isNotEmpty) {
        recordUrl = value[0].media;
      } else {
        recordUrl = '';
      }
      return value;
    });
    fetchListVideo = reportDetailApi
        .getListVideoByReportId(reportId)
        .then((listReport) async {
      if (listReport.isNotEmpty) {
        await generateThumbnailVideo(listReport[0].media).then((value) {
          Map<dynamic, String> map = {
            'url': listReport[0].media,
            'file': value.path,
          };
          listVideos.add(map);
        });
        if (listReport.length > 1) {
          await generateThumbnailVideo(listReport[1].media).then((value) {
            Map<dynamic, String> map = {
              'url': listReport[1].media,
              'file': value.path,
            };
            listVideos.add(map);
          });
        }
      }
      return listReport;
    });
  }

  Future<File> generateThumbnailVideo(String url) async {
    final fileNames = await VideoThumbnail.thumbnailFile(
      video: url,
      // thumbnailPath: (await getTemporaryDirectory()).path,
      imageFormat: ImageFormat.WEBP,
      quality: 75,
    );
    File videoFile = File(fileNames!);
    return videoFile;
  }

  String twoDigits(int num) {
    return num.toString().padLeft(2, '0');
  }

  String formatTime(Duration duration) {
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));

    return '$minutes:$seconds';
  }
}
