import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Pacotes from './components/pages/Pacotes'
import Contatos from './components/pages/Contatos'
import Administracao from './components/pages/Administracao'
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import Login from './components/pages/Login';
import Registrar from './components/pages/Registrar';
import Prevencoes from './components/pages/Prevencoes';
import Artesanatos from './components/pages/Artesanatos';
import Sobre from './components/pages/Sobre';
import CadastroDadosAldeia from './components/pages/CadastroDadosAldeia'
import CadastroDadosCliente from './components/pages/CadastroDadosCliente'
import GerenciarConta from './components/pages/GerenciarConta'
import ComprasCliente from './components/pages/ComprasCliente'
import AnunciosAldeia from './components/pages/AnunciosAldeia'




function App() {

  return (
    <Router>
      <NavBar />
      <div className="row justify-content-center m-0" id="body">
        <Routes>
          <Route path="/" element={<Home />}> Home </Route>
          <Route path="/Artesanatos" element={<Artesanatos />}> Artesanatos </Route>
          <Route path="/Pacotes" element={<Pacotes />}> Pacotes </Route>
          <Route path="/Sobre" element={<Sobre />}> Sobre </Route>
          <Route path="/Prevencoes" element={<Prevencoes />}> Prevenções </Route>
          <Route path="/Contatos" element={<Contatos />} > Contatos </Route>
          <Route path="/Administracao" element={<Administracao />}> Administracao </Route>
          <Route path="/Login" element={<Login />}> Login </Route>
          <Route path="/Registrar" element={<Registrar />}> Registrar </Route>
          <Route path="/CadastroDadosCliente" element={<CadastroDadosCliente />}> Cadastro Dados do Cliente </Route>
          <Route path="/CadastroDadosAldeia" element={<CadastroDadosAldeia />}>Cadastro Dados da Aldeia </Route>
          <Route path="/GerenciarConta" element={<GerenciarConta />}> Gerenciar Conta</Route>
          <Route path="/ComprasCliente" element={<ComprasCliente/>}> Compras do Cliente</Route>
          <Route path="/AnunciosAldeia" element={<AnunciosAldeia/>}> Anuncios da Aldeia</Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;