
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
        "learning": {
            "default" : [],
            "courses" : []
        }
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


/* Create new list learning courses */
use('uCamp_db');

let idCourse = db.getCollection("users").findOne(
    {
        "courses.title" : "React"
    },
    {
        "_id" : 0,
        "_id" : "$courses._id"
    }
)._id[0].toString()

use('uCamp_db');

db.getCollection("users").updateOne(
    { _id: ObjectId("6508c6565d4e802963392f18" )},
    {
        $addToSet: {
            "learning.courses": {
                "_id" : ObjectId(idCourse),
                "status" : 1
            }
        }
    }
)

/* listing learning courses */

use('uCamp_db');

let idCourselist = db.getCollection("users").findOne(
    { _id: ObjectId("6508c6565d4e802963392f18" )},
    {
        "_id" : "$learning.courses"
    }
)._id.map(id => id._id.toString())

db.getCollection("users").findOne(
    {
        "courses._id" : { $in: idCourselist.map(id => new ObjectId(id)) }
    },
    {
        "_id" : 0,
        "mylist" : "$courses"
    }
)