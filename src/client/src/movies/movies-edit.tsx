import React from 'react';

interface IMoviesEditProps {
    title: string;
    submit: () => void;
    setTitle: (title: string) => void;
}

export default function MoviesEdit(props: IMoviesEditProps)  {
    return <div>
            <h2>Crear</h2>
            <form onSubmit={(e) => {e.preventDefault(); props.submit(); }}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={props.title} onChange={e => props.setTitle(e.target.value)} />
                </div>
                <div>
                    <button type="submit">guardar</button>
                </div>
            </form>
        </div>;
}