import logo from './logo.svg';
import './App.css';
import { 
  MDBDropdownToggle, 
  MDBNavbar, 
  MDBNavbarBrand, 
  MDBContainer, 
  MDBNavbarToggler, 
  MDBIcon, 
  MDBNavbarNav, 
  MDBNavbarItem, 
  MDBNavbarLink, 
  MDBCollapse, 
  MDBDropdown, 
  MDBDropdownItem, 
  MDBDropdownMenu,
  MDBFooter,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { BrowserRouter, NavLink, Outlet, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menue from './pages/Menue';
import Info from './pages/Info';
import Settings from './pages/Settings';
import MapView from './pages/Map';
import languages from "./configData/languages.json"
import CookieConsent from "react-cookie-consent";
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Impressum from './pages/impress';


function App() {
  const [showNav, setShowNav] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("de");
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <div className="App">
        <MDBNavbar light expand="md" sticky style={{ backgroundColor: "rgb(175, 213, 175)", width: "100%" }}>
          <MDBContainer fluid >
            <MDBNavbarBrand href='/rekke/home'>
              <h2>REKKE</h2>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              type='button'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowNav(!showNav)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showNav}>
              <MDBNavbarNav>
                <MDBNavbarItem className='mx-3'>

                  <NavLink to={`menue`}>
                    {languages[currentLanguage].navBar.menue}
                  </NavLink>

                </MDBNavbarItem>
                <MDBNavbarItem className='mx-3'>

                  <NavLink to={`info`}>
                    {languages[currentLanguage].navBar.info}

                  </NavLink>

                </MDBNavbarItem>

              </MDBNavbarNav>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' color='none' className='dropdown' >{currentLanguage}</MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link childTag='button' onClick={() => setCurrentLanguage("de")}>
                    Deutsch
                  </MDBDropdownItem>
                  <MDBDropdownItem link childTag='button' onClick={() => setCurrentLanguage("en")}>
                    English
                  </MDBDropdownItem>

                </MDBDropdownMenu>
              </MDBDropdown>

            </MDBCollapse>

          </MDBContainer>
        </MDBNavbar>
        <Routes >
          <Route path="/home" element={<Home currentLanguage={currentLanguage} />} />
          <Route path="menue" element={<Menue currentLanguage={currentLanguage} />} />
          <Route path="map" element={<MapView currentLanguage={currentLanguage} />} />
          <Route path="info" element={<Info currentLanguage={currentLanguage} />} />
          <Route path="impressum" element={<Impressum currentLanguage={currentLanguage} />} />
          {/* <Route path="settings" element={<Settings />} /> */}

        </Routes>
        <CookieConsent
          location="bottom"
          buttonText="Yes"
          cookieName="basic cookie alert"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}>No cookies are stored. No cookies from third party websites are used.</span>
        </CookieConsent>
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
          <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
            <div className='me-5 d-none d-lg-block'>
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href='' className='me-4 text-reset'>
                <MDBIcon fab icon="instagram" />
              </a>
              <a href='' className='me-4 text-reset'>
                <MDBIcon fab icon="linkedin" />
              </a>
              <a href='' className='me-4 text-reset'>
                <MDBIcon fab icon="github" />
              </a>
            </div>
          </section>

          <section className=''>
            <MDBContainer className='text-center text-md-start mt-5'>
              <MDBRow className='mt-3'>
                <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>
                    REKKE Project FAU Erlangen-Nürnberg
                  </h6>
                  <p>
                    
                  </p>
                </MDBCol>

                <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Partners</h6>
                  <p>
                    <a href='https://www.geographie.nat.fau.de/' className='text-reset'>
                      Institut für Geographie Erlangen Nürnberg
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Placeholder
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                    Placeholder
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                    Placeholder
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Impressum</h6>
                  
                </MDBCol>

                
              </MDBRow>
            </MDBContainer>
          </section>

          
        </MDBFooter>
      </div>
    </DndProvider>
  );
}

export default App;
