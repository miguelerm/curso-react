import React from 'react';
import { Link } from 'react-router-dom';

export interface IMovieItem {
    id: number;
    title: string;
}

export interface IMoviesTableProps {
    movies: IMovieItem[];
}

function MovieItem({id, title}: IMovieItem) {
    return <tr>
        <td><Link to={`/movies/edit/${id}`}>{id}</Link></td>
        <td>{title}</td>
    </tr>;
}

export default function MoviesTable(props: IMoviesTableProps) {
    return <>
        <h2>List</h2>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {props.movies.map((m) => <MovieItem key={m.id} {...m} />)}
            </tbody>
        </table>
    </>;
}