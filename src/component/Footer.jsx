import '../css/footer.css'
function Footer() {
    return (<>


        <footer>
            <div className="footer-info">
                <h4>Esplora il nostro assortimento</h4>
                <p>Scopri le nostre fragranze pregiati e lasciati avvolgere dalle essenze che parlano della tua personalità.</p>
            </div>
            <div className="contact-info">
                <h4>Contatti</h4>
                <p>Telefono: [inserisci numero di contatto]</p>
                <p>Email: <a href="mailto:info@scentè.com">info@scentè.com</a></p>
            </div>
            <div className="social-media">
                <h4>Seguici</h4>
                <ul>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Twitter</a></li>
                </ul>
            </div>
        </footer>

    </>)
}
export default Footer