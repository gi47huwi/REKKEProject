import logo from './logo.svg';
import './App.css';
import { MDBDropdownToggle, MDBNavbar, MDBNavbarBrand, MDBContainer, MDBNavbarToggler, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBCollapse, MDBDropdown, MDBDropdownItem, MDBDropdownMenu } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { BrowserRouter, NavLink, Outlet, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menue from './pages/Menue';
import Info from './pages/Info';
import Settings from './pages/Settings';
import Map from './pages/Map';
import languages from "./configData/languages.json"
import CookieConsent from "react-cookie-consent";


function App() {
  const [showNav, setShowNav] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("de");

  return (
    <div className="App">
      <MDBNavbar light expand="md" sticky style={{backgroundColor:"rgb(175, 213, 175)"}}> 
        <MDBContainer fluid >
          <MDBNavbarBrand href='/'>
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
        <Route path="/" element={<Home currentLanguage={currentLanguage} />} />
        <Route path="menue" element={<Menue currentLanguage={currentLanguage} />} />
        <Route path="map/:mapID" element={<Map currentLanguage={currentLanguage} />} />
        <Route path="info" element={<Info currentLanguage={currentLanguage} />} />
        {/* <Route path="settings" element={<Settings />} /> */}

      </Routes>
      <CookieConsent
  location="bottom"
  buttonText="Sure man!!"
  cookieName="myAwesomeCookieName2"
  style={{ background: "#2B373B" }}
  buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
  expires={150}
>
  This website uses cookies to enhance the user experience.{" "}
  <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>
</CookieConsent>
    </div>
  );
}

export default App;
