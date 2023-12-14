const express = require("express");
const router = require("./routes");

class Server {
  constructor() {
    this.app = express();
    this.setup();
  }

  run(port) {
    this.server = this.app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }

  setup() {
    this.app.use(express.json());
    this.app.use(router);
    this.app.use((error, request, resolve, next) => {
      console.error(error.stack);
      res.status(500).send("Something went wrong!");
    });
  }
}

module.exports = Server;
