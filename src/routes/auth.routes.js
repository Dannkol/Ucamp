import { Router } from 'express';
import passport from 'passport';
import session from 'express-session';

import { findUser, NewUser } from '../models/UserModel.js';

import DiscordStrategy from 'passport-discord';
import dotenv from "dotenv";

dotenv.config();

const Router_Auth = Router();


let scopes = ['identify', 'email', 'guilds', 'guilds.join'];

// Configurar Passport.js

const SERVER = JSON.parse(process.env.SERVER)

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENTIDDISCORD,
    clientSecret: process.env.CLIENTSECRETDISCORD,
    callbackURL: `http://${SERVER.HOSTNAME}:${SERVER.PORT}/auth/discord/callback`, // Cambia esto según tu configuración
    scope: scopes
}, async (accessToken, refreshToken, profile, done) => {
    // Este callback se ejecuta cuando un usuario se autentica correctamente
    const userGuild = profile.guilds.find(guild => guild.id === '1101581994355347526' && guild.name === 'CampusLands 🚀');

    if (!userGuild) {
        // El usuario no tiene la guild deseada, devolver un error
        return done('Usuario no pertenece a campuslands', null);
    }

    profile = {
        identificador: profile.id,
        username: profile.username,
        email: profile.email,
        guild: profile.guilds.filter((e) => {
            return e.id === '1101581994355347526'
        }),
        points: 0
    }

    return done(null, profile);


}));




Router_Auth.get('/auth/discord', passport.authenticate('discord'));

Router_Auth.get('/auth/discord/callback',
    (req, res, next) => {
        passport.authenticate('discord', async (err, user) => {
            if (err) {
                // Manejar el error aquí y responder en consecuencia
                console.error('Error de autenticación:', err);
                return res.status(500).send('Error de autenticación');
            }
            // Autenticación exitosa
            req.login(user, async (loginErr) => {
                if (loginErr) {
                    return res.status(500).send('Error de inicio de sesión');
                }
                // Redirigir al usuario a la página de éxito
                const user = await findUser(req.user)

                if (!user) await NewUser(req.user)
                res.redirect('/ok');
            });
        })(req, res, next);
    }
);

Router_Auth.get('/logout', (req, res) => {
    req.logout; // Passport.js proporciona el método logout() para cerrar la sesión del usuario
    req.session.destroy();
    res.status(403).json({ message: true });
});


export { Router_Auth }