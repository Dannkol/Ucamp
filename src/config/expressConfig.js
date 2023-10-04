import express from "express";
import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import session from 'express-session'; // Importa express-session

import { configGET } from "../middleware/rate-limit.js";

// ...

const configureApp = (app) => {
    // Configuraciones de Express
    app.use(express.json()); // Para manejar solicitudes JSON
    app.use(express.urlencoded({ extended: true })); // Para manejar solicitudes URL-encoded

    // Agrega el middleware de express-session antes de Passport.js
    app.use(session({
        secret: process.env.PASSPORTSECRET, // Cambia esto por una clave segura
        resave: false,
        saveUninitialized: false,
    }));

    /* app.use(configGET) */
    // Otros middlewares y configuraciones de Express
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
    
    app.use(passport.initialize());
    app.use(passport.session());

    // ...

    // Manejador de errores global
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send("Error interno del servidor");
    });
};

export default configureApp;
