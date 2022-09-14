const express = require("express");

const router = express.Router();

const trainControllers = require("./controllers/trainControllers");
const imageTrainControllers = require("./controllers/imageTrainControllers");
const imageAvatarControllers = require("./controllers/imageAvatarControllers");
const contactControllers = require("./controllers/contactControllers");
// eslint-disable-next-line import/no-unresolved
const areaControllers = require("./controllers/areaControllers");

router.get("/api/train", trainControllers.browseJoin);
router.get("/api/train/:id", trainControllers.read);
router.put("/api/train/:id", trainControllers.edit);
router.post("/api/train", trainControllers.add);
router.delete("/api/train/:id", trainControllers.destroy);

router.get("/api/imagetrain", imageTrainControllers.browse);
router.get("/api/imagetrain/:id", imageTrainControllers.read);
router.put("/api/imagetrain/:id", imageTrainControllers.edit);
router.post("/api/imagetrain", imageTrainControllers.add);
router.delete("/api/imagetrain/:id", imageTrainControllers.destroy);

router.get("/api/imageavatar", imageAvatarControllers.browse);
router.get("/api/imageavatar/:id", imageAvatarControllers.read);
router.put("/api/imageavatar/:id", imageAvatarControllers.edit);
router.post("/api/imageavatar", imageAvatarControllers.add);
router.delete("/api/imageavatar/:id", imageAvatarControllers.destroy);

router.get("/api/contacts", contactControllers.getAll);
router.get("/api/contacts/:id", contactControllers.read);
router.put("/api/contacts/:id", contactControllers.edit);
router.post("/api/contacts", contactControllers.add);
router.delete("/api/contacts/:id", contactControllers.destroy);

router.get("/api/areas", areaControllers.getAll);
router.get("/api/areas/:id", areaControllers.read);
router.put("/api/areas/:id", areaControllers.edit);
router.post("/api/areas", areaControllers.add);
router.delete("/api/areas/:id", areaControllers.destroy);

module.exports = router;
