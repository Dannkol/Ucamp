## API Reference

#### Get all course

```http
  GET /dashboard/all/course
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `express-session` | **express-session** |

#### Get my list of courses

```http
  GET /dashboard/mylist
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `express-session` | **express-session** |

#### Get info user

```http
  GET /dashboard/info/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `express-session` | **express-session** |

#### Get delete course in my list

```http
  GET /dashboard/mylist/delate/:idcourse
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idcourse` | `ObjectId` | **Id of course** |
| `user` | `express-session` | **express-session** |

#### Get delete my course

```http
  GET /dashboard/mycourses/delate/:idcourse
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `idcourse` | `ObjectId` | **Id of course** |
| `user` | `express-session` | **express-session** |

#### Get update rol

```http
  GET /dashboard/update/rol
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `express-session` | **express-session** |

## Imagen

<img src="../Img/dashboard/Escritorio/AcordeonDeCursosGenerales.png" alt="flujograma-adquisicion">
<blockquote cite="">
  <p>Dashboard CursosGenerales</p>
  <footer>- Vista del dashboard con el acordeon de los cursos generales</footer>
</blockquote>

### Instrucciones

* 


