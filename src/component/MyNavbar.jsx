import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';


function MyNavbar() {
  const key = "alfio:IaKn cjHu 58DX 8n8t bNOF rXkC";
  // const navigate=useNavigate()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imgBody, setImgBody] = useState("<img src='' alt='img'></img> ")

  const [imgCopertina, setImgCopertina] = useState(null)


  
  const [textBody, setTextBody] = useState("<p></p>")
  const [title, setTitle] = useState("")


  const post = () => {
    const formData=new FormData();
    formData.append('file',imgCopertina)

    const oggetto = {
      title: title,
      content: imgBody + textBody,
      status: "publish",
    }

    fetch(`http://localhost/wordpress/wp-json/wp/v2/media`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(key)}`,
      },
      body:formData,
      
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta');
        }
        return response.json();
      })
      .then(data => {
        console.log("ok")

        oggetto.featured_media=data.id

        console.log(data)
        fetch(`http://localhost/wordpress/wp-json/wp/v2/posts`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${btoa(key)}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            oggetto
          )
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Errore nella richiesta');
            }
            return response.json();
          })
          .then(data => {
            console.log('Post inserito', data);
            handleClose()
            // navigate('/')
          })
          .catch(error => {
            console.error('Errore durante l\'aggiornamento del post:', error);
          });


        
        
      })
      .catch(error => {
        console.error('Errore durante l\'aggiornamento del post:', error);
      });
      
      


      
  
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Scentè</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>

          </Nav>
          <a href='#' className='nav-link' variant="success me-2" onClick={handleShow}>
            Inserisci post
          </a>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modifica</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e) => {
                e.preventDefault();
                post()
                handleClose();

              }}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Titolo</label>
                  <input type="text" onChange={(e) => {
                    setTitle(e.target.value)
                  }} value={title} className="form-control" id="title" />
                </div>
                <div className="mb-3">
                  <label htmlFor="imgc" className="form-label">Immagine copertina</label>
                  <input type="file" className="form-control" id="imgc" 
                   onChange={(e) => {
                    setImgCopertina((e.target.files[0]) )
                  }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="Testo" className="form-label">Testo</label>
                  <textarea type="text" value={textBody} onChange={(e) => {
                    setTextBody(e.target.value)
                  }} className="form-control" id="Testo" style={{ height: "20rem" }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="img" className="form-label">Immagine body</label>
                  <input type="text" className="form-control" id="img" value={imgBody}
                    onChange={(e) => {
                      setImgBody(e.target.value)
                    }} />
                </div>

                <button type="submit" className="btn btn-primary">Inserisci</button>
              </form>

            </Modal.Body>

          </Modal>




        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;