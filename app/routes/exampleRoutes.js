const exampleController = require("../controllers/exampleController");
const webSocketController = require('../controllers/webSocketController')
const validation = require('../validations/validation');
const { authMiddleware } = require('../middleware/index');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const router = require("express-promise-router")()

  router.post(
    "/token/simulation",
    exampleController.loginSimulation
  );

  router.get(
    "/survey",
    authMiddleware('USER'),
    exampleController.refactoreMe1
  );

  router.post(
    "/survey",
    authMiddleware('ADMIN'),
    validation.insertSurvey,
    exampleController.refactoreMe2
  );

  router.get(
    "/attack/logs",
    authMiddleware('USER'),
    validation.getDataAttackLogs,
    exampleController.getData
  );


  router.get(
    "/view",
    webSocketController.viewDataFromWebSocket
  );

  app.use("/api/data", router);
};
