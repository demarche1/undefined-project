module.exports = class UserModel {
  id;
  email;
  name;
  age;
  city;
  zip_code;
  password;
  constructor(userInfo) {
    Object.assign(this, userInfo);
    this.id = userInfo._id.toHexString();
    Reflect.deleteProperty(this, "_id");
  }
};