const express = require('express');
const bodyParser = require('body-parser')
const port = process.env.PORT || '3000';

const movies = [];
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.json());

app.param('id', (req, res, next, value, name) => {
    const movie = movies.filter(x => x.id === parseInt(value)).pop();
    
    if (!movie) {
        const message = `Movie with id ${value} not found.`;
        res.status(404).send({ error: true, message });
        return;
    }

    req.movie = movie;
    return next();
});

app.route('/movies')
    .get((req, res, next) => {
        res.json(movies);
    })
    .post((req, res, next) => {
        const movie = req.body;
        const lastId = movies.length > 0 ? Math.max(...movies.map(x => x.id || 0)) : 0;
        movie.id = lastId + 1;
        movies.push(movie);
        res.status(201).json(movie);
    })
    .options((req, res, next) => {
        res.status(200).end();
    });

app.route('/movies/:id')
    .get((req, res, next) => {
        res.json(req.movie);
    })
    .put((req, res, next) => {
        const data = req.body;
        const index = movies.indexOf(req.movie);
        const oldMovie = movies[index];
        const newMovie = movies[index] = { ...oldMovie, ...data};
        res.json(newMovie);
    })
    .delete((req, res, next) => {
        const index = movies.indexOf(req.movie);
        const movie = movies.splice(index, 1);
        res.json(movie);
    })
    .options((req, res, next) => {
        res.status(200).end();
    });


app.use((req, res, next) => {
    const message = {
        error: true, 
        codigo: 404, 
        mensaje: 'resource not found'
    };

    res.status(404).send(message);
});

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});