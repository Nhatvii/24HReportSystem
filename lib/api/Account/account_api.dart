import 'dart:convert';

import 'package:capstone_project/constants/constants.dart';
import 'package:capstone_project/entities/account.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AccountApi {
  Constants constants = Constants();

  // Login API
  Future signIn(String accountText, String pass) async {
    var url = Uri.parse('${constants.localhost}/Account/Login');
    var response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "account": accountText,
        "password": pass,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      if (jsonData['error'] == null && jsonData['role']['roleId'] == 1) {
        SharedPreferences prefs = await SharedPreferences.getInstance();
        prefs.setString('email', jsonData['email']);
        if (jsonData['accountInfo']['username'] != null) {
          prefs.setString('username', jsonData['accountInfo']['username']);
        }
      }
      return jsonData;
    }
  }

  // Sign Up API
  Future signUp(String email, String pass, String phone) async {
    var url = Uri.parse('${constants.localhost}/Account/Register');
    var response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "email": email,
        "password": pass,
        "roleId": 1,
        "phoneNumber": phone,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString('email', jsonData['email']);
      return jsonData;
    }
  }

  // Check Account Exist API
  Future checkAccount(String email, String phone) async {
    var url = Uri.parse(
        '${constants.localhost}/Account/CheckAccountRegister?email=$email&phoneNumber=$phone');
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    }
  }

  // Get Account Info API
  Future<Account> getAccountInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var emailCheck = prefs.getString('email');
    var url = Uri.parse(
        "${constants.localhost}/Account/GetAccount/?email=$emailCheck");
    var response = await http.get(url);

    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);

      Account account = Account.fromJson(jsonData);
      return account;
    } else {
      throw Exception('Unable to Get User Info');
    }
  }

  // Update User Info API
  Future updateUserInfo(String email, String name, String address, String phone,
      String identityCard) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var url = Uri.parse('${constants.localhost}/Account');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "email": email,
        "phoneNumber": phone,
        "username": name,
        "address": address,
        "identityCard": identityCard,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      print(jsonData);
      prefs.setString('username', name);
      return jsonData;
    } else {
      throw Exception('Unable to Update User Info');
    }
  }

  Future checkUserAuthen(String email) async {
    var url = Uri.parse('${constants.localhost}/Account');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "email": email,
        "isAuthen": true,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    } else {
      throw Exception('Unable to Update account Authen');
    }
  }
}
