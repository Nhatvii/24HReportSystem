import 'package:capstone_project/pages/main_page/main_page.dart';
import 'package:firebase_core/firebase_core.dart';
// import 'package:firebase_app_check/firebase_app_check.dart';
// import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter/services.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  await dotenv.load(fileName: "assets/config/.env");
  // await FirebaseAppCheck.instance.getToken();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp])
      .then((value) => runApp(const MyApp()));

  // String? token = await FirebaseMessaging.instance.getToken();
  // print(token);
  // // FirebaseMessaging.instance.subscribeToTopic('abc');
  // FirebaseMessaging messaging = FirebaseMessaging.instance;

  // NotificationSettings settings = await messaging.requestPermission(
  //   alert: true,
  //   announcement: false,
  //   badge: true,
  //   carPlay: false,
  //   criticalAlert: false,
  //   provisional: false,
  //   sound: true,
  // );

  // print('User granted permission: ${settings.authorizationStatus}');

  // FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  //   print('Got a message whilst in the foreground!');
  //   print('Message data: ${message.data}');
  //   print('Notification title: ${message.notification!.title}');
  //   print('Notification body: ${message.notification!.body}');

  //   if (message.notification != null) {
  //     print('Message also contained a notification: ${message.notification!.body}');
  //   }
  // });

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      builder: (context, child) => MaterialApp(
        debugShowCheckedModeBanner: false,
        title: '24H Report System',
        theme: ThemeData(
          scaffoldBackgroundColor: Colors.white,
          primarySwatch: Colors.blue,
        ),
        home: child,
      ),
      child: const MainPage(
        page: 0,
      ),
    );
  }
}
