import { DataTypes, Model } from 'sequelize';
import { db } from '../sequelize.config.js';

export default class AccountInstance extends Model {}

AccountInstance.init(
  {
    idAccount: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idState: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  },
  {
    sequelize: db,
    tableName: 'account',
    timestamps: true,
  },
);

//  Relationships region

// ProductInstance.hasOne(productOwnerInstance, { foreignKey: 'idProductOwner' });
// productOwnerInstance.belongsTo(ProductInstance);
