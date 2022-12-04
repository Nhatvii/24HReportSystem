class AccountInfo {
  AccountInfo({
    required this.fullname,
    required this.address,
    required this.identityCard,
    // required this.isAuthen,
  });
  String fullname;
  String address;
  String identityCard;
  // bool isAuthen;

  factory AccountInfo.fromJson(Map<String, dynamic> json) => AccountInfo(
        fullname: json["fullname"] ?? '',
        address: json["address"] ?? '',
        identityCard: json["identityCard"] ?? '',
        // isAuthen: json["isAuthen"] ?? false,
      );

  Map<String, dynamic> toJson() => {
        "fullname": fullname,
        "address": address,
        "identityCard": identityCard,
        // "isAuthen": isAuthen,
      };
}
