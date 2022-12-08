const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { mailRecover } = require("./sendEmail");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};
// Fonction de hashage du mot de passe
const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      // stock le hashed password dans le req.body
      req.body.hashedPassword = hashedPassword;
      // Pour la sécurité efface le mot de passe non haché
      delete req.body.password;
      next();
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

// Fonction de verification du mot de passe
const verifyPassword = (req, res) => {
  argon2
    // Verifie que le hashed password correspond au mot de passe envoyé
    .verify(req.user.hashedPassword, req.body.password)
    // Continue si verifié
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.id,
          user: req.user.name,
          userRight: req.user.user_right,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
// Verifie que le token à bien été generer par le back
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }
    // Récupère le type d'authorization et le token qui suis.
    const [type, token] = authorizationHeader.split(" ");
    // Si le token n'est pas de type Bearer, ça ne continue pas.
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }
    // Vérifie que le token a été écrit par le back
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const verifyAdmin = (req, res, next) => {
  try {
    if (req.payload.userRight === 0) {
      throw new Error("Access denied");
    }
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

// Fonction de creation du token spécial pour reset le password
const modifyPassword = (req, res) => {
  const payload = { sub: req.user.id, reset: "reset" };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  // Envoie du mail avec différente info
  const message = { token, mail: req.user.mail };
  mailRecover(message);
  delete req.user.hashedPassword;
  res.send({ token, user: req.user });
};

const hashPasswordForReset = (req, res, next) => {
  // Récupère le token via un parametre d'url
  const { token } = req.params;
  const myToken = token.split("$").join(".");
  // Décode le token
  req.payload = jwt.verify(myToken, process.env.JWT_SECRET);
  // Verification que le payload est bien un payload de reset
  if (req.payload.reset === "reset") {
    argon2
      .hash(req.body.password, hashingOptions)
      .then((hashedPassword) => {
        req.body.hashedPassword = hashedPassword;
        delete req.body.password;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    res.status(401).send("Not Good User for modify password");
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdmin,
  modifyPassword,
  hashPasswordForReset,
};
