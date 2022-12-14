const AbstractManager = require("./AbstractManager");

// Changer le nom de la class par VOTRE_TABLEManager
class ReviewManager extends AbstractManager {
  constructor() {
    // Modifier la table en dessous en fonction de votre table en string
    super({ table: "review" });
  }

  // Tous les commentaires (avec jointures)
  findAllJoin() {
    return this.connection
      .query(`SELECT r.id review_id, r.review_comment comment, r.review_note note, r.created_on created_on, r.updated_on updated_on, r.published published, 
    u.name user_name, t.name train_name FROM review r
    JOIN user u ON u.id = r.review_user_id
    JOIN train t on t.id = r.review_train_id;`);
  }

  // Un commentaire en particulier (avec jointures)
  findJoinById(id) {
    return this.connection.query(
      `SELECT  r.review_user_id user_id, r.review_train_id train_id, r.id review_id, r.review_comment comment, r.review_note note, r.created_on created_on, r.updated_on updated_on, r.published published, 
    u.name user_name, t.name train_name FROM review r
    JOIN user u ON u.id = r.review_user_id
    JOIN train t on t.id = r.review_train_id where r.id = ?`,
      [id]
    );
  }

  // Tous les commentaires publiés
  findAllPublished() {
    return this.connection.query(
      `select * from  ${this.table} where published=1`
    );
  }

  // Tous les commentaires publiés (avec jointures)
  findAllJoinPublished() {
    return this.connection.query(
      `SELECT r.id review_id, r.review_comment comment, r.review_note note, r.created_on created_on, r.updated_on updated_on, r.published published, 
    u.name user_name, t.name train_name FROM review r
    JOIN user u ON u.id = r.review_user_id
    JOIN train t on t.id = r.review_train_id where r.published=1;`
    );
  }

  // Tous les commentaires non publiés
  findAllNotPublished() {
    return this.connection.query(
      `select * from  ${this.table} where published=0;`
    );
  }

  // Tous les commentaires non publiés (avec jointures)
  findAllJoinNotPublished() {
    return this.connection.query(
      `SELECT r.id review_id, r.review_comment comment, r.review_note note, r.created_on created_on, r.updated_on updated_on, r.published published, 
    u.name user_name, t.name train_name FROM review r
    JOIN user u ON u.id = r.review_user_id
    JOIN train t on t.id = r.review_train_id where r.published=0;`
    );
  }

  // Tous les commentaires d'un train en particulier
  findAllPublishedByTrainId(id) {
    return this.connection.query(
      `select * from  ${this.table} where review_train_id = ? and published = 1`,
      [id]
    );
  }

  // Tous les commentaires d'un train en particulier (avec jointures)
  findAllJoinPublishedByTrainId(id) {
    return this.connection.query(
      `SELECT r.id review_id, r.review_comment comment, r.review_note note, r.created_on created_on, r.updated_on updated_on, r.published published, 
    u.name user_name, t.name train_name FROM review r
    JOIN user u ON u.id = r.review_user_id
    JOIN train t on t.id = r.review_train_id where r.review_train_id = ? and r.published=1;`,
      [id]
    );
  }

  findNote(trainId) {
    return this.connection.query(
      `SELECT avg(review_note) as note FROM review WHERE review_train_id= ?;`,
      [trainId]
    );
  }

  // Partie à modifier en fonction de la table que vous visez

  // Ajouter un commentaire
  insert(review) {
    return this.connection.query(
      `insert into ${this.table} (review_user_id, review_train_id, review_note, review_comment, created_on, updated_on, published) values (?, ?, ?, ?, ?, ?, ?)`,
      // Dois correspondre à la table visé au dessus et en dessous,
      // ne pas oublier de verifier que le nombre de ? est egale au nombre de champs dans la base
      [
        review.review_user_id,
        review.review_train_id,
        review.review_note,
        review.review_comment,
        review.created_on,
        review.updated_on,
        review.published,
      ]
    );
  }

  // a changer en fonction de la table visé

  // Modifier un commentaire
  update(review) {
    return this.connection.query(
      `update ${this.table} set review_user_id = ?, review_train_id = ?, review_note = ?, review_comment = ?,
       created_on = ?, updated_on = ?, published = ? where id = ?`,
      // Ne Surtout pas oublié l'id en dernier
      [
        review.review_user_id,
        review.review_train_id,
        review.review_note,
        review.review_comment,
        review.created_on,
        review.updated_on,
        review.published,
        review.id,
      ]
    );
  }

  // Modifier un commentaire
  updateReview(review) {
    return this.connection.query(
      `update ${this.table} set review_user_id = ?, review_train_id = ?, review_note = ?, review_comment = ?, updated_on = ?, published = ? where id = ?`,
      // Ne Surtout pas oublié l'id en dernier
      [
        review.review_user_id,
        review.review_train_id,
        review.review_note,
        review.review_comment,
        review.updated_on,
        review.published,
        review.id,
      ]
    );
  }
}

module.exports = ReviewManager;
