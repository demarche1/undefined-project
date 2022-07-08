const MongoHelper = require("./helpers/mongo-helper");
const { MONGO_URI, PORT } = require("./config/env");
const app = require("./config/app");

MongoHelper.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("====================");
    console.log("Starting Server...");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
