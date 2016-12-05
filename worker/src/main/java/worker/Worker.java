package worker;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.exceptions.JedisConnectionException;
import org.json.JSONObject;

class Worker {
  public static void main(String[] args) {

      Jedis redis = connectToRedis("redis");
      MongoDatabase db = connectToDB();

      while (true) {
        String newFavFoodJson = redis.blpop(0, "new-foods").get(1);
        JSONObject newFavFoodData = new JSONObject(newFavFoodJson);
        String person = newFavFoodData.getString("person");
        String food = newFavFoodData.getString("food");

        System.err.printf("Adding new favourite food: '%s' likes '%s'\n", person, food);
        addNewFavouriteFood(db, person, food);
      }
  }

  static void addNewFavouriteFood(MongoDatabase db, String person, String food) {

    MongoCollection<Document> collection = db.getCollection("favourite-foods");

    Document doc = new Document()
                   .append("person", person)
                   .append("food", food);

    collection.insertOne(doc);

  }

  static Jedis connectToRedis(String host) {
    Jedis conn = new Jedis(host);

    while (true) {
      try {
        conn.keys("*");
        break;
      } catch (JedisConnectionException e) {
        System.err.println("Failed to connect to redis - retrying");
        sleep(1000);
      }
    }

    System.err.println("Connected to redis");
    return conn;
  }

  static MongoDatabase connectToDB() {

    MongoClient mongoClient = new MongoClient( "mongo" );

    MongoDatabase database = mongoClient.getDatabase("favourite-foods");

    return database;
  }

  static void sleep(long duration) {
    try {
      Thread.sleep(duration);
    } catch (InterruptedException e) {
      System.exit(1);
    }
  }
}