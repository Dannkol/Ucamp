use("uCamp_db")

db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Collection User",
            required: ["identifier", "username", "email", "rol"],
            properties: {
                identifier: {
                    bsonType: "string",
                    description: "The identifier on discord"
                },
                username: {
                    bsonType: "string",
                    description: "The username on discord"
                },
                email: {
                    bsonType: "string",
                    description: "The email on discord"
                },
                rol: {
                    bsonType: "number",
                    description: "The number of rol"
                },
                courses: {
                    bsonType: ["array"],
                    items: {
                        bsonType: "object",
                        required: ["_id", "title", "summary", "content", "quiz", "update_date"],
                        properties: {
                            _id: {
                                bsonType: 'objectId',
                                description: "The id of the course"
                            },
                            classes: {
                                bsonType: ["array"],
                                description: "Array of the classes",
                                items: {
                                    bsonType: "object",
                                    required: ["_id", "title", "summary", "content", "update_date"],
                                    properties: {
                                        _id: {
                                            bsonType: 'objectId',
                                            description: "The id of the classe"
                                        },
                                        title: {
                                            bsonType: "string",
                                            description: "title of the class",
                                        },
                                        summary: {
                                            bsonType: "string",
                                            description: "summary of the class",
                                        },
                                        content: {
                                            bsonType: ["array"],
                                            items: {
                                                bsonType: "string",
                                                description: "content of the class",
                                            }
                                        },
                                        update_date: {
                                            bsonType: "date",
                                            description: "date of update",
                                        }
                                    }
                                },
                                description: "list of classes"
                            },
                            title: {
                                bsonType: "string",
                                description: "title of the course",
                            },
                            summary: {
                                bsonType: "string",
                                description: "summary of the course",
                            },
                            content: {
                                bsonType: "string",
                                description: "content of the class",
                            },
                            quiz: {
                                bsonType: ["array"],
                                items: {
                                    bsonType: "string",
                                    description: "Url de los quizes"
                                },
                                description: "quiz of the class",
                            },
                            update_date: {
                                bsonType: "date",
                                description: "Date of update"
                            }
                        }
                    },
                    description: "content courses"
                },
                learning: {
                    bsonType: ["array"],
                    items: {
                        bsonType: "object",
                        required: ["_id", "classes", "title", "summary", "content", "status", "update_date"],
                        properties: {
                            _id: {
                                bsonType: 'objectId',
                                description: "The id of the course"
                            },
                            classes: {
                                bsonType: ["array"],
                                description: "Array of the classes",
                                items: {
                                    bsonType: "object",
                                    required: ["_id", "title", "summary", "content", "update_date"],
                                    properties: {
                                        _id: {
                                            bsonType: 'objectId',
                                            description: "The id of the classe"
                                        },
                                        title: {
                                            bsonType: "string",
                                            description: "title of the class",
                                        },
                                        summary: {
                                            bsonType: "string",
                                            description: "summary of the class",
                                        },
                                        content: {
                                            bsonType: ["array"],
                                            items: {
                                                bsonType: "string",
                                                description: "content of the class",
                                            }
                                        },
                                        update_date: {
                                            bsonType: "date",
                                            description: "date of update",
                                        }
                                    }
                                },
                                description: "list of classes"
                            },
                            title: {
                                bsonType: "string",
                                description: "title of the course",
                            },
                            summary: {
                                bsonType: "string",
                                description: "summary of the course",
                            },
                            content: {
                                bsonType: "string",
                                description: "content of the course",
                            },
                            status: {
                                bsonType: "number",
                                description: "status of the course",
                            },
                            update_date: {
                                bsonType: "date",
                                description: "Date of update of course"
                            }
                        }
                    },
                    description: "list my courses"
                }
            }
        }
    }
})
db.createCollection("course_default")
db.createCollection("rewards")


/* 

{
  "_id": ObjectId("fasdfwsfew5343123oj3254"),
  "identifier": "fasdfwsfew5343123oj3254",
  "username": "dannkol",
  "email": "dannkol@gmail.com",
  "rol": 1,
  "classes": [
    {
      "_id": ObjectId("sdfsdfse23423sdaas"),
      "clases": [
        {
          "_id": ObjectId("asdasf012q3423gwes21"),
          "title": "React Native for dummies",
          "summary": "lorem",
          "content": [
            "url_video",
            "text",
            "taks",
            "md code"
          ],
          "update_date": ISODate("2023-09-02T00:00:00Z")
        },
        {
          "_id": ObjectId("asdasf012qdsf3gwes21"),
          "title": "React for dummies",
          "summary": "lorem",
          "content": [
            "url_video",
            "text",
            "taks",
            "md code"
          ],
          "update_date": ISODate("2023-09-04T00:00:00Z")
        }
      ],
      "title": "React",
      "summary": "React",
      "content": "Lorem",
      "quiz": ["url_quiz", "url_sheet"],
      "updated_date": ISODate("2023-09-04T00:00:00Z")
    }
  ],
  "learning": [
    {
      "_id": ObjectId("sdfsdfse23423sdaas"),
      "clases": [
        {
          "_id": ObjectId("asdasf012q3423gwes21"),
          "title": "React Native for dummies",
          "summary": "lorem",
          "content": [
            "url_video",
            "text",
            "taks",
            "md code"
          ],
          "update_date": ISODate("2023-09-02T00:00:00Z")
        },
        {
          "_id": ObjectId("asdasf012qdsf3gwes21"),
          "title": "React for dummies",
          "summary": "lorem",
          "content": [
            "url_video",
            "text",
            "taks",
            "md code"
          ],
          "update_date": ISODate("2023-09-04T00:00:00Z")
        }
      ],
      "title": "React",
      "summary": "React",
      "content": "Lorem",
      "updated_date": ISODate("2023-09-04T00:00:00Z"),
      "status": 1
    }
  ]
}


*/

// The current database to use.
use('uCamp_db');

// Create a new user
db.getCollection('users').insertOne(
    {
        "_id": new ObjectId(),
        "identifier": "fasdfwsfew5343123oj3254",
        "username": "dannkol",
        "email": "dannkol@gmail.com",
        "rol": 1,
        "courses": [],
        "learning": []
    }
);

/* Create new Courses */
use('uCamp_db');

db.getCollection("users").updateOne({ identifier: "fasdfwsfew5343123oj3254" },
    {
        $set: {
            courses: [
                {
                    "_id": new ObjectId(),
                    "classes": [],
                    "title": "React",
                    "summary": "React",
                    "content": "Lorem",
                    "quiz": ["url_quiz", "url_sheet"],
                    "update_date": ISODate("2023-09-04T00:00:00Z")
                }
            ]
        }
    }
)

/* Create new clases */
use('uCamp_db');
let clases = [
    {
        "_id": ObjectId(),
        "title": "React Native for dummies",
        "summary": "lorem",
        "content": [
            "url_video",
            "text",
            "taks",
            "# Hola mundo"
        ],
        "update_date": new Date("2023-09-02T00:00:00Z")
    },
    {
        "_id": ObjectId(),
        "title": "React for dummies",
        "summary": "lorem",
        "content": [
            "url_video",
            "text",
            "taks",
            "# Hola mundo"
        ],
        "update_date": new Date("2023-09-04T00:00:00Z")
    }
]

db.getCollection("users").updateOne(
    { "courses.title": "React" },
    {
        $set: {
            "courses.$.classes": clases
        }
    }
)
