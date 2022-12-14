/* eslint-disable no-unused-expressions */
const models = require("../models");

// Le trainController sert à faire la liaision avec le AbstractManager et le TrainManager.

const getAll = (req, res) => {
  models.train
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Fonction ajouter pour utiliser la nouvelle fonction getJoin du fichier TrainManager.
const getAllJoin = (req, res) => {
  models.train
    .getJoin()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

/* affichage de tout les trains côté admin */
const getAllJoinAdmin = (req, res) => {
  models.train
    .getJoinAdmin()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Tous les trains avec la région et les images
const getAllJoinWithImagesById = (req, res) => {
  models.train
    .getJoinWithImagesById(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Tous les trains avec les activités
const getAllJoinWithActivitiesById = (req, res) => {
  models.train
    .getJoinWithActivityById(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.send("no content").status(204);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.train
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readJoinAdminById = (req, res) => {
  models.train
    .getJoinAdminById(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readJoin = (req, res) => {
  models.train
    .getJoinById(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// Controller permettant à l'utilisateur le fitrage des trains par areas et types
const readWithAreaAndId = (req, res) => {
  models.train
    .getJoinByAreaAndType(req.params.area, req.params.type)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const train = req.body;

  // TODO validations (length, format...)

  train.id = parseInt(req.params.id, 10);

  models.train
    .update(train)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const update = (req, res) => {
  const train = req.body;

  // TODO validations (length, format...)
  train.id = parseInt(req.params.id, 10);

  models.train.update(train).then(([result]) => {
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
  models.train
    .deleteTypes(train.id)
    .then(() => {
      for (let i = 0; i < train.types.length; i += 1) {
        models.train.insertTypes(train.id, train.types[i].value);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const train = req.body;

  // TODO validations (length, format...)

  models.train
    // 1: insertion du train dans la table train
    .insert(train)
    .then(([result]) => {
      res
        .location(`/train/${result.insertId}`)
        .status(201)
        .send(`${result.insertId}`);
      // 2: insertion des types dans la table de jointure train_type
      train.types &&
        train.types.map((type) =>
          models.train.insertTypes(`${result.insertId}`, type.value)
        );
      // 3: insertion de l'image dans la table image_train
      models.train.insertImage(`${result.insertId}`, train.image);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.train
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  models.train.deleteTypes(req.params.id);
};

module.exports = {
  getAll,
  getAllJoin,
  getAllJoinAdmin,
  getAllJoinWithImagesById,
  getAllJoinWithActivitiesById,
  read,
  update,
  readJoin,
  readWithAreaAndId,
  readJoinAdminById,
  edit,
  add,
  destroy,
};
