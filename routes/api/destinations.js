var express = require("express");
var router = express.Router();
const destinationsCtrl = require("../../controllers/api/destinations");
const { checkToken } = require("../../config/checkToken");

router.get("/", checkToken, destinationsCtrl.getAllDestinations);
router.post("/", checkToken, destinationsCtrl.addDestination);
router.post(
  "/:destinationId/attractions",
  checkToken,
  destinationsCtrl.addAttraction,
);
router.post(
  "/:destinationId/:attractionId/reviews",
  checkToken,
  destinationsCtrl.addReview,
);

module.exports = router;
