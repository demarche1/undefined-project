const { MongoClient } = require("mongodb");

module.exports = class MongoHelper {
  static async connect(uri) {
    this.uri = uri;
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.client.db();
  }

  static async disconnect() {
    await this.client.close();
    this.client = null;
    this.db = null;
  }

  static async getCollection(name) {
    if (!this.client) {
      await this.connect(this.uri);
    }
    return this.db.collection(name);
  }
};
