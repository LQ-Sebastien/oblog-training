const path = require("path");
const fs = require("fs");

const errorHandler = {
  // Catch error in log file
    router(error, req, res, _) { 
      const date = new Date();
      const logMessage = `Router || ${date.toTimeString()} - Route: ${req.url} - Code: ${error.code} - Message: ${error.message}\r`;
      const fileName = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.log`;
      fs.appendFile(path.join(__dirname, `../../logs/${fileName}`), logMessage, (err) => {
          if (err) throw err;
      });

      // Inform user with a message
      if (error.code) {
        res.status(error.code).json({ error: error.message, errorCode: error.code });
      } else {
          res.status(500).json({ error: "Unexpected server error. Please try again later", errorCode: 500 });
      }
    },

    controller(_, res, error) {
      const date = new Date();
      const logMessage = `Controller || ${date.toTimeString()} - Code: ${error.code} - Message: ${error.message}\r`;
      const fileName = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.log`;
      fs.appendFile(path.join(__dirname, `../../logs/${fileName}`), logMessage, (err) => {
          if (err) throw err;
      }),

      res.status(error.code).json({ error: error.message, errorCode: error.code });
    }
};

module.exports = errorHandler;
