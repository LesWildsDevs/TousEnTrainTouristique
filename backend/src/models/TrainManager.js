const AbstractManager = require("./AbstractManager");

// Changer le nom de la class par VOTRE_TABLEManager
class TrainManager extends AbstractManager {
  constructor() {
    // Modifier la table en dessous en fonction de votre table en string
    super({ table: "train" });
  }

  // Post train data
  // Partie à modifier en fonction de la table que vous visez
  insert(train) {
    return this.connection.query(
      `insert into ${this.table} (name, train_user_id, area_id, created_on, updated_on, published, description, description_info) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      // Dois correspondre à la table visé au dessus et en dessous,
      // ne pas oublier de verifier que le nombre de ? est egale au nombre de champs dans la base
      [
        train.name,
        train.train_user_id,
        train.area_id,
        train.created_on,
        train.updated_on,
        train.published,
        train.description,
        train.description_info,
      ]
    );
  }

  // update train
  // a changer en fonction de la table visé
  update(train) {
    return this.connection.query(
      `update ${this.table} set name = ?, train_user_id = ?, area_id = ?,
       created_on = ?, updated_on = ?, published = ?, description = ?,
       description_info = ? where id = ?`,
      // Ne Surtout pas oublié l'id en dernier
      [
        train.name,
        train.train_user_id,
        train.area_id,
        train.created_on,
        train.updated_on,
        train.published,
        train.description,
        train.description_info,
        train.id,
      ]
    );
  }

  // Get all data from table train and join between train, image_train and area
  // Fonction ajouter pour avoir toute les données avec les jointures.
  getJoin() {
    return this.connection.query(
      `SELECT t.name AS tname, t.id as id, t.description, t.created_on AS creat, t.updated_on AS updat, a.name AS areaName,      
      JSON_OBJECTAGG(i.id,i.path) AS path, 
      JSON_OBJECTAGG(type.id,type.title) AS types FROM train AS t      
      JOIN image_train AS i ON i.train_id=t.id       
      JOIN area AS a ON a.id=t.area_id       
      JOIN train_type  ON t.id = train_type.train_id       
      LEFT JOIN type ON type.id = train_type.type_id       
      group by t.id;`
    );
  }

  getJoinWithImagesById(id) {
    return this.connection.query(
      `SELECT t.name AS tname, t.id as id, t.description,t.description_info, t.created_on AS creat, t.updated_on AS updat, a.name AS areaName,
      JSON_ARRAYAGG(JSON_OBJECT("id", i.id, "path", i.path, "title", i.title)) AS images   
      FROM train AS t       
      JOIN image_train AS i ON i.train_id=t.id       
      JOIN area AS a ON a.id=t.area_id 
      WHERE t.id = ?          
      GROUP BY t.id;`,
      [id]
    );
  }

  getJoinWithActivityById(id) {
    return this.connection.query(
      `SELECT t.name AS tname, t.id as id, t.description,t.description_info, t.created_on AS creat, t.updated_on AS updat,
      JSON_ARRAYAGG(JSON_OBJECT("id", act.id, "title", act.title, "description", act.description)) AS activity    
      FROM train AS t                  
      JOIN activity AS act  ON t.id = act.train_id
      WHERE t.id = ?       
      GROUP BY t.id;`,
      [id]
    );
  }

  // Un train en particulier avec les jointures
  getJoinById(id) {
    return this.connection.query(
      `SELECT t.name AS tname, t.id as id, t.description,t.description_info, t.created_on AS creat, t.updated_on AS updat, a.name AS areaName,
      JSON_ARRAYAGG(i.path) AS images_path,
      JSON_ARRAYAGG(i.title) AS images_title        
      FROM train AS t       
      JOIN image_train AS i ON i.train_id=t.id       
      JOIN area AS a ON a.id=t.area_id      
      WHERE t.id = ?    
      GROUP BY t.id;`,
      [id]
    );
  }

  getJoinByAreaAndType(area, type) {
    console.warn(`area${area}type :${type}`);
    if (area === "*" && type === "*") {
      return this.connection.query(
        `SELECT * FROM tousentrain.train t
        JOIN train_type type ON type.train_id = t.id ;`,
        [area, type]
      );
    }
    if (area === "*") {
      return this.connection.query(
        `SELECT * FROM tousentrain.train t
        JOIN train_type type ON type.train_id = t.id where type_id = ?;`,
        [area, type]
      );
    }
    if (type === "*") {
      return this.connection.query(
        `SELECT * FROM tousentrain.train t
        JOIN train_type type ON type.train_id = t.id where area_id = ?
        GROUP BY train.id ;`,
        [area, type]
      );
    }
    return this.connection.query(
      `SELECT * FROM tousentrain.train t
      JOIN train_type type ON type.train_id = t.id where area_id = ? and type_id = ?;`,
      [area, type]
    );
  }
}
module.exports = TrainManager;
