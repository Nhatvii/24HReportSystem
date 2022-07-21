class AccountInfo {
  AccountInfo({
    required this.username,
    required this.address,
    required this.identityCard,
    required this.isAuthen,
  });
  String username;
  String address;
  String identityCard;
  bool isAuthen;

  factory AccountInfo.fromJson(Map<String, dynamic> json) => AccountInfo(
        username: json["username"] ?? '',
        address: json["address"] ?? '',
        identityCard: json["identityCard"] ?? '',
        isAuthen: json["isAuthen"] ?? false,
      );

  Map<String, dynamic> toJson() => {
        "username": username,
        "address": address,
        "identityCard": identityCard,
        "isAuthen": isAuthen,
      };
}
