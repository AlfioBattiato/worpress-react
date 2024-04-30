import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';


function Details(props) {
    const key = "alfio:IaKn cjHu 58DX 8n8t bNOF rXkC";
    const params = useParams(); // Utilizzo di useParams() per ottenere i parametri dell'URL
    const [bodytext, setbodytext] = useState("")
    const [title, setTitle] = useState("")
    const [imgbody, setImgbody] = useState("<img src='' alt='img'></img> ")
    const [imgCopertina, setImgCopertina] = useState(null)
    const [newCopertina, setNewCopertina] = useState(null)
    const navigate = useNavigate()

    const [oggetto, setOggetto] = useState()



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);





    const get = () => {
        fetch(`http://localhost/wordpress/wp-json/wp/v2/posts/${params.id}?_embed=1`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta');
                }
                return response.json();
            })
            .then(data => {
                setOggetto(data);
                setbodytext(data.content.rendered)
                setTitle(data.title.rendered)
                if (data._embedded['wp:featuredmedia']) {
                    setImgCopertina(data._embedded['wp:featuredmedia'][0].source_url)

                }

            })
            .catch(error => {
                console.log(error);
            });
    }

    const deletePost = () => {
        fetch(`http://localhost/wordpress/wp-json/wp/v2/posts/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Basic ${btoa(key)}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta');
                }
                return response.json();
            })
            .then(data => {
                alert('Post eliminato con successo:', data);
                navigate("/");
            })
            .catch(error => {
                console.error('Errore durante l\'eliminazione del post:', error);
            });
    }
    // put
    const updatePost = () => {

        const formData = new FormData();
        formData.append('file', newCopertina)

        if(newCopertina===null){
            fetchPut()
           
        }else{
            (fetch(`http://localhost/wordpress/wp-json/wp/v2/media`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(key)}`,
                },
                body: formData,

            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Errore nella richiesta');
                    }
                    return response.json();
                })
                .then(data => {
                    fetchPut(data)
                })
                .catch(error => {
                    console.error('Errore durante l\'aggiornamento del post:', error);
                }))
            
        }

    }

    const fetchPut = (data) => {
        fetch(`http://localhost/wordpress/wp-json/wp/v2/posts/${params.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Basic ${btoa(key)}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: bodytext + (imgbody !== "<img src='' alt='img'></img> " ? imgbody : ""),
                featured_media: data ? data.id : null



            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta');
                }
                return response.json();
            })
            .then(data => {
                console.log('Post aggiornato con successo:', data);
                get()
                setImgbody("<img src='' alt='img'></img> ")
                handleClose()
            })
            .catch(error => {
                console.error('Errore durante l\'aggiornamento del post:', error);
            });
    }




    useEffect(() => {
        get()

    }, []);
    return (
        <div className="container py-2">
            {oggetto ? (
                <>
                    <img src={imgCopertina} width={'100%'} height={'200vh'} style={{ objectFit: "cover" }} alt="" />
                    <h1>{oggetto.title.rendered}</h1>
                    <div className='my-2' dangerouslySetInnerHTML={{ __html: oggetto.content.rendered }}>
                    </div>
                    <Button variant="success me-2" onClick={handleShow}>
                        Modifica post
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modifica</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                updatePost();
                                handleClose();

                            }}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Titolo</label>
                                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" id="title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imgCopertina" className="form-label">Immagine copertina</label>
                                    <input type="file" onChange={(e) => { setNewCopertina(e.target.files[0]) }} className="form-control" id="imgCopertina" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Testo" className="form-label">Testo</label>
                                    <textarea onChange={(e) => setbodytext(e.target.value)} value={bodytext} type="text" className="form-control" id="Testo" style={{ height: "20rem" }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="img" className="form-label">Nuova immagine Body</label>
                                    <input type="text" onChange={(e) => { setImgbody(e.target.value) }} value={imgbody} className="form-control" id="img" />
                                </div>

                                <button type="submit" className="btn btn-success">Modifica</button>
                            </form>

                        </Modal.Body>

                    </Modal>
                    <Button variant="danger" onClick={deletePost}>Elimina</Button>{' '}
                </>
            ) : <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}

        </div>
    );
}

export default Details;
