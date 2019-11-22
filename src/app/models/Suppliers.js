import Sequelize, { Model } from 'sequelize';

class Supplier extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        address: Sequelize.STRING,
        price: Sequelize.DECIMAL(10, 2),
        capacity: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Schedules);
  }
}

export default Supplier;
