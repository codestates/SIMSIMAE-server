const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(10),
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    phone: {
      type: DataTypes.CHAR(11),
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    age: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    social_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Social',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "User_FK",
        using: "BTREE",
        fields: [
          { name: "social_id" },
        ]
      },
    ]
  });
};
