import Sequelize, { Model } from 'sequelize';

class Schedule extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        final_price: Sequelize.DECIMAL(10, 2),
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Supplier, {
      foreignKey: 'supplier_id',
      as: 'supplier',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default Schedule;
