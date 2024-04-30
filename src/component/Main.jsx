import React, { useState, useEffect } from 'react';
import Mycard from "./Mycard";

function Main() {
    const key = "base64 di alfio:G8wpI4xwL7XtPUXjKgWiGlb8";
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost/wordpress/wp-json/wp/v2/posts/?_embed=1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className='container my-5"'>
            <h1>Benvenuto nel blog Scentè</h1>
            <div className="d-flex gap-2 py-3 flex-wrap ">
                {data ? (data.map((article, index) =>
                    <Mycard
                        key={index}
                        img={article._embedded['wp:featuredmedia']? article._embedded['wp:featuredmedia'][0].source_url : ""}
                        title={article.title.rendered}
                        id={article.id}
                    >
                    </Mycard>

                )
                ) : (
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
            )}

            </div>
        </div>
    );
}

export default Main;
