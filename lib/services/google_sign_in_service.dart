import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shared_preferences/shared_preferences.dart';

class GoogleServices {
  Future<UserCredential> signInWithGoogle() async {
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();

    final GoogleSignInAuthentication? googleAuth =
        await googleUser?.authentication;

    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('email', googleUser!.email);
    prefs.setString('username', googleUser.displayName ?? '');
    return await FirebaseAuth.instance.signInWithCredential(credential);
  }

  Future signOut() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await FirebaseAuth.instance.signOut();
    prefs.remove('email');
    prefs.remove('username');
    await GoogleSignIn().signOut();
  }
}
