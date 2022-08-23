import 'package:audioplayers/audioplayers.dart';
import 'package:capstone_project/models/report_send_detail_page_model.dart';
import 'package:capstone_project/views/report_send_detail_page_view.dart';
import 'package:chewie/chewie.dart';
import 'package:video_player/video_player.dart';

class ReportSendDetailPagePresenter {
  late ReportSendDetailPageModel _reportSendDetailPageModel;
  late ReportSendDetailPageView _reportSendDetailPageView;

  ReportSendDetailPagePresenter(String reportId) {
    _reportSendDetailPageModel = ReportSendDetailPageModel(reportId);
  }

  set view(ReportSendDetailPageView view) {
    _reportSendDetailPageView = view;
    _reportSendDetailPageView.refreshData(_reportSendDetailPageModel);
  }

  Future init(String reportId) async {
    await _reportSendDetailPageModel.init(reportId);

    _reportSendDetailPageModel.audioPlayer.onPlayerStateChanged.listen((state) {
      _reportSendDetailPageModel.isPlaying = state == PlayerState.playing;
      _reportSendDetailPageView.refreshData(_reportSendDetailPageModel);
    });

    _reportSendDetailPageModel.audioPlayer.onPlayerComplete.listen((event) {
      _reportSendDetailPageModel.isPlaying = false;
      _reportSendDetailPageView.refreshData(_reportSendDetailPageModel);
    });

    _reportSendDetailPageModel.audioPlayer.onDurationChanged
        .listen((newDuration) {
      _reportSendDetailPageModel.duration = newDuration;
      _reportSendDetailPageView.refreshData(_reportSendDetailPageModel);
    });

    _reportSendDetailPageModel.audioPlayer.onPositionChanged
        .listen((newDuration) {
      _reportSendDetailPageModel.position = newDuration;
      _reportSendDetailPageView.refreshData(_reportSendDetailPageModel);
    });
  }

  void dispose() async {
    _reportSendDetailPageModel.controller!.dispose();
    _reportSendDetailPageModel.chewieController!.dispose();
    _reportSendDetailPageModel.audioPlayer.dispose();
  }

  void watchVideo(String url) {
    if (_reportSendDetailPageModel.controller!.value.isInitialized) {
      _reportSendDetailPageModel.controller!.dispose().whenComplete(() {
        _reportSendDetailPageModel
            .controller = VideoPlayerController.network(url)
          ..addListener(() =>
              _reportSendDetailPageView.refreshData(_reportSendDetailPageModel))
          ..initialize().then((_) {
            _reportSendDetailPageModel.controller!.initialize();
            _reportSendDetailPageModel.chewieController = ChewieController(
              videoPlayerController: _reportSendDetailPageModel.controller!,
            );
          });
      });
    } else {
      _reportSendDetailPageModel.controller = VideoPlayerController.network(url)
        ..addListener(() =>
            _reportSendDetailPageView.refreshData(_reportSendDetailPageModel))
        ..initialize().then((_) {
          _reportSendDetailPageModel.controller!.initialize();
          _reportSendDetailPageModel.chewieController = ChewieController(
            videoPlayerController: _reportSendDetailPageModel.controller!,
          );
        });
    }
  }

  void playOrPauseVideo() {
    _reportSendDetailPageModel.controller!.value.isPlaying
        ? _reportSendDetailPageModel.controller!.pause()
        : _reportSendDetailPageModel.controller!.play();
  }

  playAudio() async {
    if (_reportSendDetailPageModel.isPlaying) {
      await _reportSendDetailPageModel.audioPlayer.pause();
    } else {
      try {
        await _reportSendDetailPageModel.audioPlayer.play(
            UrlSource(_reportSendDetailPageModel.recordUrl!),
            volume: 0.25);
      } catch (e) {
        // _reportSendDetailPageView.showToast('Không có file để chạy');
        print(e);
      }
    }
  }

  playAudioInAnySecond(double value) async {
    final position = Duration(seconds: value.toInt());
    await _reportSendDetailPageModel.audioPlayer.seek(position);

    await _reportSendDetailPageModel.audioPlayer.resume();
  }
}
