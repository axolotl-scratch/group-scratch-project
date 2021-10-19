import React, {useState, useEffect} from 'react';
import Button from '../Button.js';
import Input from '../Input.js';
import Message from './Message.js';
import AddArtist from './AddArtist';

const Compile = () => {
    const [artists, setArtists] = useState([]);
    const[message, setMessage] = useState(false);

    const addArtist = async (artist) =>{
        const res = await fetch('http://localhost:3000/compile', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',

            },
            body: JSON.stringify(artist),
        })

        const data = await res.json();

        setArtists([...artists, data]);
    }


    return(
        <>
        <AddArtist onAdd={addArtist}/>
        <Message />

        <Button text = {'Create New Playlist'}/>
        </>
    )
}

export default Compile;