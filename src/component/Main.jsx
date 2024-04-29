import React, { useState, useEffect } from 'react';
import Mycard from "./Mycard";

function Main() {
    const key = "base64 di alfio:G8wpI4xwL7XtPUXjKgWiGlb8";
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost/wordpress/wp-json/wp/v2/posts/')
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
            <h1>Benvenuto nel blog</h1>
            <div className="d-flex gap-2 py-3 ">
                {data && (data.map((article, index) =>
                    <Mycard
                        key={index}
                        img={article.yoast_head_json.og_image[0].url}
                        title={article.title.rendered}
                        id= {article.id}
                    >
                    </Mycard>

                )
                )}
           
            </div>
        </div>
    );
}

export default Main;
