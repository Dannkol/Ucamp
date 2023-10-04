
## API Reference

#### Get all items

```http
  GET /auth/discord
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/` | `/` | **Passport-discord** |

## Middleware

ensureAuthenticated.middleware.js

```javascript
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // El usuario está autenticado, continuar con la solicitud
    }
    res.status(401).json({
        message : false
    }); // El usuario no está autenticado, redirigirlo a la página de inicio de sesión
}

export { ensureAuthenticated }
```

## View Login

* Login

![Login](../Img/Login.png)
