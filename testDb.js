import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://Dannkol:diminombre12A@pruebas.ncnxgtj.mongodb.net/"; // Cambia la URI de acuerdo a tu configuración
const dbName = "uCamp_db";

(async () => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);

   
    const result = await db.collection("users").updateOne({identifier : "fasdfwsfew5343123oj3254" }, 
    { 
        $set : {
            courses : [
                {
                    "_id": new ObjectId(),
                    "classes": [],
                    "title": "React",
                    "summary": "React",
                    "content": "Lorem",
                    "quiz": ["url_quiz", "url_sheet"],
                    "update_date": new Date("2023-09-04T00:00:00Z")
                }                
            ]
        }
    }
)

    console.log(result);

  } catch (error) {
    console.error(
      "Error:",
      error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details[0].details[0]
    );
  } finally {
    client.close();
  }
})();