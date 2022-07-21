// ignore_for_file: use_rethrow_when_possible

import 'dart:io';
import 'package:firebase_storage/firebase_storage.dart';

class FirebaseApi {
  FirebaseStorage storage = FirebaseStorage.instance;

  UploadTask uploadFile(String destination, File file) {
    try {
      final ref = storage.ref().child(destination);
      return ref.putFile(file);
    } on FirebaseException catch (e) {
      throw ('Exception: ------ $e');
    }
  }

  Future<void> deleteFile(String destination) async {
    await storage.ref().child(destination).delete();
  }
}
