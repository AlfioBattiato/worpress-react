import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details(props) {
    const key = "base64 di alfio:G8wpI4xwL7XtPUXjKgWiGlb8";
    const [data, setData] = useState(null);
    const params = useParams(); // Utilizzo di useParams() per ottenere i parametri dell'URL

    useEffect(() => {
        fetch(`http://localhost/wordpress/wp-json/wp/v2/posts/${params.id}`) // Aggiunta dei parametri nell'URL della richiesta fetch
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []); // Aggiunta dei parametri come dipendenza dell'effetto

    return (
        <div className="container py-2">
            {data && (
                <>
                    <div className='my-2' dangerouslySetInnerHTML={{ __html: data.content.rendered }}>
                    </div>
                    <Button variant="success">Modifica</Button>{' '}
                    <Button variant="danger">Elimina</Button>{' '}
                </>
            )}

        </div>
    );
}

export default Details;
