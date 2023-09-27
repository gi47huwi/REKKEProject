import logo from './logo.svg';
import './App.css';
import { MDBNavbar, MDBNavbarBrand, MDBContainer } from 'mdb-react-ui-kit';

function App() {
  return (
    <div className="App">
      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='#'>
            <img
              src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
              height='30'
              alt=''
              loading='lazy'
            />
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default App;
