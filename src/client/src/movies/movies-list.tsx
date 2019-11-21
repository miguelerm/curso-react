import React from 'react';

import { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import MoviesEdit from './movies-edit';
import MoviesTable, { IMovieItem } from './movies-table';

interface IMoviesListState {
    movies: IMovieItem[];
    title: string;
}

export default class MoviesList extends Component<{}, IMoviesListState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            movies: [],
            title: ''
        };

        //this.setTitle = this.setTitle.bind(this);
    }

    async componentDidMount() {
        await this.getMovies();
        console.log('done.');
    }

    submit() {
        
        const body = JSON.stringify({title: this.state.title});

        fetch('http://localhost:3000/movies', { 
            method: 'POST', 
            body,
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } 
        })
            .then(x => x.json())
            .then(x => { console.log('saved ', x)})
            .then(() => window.location.href = '/movies');

    }

    render() {
        return <div>
            <h1>Movies</h1>
            <Link to="/movies/crear">Crear</Link>
            <Switch>
                <Route exact path="/movies">
                    <MoviesTable movies={this.state.movies} />
                </Route>
                <Route path="/movies/crear">
                    <MoviesEdit 
                        title={this.state.title} 
                        submit={() => this.submit()} 
                        setTitle={(title) => this.setState({title})} 
                    />
                </Route>
                <Route path="/movies/edit/:id">
                    <h2>Editar</h2>
                </Route>
            </Switch>
        </div>;
    }

    async getMovies() {
        try {
            const response = await fetch('http://localhost:3000/movies');
            const movies = await response.json();
            this.setState({ movies });
        } catch (e){
            console.error('errot getting movies ', e);
        }
    }

}