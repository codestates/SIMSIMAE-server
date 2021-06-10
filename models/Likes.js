const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Likes', {
    url_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Url',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Likes',
    timestamps: false,
    indexes: [
      {
        name: "Likes_FK",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "Likes_FK_1",
        using: "BTREE",
        fields: [
          { name: "url_id" },
        ]
      },
    ]
  });
};
