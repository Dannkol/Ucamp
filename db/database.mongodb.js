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
                    bsonType: "object",
                    required: ["default", "courses"],
                    properties: {
                        default: {
                            bsonType: ["array"],
                            items: {
                                bsonType: "objectId",
                                description: "id of the courses default"
                            },
                            description: "List od the courses default"
                        },
                        courses: {
                            bsonType: ["array"],
                            items: {
                                bsonType: "object",
                                required : ["_id", "status"],
                                properties : {
                                    _id: {
                                        bsonType : "objectId",
                                        description : "The id of the courses"
                                    },
                                    status : {
                                        bsonType : "number",
                                        description : "The status of the courses"
                                    }
                                },
                                description: "list of the courses id and status"
                            },
                            description: "List od the courses"
                        }
                    }
                },
                points : {
                    bsonType : "number",
                    description : "The number of points"
                }
            }
        }
    }
})

use("uCamp_db")

db.createCollection("rewards",{
    validator : {
        $jsonSchema : {
            bsonType : "object",
            required : ["title","price","summary","stock", "content"],
            properties : {
                title : {
                    bsonType : "string",
                    description : "Title of the reward"
                },
                price : {
                    bsonType : "number",
                    description : "Description of the reward"
                },
                summary : {
                    bsonType : "string",
                    description : "Summary of the reward"
                },
                stock : {
                    bsonType : "number",
                    description : "Stock of the reward"
                },
                content : {
                    bsonType : "string",
                    description : "Content of the reward"
                }
            }
        }
    }
})

use("uCamp_db")

db.getCollection('rewards').insertOne(
    {
        "title" : "prime video",
        "price" : 12,
        "content" : "code reward",
        "summary" : "Prime video",
        "stock" : 22
    }
)

use("uCamp_db")

db.createCollection("_Env")