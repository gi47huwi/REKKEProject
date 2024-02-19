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
import ImageSelection from './pages/imageSelection';
import AdditionalLayer from './pages/additionalLayer';
import SelectionOverview from './pages/selectionOverview';
import LeftImageSelection from './pages/leftImageSelection';
import RightImageSelection from './pages/rightImageSelection';


function App() {
  const [showNav, setShowNav] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("de");
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;


  const [page, setPage] = useState("pageone");

  const [leftImage, setLeftImage] = useState(null)
  const [rightImage, setRightImage] = useState(null)
  const [warning, setWarning] = useState(false)
  const [cultureLayer, setCultureLayer] = useState(false)
  const [resilianceLayer, setResilianceLayer] = useState(false)
  const [subcultureLayer1, setSubcultureLayer1] = useState(false)
  const [subcultureLayer2, setSubcultureLayer2] = useState(false)
  const [subcultureLayer3, setSubcultureLayer3] = useState(false)
  const [subresuliencelayer1, setSubresuliencelayer1] = useState(false)
  const [subresuliencelayer2, setSubresuliencelayer2] = useState(false)
  const [subresuliencelayer3, setSubresuliencelayer3] = useState(false)
  var subcultureLayerList = [
    subcultureLayer1,
    subcultureLayer2,
    subcultureLayer3
  ]
  var setSubCultureLayerList = [
    setSubcultureLayer1,
    setSubcultureLayer2,
    setSubcultureLayer3
  ]

  var subresuliencelayerList = [
    subresuliencelayer1,
    subresuliencelayer2,
    subresuliencelayer3
  ]
  var setSubResuliencelayerList = [
    setSubresuliencelayer1,
    setSubresuliencelayer2,
    setSubresuliencelayer3
  ]
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

                  <NavLink to={`menue/leftImage`}>
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
          <Route path="menue" element={
          <Menue 
          currentLanguage={currentLanguage} 
          leftImage={leftImage}
          rightImage={rightImage}
          cultureLayer={cultureLayer}
          resilianceLayer={resilianceLayer}
          subcultureLayerList={subcultureLayerList}
          subresuliencelayerList={subresuliencelayerList}
          page={page}
          setPage={setPage}


          />
          }>
            <Route path="leftImage" element={
            <ImageSelection 
            side="left" 
            currentLanguage={currentLanguage}
            setImage={setLeftImage}
            setSecondaryImage={setRightImage}
            leftImage={leftImage}
            rightImage={rightImage}
            setPage={setPage}

            
             />
            } />
            <Route path="rightImage" element={
            <ImageSelection 
            side="right" 
            currentLanguage={currentLanguage}
            setImage={setRightImage}
            setSecondaryImage={setLeftImage}
            leftImage={leftImage}
            rightImage={rightImage}
            setPage={setPage}

            />
            } />
            <Route path="additionalLayer" element={<AdditionalLayer currentLanguage={currentLanguage} />} />
            <Route path="selectionOverview" element={<SelectionOverview currentLanguage={currentLanguage} />} />


          </Route>
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
