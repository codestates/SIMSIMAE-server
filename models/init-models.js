var DataTypes = require("sequelize").DataTypes;
var _Admin = require("./Admin");
var _Category = require("./Category");
var _Dislikes = require("./Dislikes");
var _Likes = require("./Likes");
var _Social = require("./Social");
var _Url = require("./Url");
var _User = require("./User");
var _user_category = require("./user_category");

function initModels(sequelize) {
  var Admin = _Admin(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var Dislikes = _Dislikes(sequelize, DataTypes);
  var Likes = _Likes(sequelize, DataTypes);
  var Social = _Social(sequelize, DataTypes);
  var Url = _Url(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var user_category = _user_category(sequelize, DataTypes);

  Url.belongsTo(Category, { as: "category", foreignKey: "category_id"});
  Category.hasMany(Url, { as: "Urls", foreignKey: "category_id"});
  user_category.belongsTo(Category, { as: "category", foreignKey: "category_id"});
  Category.hasMany(user_category, { as: "user_categories", foreignKey: "category_id"});
  User.belongsTo(Social, { as: "social", foreignKey: "social_id"});
  Social.hasMany(User, { as: "Users", foreignKey: "social_id"});
  Dislikes.belongsTo(Url, { as: "url", foreignKey: "url_id"});
  Url.hasMany(Dislikes, { as: "Dislikes", foreignKey: "url_id"});
  Likes.belongsTo(Url, { as: "url", foreignKey: "url_id"});
  Url.hasMany(Likes, { as: "Likes", foreignKey: "url_id"});
  Dislikes.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Dislikes, { as: "Dislikes", foreignKey: "user_id"});
  Likes.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Likes, { as: "Likes", foreignKey: "user_id"});
  user_category.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(user_category, { as: "user_categories", foreignKey: "user_id"});

  return {
    Admin,
    Category,
    Dislikes,
    Likes,
    Social,
    Url,
    User,
    user_category,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
