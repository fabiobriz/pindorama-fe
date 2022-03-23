import {} from './Footer.css'
import { Link } from 'react-router-dom'


function Footer() {
    return (
    <footer className="footer colorPadrao text-center align-content-center">        
               &copy; 2021 - Pindorama - <Link to='/Contatos' className="text-white">Contatos</Link>
    
        </footer>
      
    )
}

export default Footer