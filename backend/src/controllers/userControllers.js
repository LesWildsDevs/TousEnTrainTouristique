/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
const models = require("../models");

const getAll = (req, res) => {
  console.warn(req);
  models.user
    .getAllUser()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .getUserFromId(req.params.id)
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

const getUserToUpdate = (req, res) => {
  models.user
    .getUserFromIdToUpdate(req.params.id)
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

const edit = (req, res) => {
  const user = req.body;
  const id = parseInt(req.params.id, 10);

  if (req.payload.sub !== id) {
    res.sendStatus(403);
    console.warn("user not autorised");
  } else {
    models.user
      .update(user, id)
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
  }
};
const postUser = (req, res) => {
  const user = req.body;

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err.code);
      err.code === "ER_DUP_ENTRY" ? res.sendStatus(409) : res.sendStatus(500);
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { mail } = req.body;
  models.user
    .getAllUserFromMail(mail)
    .then(([users]) => {
      if (users[0] == null) {
        res.sendStatus(404);
      } else {
        req.user = users[0];
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
// updatePassword

const getUserByEmail = (req, res, next) => {
  const { mail } = req.body;
  models.user
    .getAllUserFromMail(mail)
    .then(([users]) => {
      if (users[0] == null) {
        res.sendStatus(404);
      } else {
        req.user = users[0];
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUserForChangePassword = (req, res) => {
  const user = req.body;
  const id = req.payload.sub;
  models.user
    .updatePassword(user, id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.send("success");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (req.payload.sub !== id && req.payload.userRight === 0) {
    res.sendStatus(403);
    console.warn("user not autorised");
  } else {
    models.user
      .delete(req.params.id)
      .then(([result]) => {
        console.warn(result.affectedRows);
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
  }
};

module.exports = {
  getAll,
  read,
  getUserToUpdate,
  edit,
  postUser,
  getUserByEmailWithPasswordAndPassToNext,
  getUserByEmail,
  updateUserForChangePassword,
  deleteUser,
};
