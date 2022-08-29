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
        prefs.setString('accountId', jsonData['accountId']);
        if (jsonData['email'] != null) {
          prefs.setString('email', jsonData['email']);
        } else {
          prefs.setString('phone', jsonData['phoneNumber']);
        }
        prefs.setString('username', jsonData['accountInfo']['username']);
      }
      return jsonData;
    }
  }

  // Login with Google
  Future signInGoogle(String email) async {
    var url = Uri.parse(
        "${constants.localhost}/Account/LoginWithGoogle?email=$email");
    var response = await http.post(url);

    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      if (jsonData['error'] == null && jsonData['role']['roleId'] == 1) {
        SharedPreferences prefs = await SharedPreferences.getInstance();
        prefs.setString('accountId', jsonData['accountId']);
        if (jsonData['email'] != null) {
          prefs.setString('email', jsonData['email']);
        } else {
          prefs.setString('phone', jsonData['phoneNumber']);
        }
        prefs.setString('username', jsonData['accountInfo']['username']);
      }
      return jsonData;
    } else {
      throw Exception('Unable to Login with Google');
    }
  }

  // Sign Up API
  Future signUp(String pass, String phone, String name) async {
    var url = Uri.parse('${constants.localhost}/Account/Register');
    // Map<String, dynamic> tmp;
    // if (email.isEmpty) {
    //   tmp = {
    //     "password": pass,
    //     "roleId": 1,
    //     "phoneNumber": phone,
    //     "username": name,
    //   };
    // } else {
    //   tmp = {
    //     "email": email,
    //     "password": pass,
    //     "roleId": 1,
    //     "username": name,
    //   };
    // }
    var response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(
          // tmp
          {
            "password": pass,
            "roleId": 1,
            "phoneNumber": phone,
            "username": name,
          }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      if (jsonData['error'] == null) {
        SharedPreferences prefs = await SharedPreferences.getInstance();
        prefs.setString('accountId', jsonData['accountId']);
        if (jsonData['email'] != null) {
          prefs.setString('email', jsonData['email']);
        } else {
          prefs.setString('phone', jsonData['phoneNumber']);
        }
        prefs.setString('username', jsonData['accountInfo']['username']);
      }
      return jsonData;
    }
  }

  // Check Account Exist API
  Future checkAccount(String phone) async {
    var url = Uri.parse(
        '${constants.localhost}/Account/CheckAccountRegister?phoneNumber=$phone');
    var response = await http.get(url);
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      return jsonData;
    }
  }

  // Get Account Info API
  Future<Account> getAccountInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var accountId = prefs.getString('accountId');
    var url = Uri.parse(
        "${constants.localhost}/Account/GetAccount/?UserId=$accountId");
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
    var accountId = prefs.getString('accountId');
    var url = Uri.parse('${constants.localhost}/Account');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "accountID": accountId,
        "email": email,
        "phoneNumber": phone,
        "username": name,
        "address": address.isEmpty ? null : address,
        "identityCard": identityCard.isEmpty ? null : identityCard,
      }),
    );
    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      prefs.setString('email', email);
      prefs.setString('username', name);
      return jsonData;
    } else {
      throw Exception('Unable to Update User Info');
    }
  }

  Future checkUserAuthen(String accountId) async {
    var url = Uri.parse(
        '${constants.localhost}/Account/UpdateAccountAuthen?accountID=$accountId');
    var response = await http.put(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        "accountID": accountId,
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
