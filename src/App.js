import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './component/MyNavbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './component/Main';
import Footer from './component/Footer';
import Details from './component/Details';



function App() {
  return (
    <BrowserRouter>
      <MyNavbar></MyNavbar>
      <Routes>

        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/details/:id' element={<Details></Details>}></Route>
      </Routes>

      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;
