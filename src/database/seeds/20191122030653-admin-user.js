const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          name: 'Administrador',
          email: 'admin@admin.com',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: () => {},
};
