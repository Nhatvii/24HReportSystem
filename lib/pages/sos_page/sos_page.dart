// import 'dart:convert';
// import 'dart:math';

import 'package:flutter/material.dart';
// import 'package:geolocator/geolocator.dart';
// import 'package:mapbox_gl/mapbox_gl.dart';
// import 'package:flutter_dotenv/flutter_dotenv.dart';
// import 'package:http/http.dart' as http;

class SosPage extends StatefulWidget {
  const SosPage({Key? key}) : super(key: key);

  @override
  State<SosPage> createState() => _SosPageState();
}

class _SosPageState extends State<SosPage> {
  // MapboxMapController? mapController;
  // late CameraPosition _cameraPosition;
  // LatLng? latlong;
  // var isLight = true;
  // Symbol? symbol;

  // onMapCreated(MapboxMapController controller) {
  //   mapController = controller;
  //   // SymbolManager(mapController!).selectLayer!.call(Symbol(_id, options));
  // }

  // Future<LatLng> determinePosition() async {
  //   bool serviceEnabled;
  //   LocationPermission permission;
  //   serviceEnabled = await Geolocator.isLocationServiceEnabled();
  //   if (!serviceEnabled) {
  //     return Future.error('Location services are disabled.');
  //   }

  //   permission = await Geolocator.checkPermission();
  //   if (permission == LocationPermission.denied) {
  //     permission = await Geolocator.requestPermission();
  //     if (permission == LocationPermission.denied) {
  //       return Future.error('Location permissions are denied');
  //     }
  //   }

  //   if (permission == LocationPermission.deniedForever) {
  //     return Future.error(
  //         'Location permissions are permanently denied, we cannot request permissions.');
  //   }
  //   Position position = await Geolocator.getCurrentPosition(
  //       desiredAccuracy: LocationAccuracy.best);
  //   print(position);
  //   LatLng currentPosition = LatLng(position.latitude, position.longitude);
  //   latlong = currentPosition;
  //   return currentPosition;
  // }

  // onMapClick(Point point, LatLng latLng) {
  //   print('$point +++++ $latLng');
  //   addSymbol(mapController!, latLng.latitude, latLng.longitude);
  //   getPlaceByLatLng(latLng);
  // }

  // Future getPlaceByLatLng(LatLng latLng) async {
  //   var url = Uri.parse(
  //       "https://rsapi.goong.io/Geocode?latlng=${latLng.latitude}, ${latLng.longitude}&api_key=OUTaRH72cblwU6FbTNit8ioqbULwEtDbeCJq9ZtX");
  //   var response = await http.get(url);

  //   if (response.statusCode == 200) {
  //     var jsonData = jsonDecode(response.body);
  //     // for (var i in jsonData) {
  //     //   print(i);
  //     // }
  //     print(jsonData);
  //   }
  // }

  // void addSymbol(
  //     MapboxMapController mapBoxController, double lat, double lng) async {
  //   if (symbol == null) {
  //     symbol = await mapBoxController.addSymbol(
  //       SymbolOptions(
  //         geometry: LatLng(lat, lng),
  //         iconImage: "assets/images/marker1.png",
  //         iconSize: 0.2,
  //       ),
  //     );
  //   } else {
  //     await mapBoxController.removeSymbol(symbol!).then((value) async {
  //       symbol = await mapBoxController.addSymbol(
  //         SymbolOptions(
  //           geometry: LatLng(lat, lng),
  //           iconImage: "assets/images/marker1.png",
  //           iconSize: 0.2,
  //         ),
  //       );
  //     });
  //   }
  // }

  // @override
  // void initState() {
  //   super.initState();
  //   _cameraPosition = const CameraPosition(target: LatLng(0.0, 0.0), zoom: 18);
  //   var latlnt = determinePosition();
  //   Future.value(latlnt).then(
  //       (value) => _cameraPosition = CameraPosition(target: value, zoom: 18));
  //   MapboxMap.useHybridComposition = false;
  // }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: Center(
        // child: Text('Đang hoàn thiện'),
        child: Image.asset('assets/images/sos_image.jpg'),
      ),
    );
    // return Scaffold(
    //   appBar: AppBar(
    //     title: Text('dadasd'),
    //   ),
    //   bottomNavigationBar: Container(
    //     height: 50,
    //     color: Colors.red,
    //   ),
    //   floatingActionButton: FloatingActionButton(
    //     child: const Icon(Icons.swap_horiz),
    //     onPressed: () async {
    //       print('1');
    //       // determinePosition();
    //       // await Geolocator.getCurrentPosition(
    //       //         desiredAccuracy: LocationAccuracy.high)
    //       //     .then((value) => {print(value)});
    //       // mapController!
    //       //     .animateCamera(CameraUpdate.newCameraPosition(_cameraPosition));
    //     },
    //   ),
    //   floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
    //   body: Stack(
    //     children: [
    //       MapboxMap(
    //         styleString:
    //             // 'https://api.mapbox.com/styles/v1/quanghuy117/cl61w4oqt000715n3txlqlm8o?access_token=pk.eyJ1IjoicXVhbmdodXkxMTciLCJhIjoiY2w2MHZndGNkMXJnaDNqbW9iOXU4ZzVrZCJ9.dLvdaF56MkaEUZlv0wB_xw',
    //             // styleString:
    //             // MapboxStyles.MAPBOX_STREETS,
    //             'https://tiles.goong.io/assets/goong_map_web.json?api_key=XLqQzFQgRrm4HzcMRSQE7c6BzQbjFXLBo5stg87v',
    //         accessToken: dotenv.env['MAPBOX_ACCESS_TOKEN'],
    //         onMapCreated: onMapCreated,
    //         initialCameraPosition: _cameraPosition,
    //         // onStyleLoadedCallback: onStyleLoadedCallback,
    //         myLocationEnabled: true,
    //         myLocationTrackingMode: MyLocationTrackingMode.TrackingGPS,
    //         onMapClick: onMapClick,
    //       ),
    //     ],
    //   ),
    // );
  }
}
