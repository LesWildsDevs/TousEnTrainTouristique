const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  getAllUser() {
    return this.connection.query(
      `SELECT name, mail, user_right, created_on, updated_on from ${this.table}`
    );
  }

  getUserFromId(id) {
    return this.connection.query(
      `SELECT name, mail, user_right, created_on, updated_on FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  getUserFromIdToUpdate(id) {
    return this.connection.query(
      `SELECT name, mail FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  getAllUserFromMail(mail) {
    return this.connection.query(
      `SELECT id, name, hashedPassword, mail, user_right, created_on, updated_on FROM ${this.table} WHERE mail = ?`,
      [mail]
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (name, hashedPassword, mail, user_right, created_on, updated_on) values ( ?, ?, ?, ?, ?, ?)`,
      [
        user.name,
        user.hashedPassword,
        user.mail,
        user.user_right,
        user.created_on,
        user.updated_on,
      ]
    );
  }

  update(user, id) {
    return this.connection.query(
      `update ${this.table} set name = ?, mail = ?, updated_on = ? where id = ?`,
      [user.name, user.mail, user.updated_on, id]
    );
  }

  updatePassword(user, id) {
    return this.connection.query(
      `update ${this.table} set hashedPassword = ? where id = ?`,
      [user.hashedPassword, id]
    );
  }
}
module.exports = UserManager;
