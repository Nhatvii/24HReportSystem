class Role {
    Role({
      required this.roleId,
      required this.roleName,
    });

    int roleId;
    String roleName;

    factory Role.fromJson(Map<String, dynamic> json) => Role(
        roleId: json["roleId"],
        roleName: json["roleName"],
    );

    Map<String, dynamic> toJson() => {
        "roleId": roleId,
        "roleName": roleName,
    };
}
