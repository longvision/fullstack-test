import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Supplier from '../app/models/Supplier';
import Schedule from '../app/models/Schedule';
import User from '../app/models/User';

const models = [User, Supplier, Schedule];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection, Sequelize.DataTypes))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
