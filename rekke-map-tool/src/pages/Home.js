import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdb-react-ui-kit'
import React, { useState, useEffect } from 'react'
import "./Home.css"
import languages from "../configData/languages.json"
import presetData from "../configData/presets.json"
import { useNavigate } from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Markdown from 'react-markdown'
import menue from '../configData/menue.json'
import introText from '../configData/intro_text.json'
import TripleSwitch from './switch/tripleSwitch'

function Home({
    currentLanguage
}) {


    const navigate = useNavigate();

    const [additionalLayer, setAdditionalLayer] = useState("center")


    function chooseAndNavigate(leftImageNumber, rightImageNumber) {
        window.scrollTo(0, 0);
        
        if(additionalLayer === "left") {
            navigate(`/map?leftImage=${leftImageNumber}&rightImage=${rightImageNumber}&cultureLayer=true&resilienceLayer=false&nature=false&historical=true&landscape=true&monument=true&social=false&sport=false&language=${currentLanguage}`)
        }
        else if(additionalLayer === "right") {
            navigate(`/map?leftImage=${leftImageNumber}&rightImage=${rightImageNumber}&cultureLayer=false&resilienceLayer=true&nature=true&historical=false&landscape=false&monument=false&social=true&sport=true&language=${currentLanguage}`)
        }
        else {
            navigate(`/map?leftImage=${leftImageNumber}&rightImage=${rightImageNumber}&cultureLayer=false&resilienceLayer=false&nature=false&historical=false&landscape=false&monument=false&social=false&sport=false&language=${currentLanguage}`)
        }
    }


    return (
        <MDBContainer>
            <MDBRow className='center_panel my-3 px-2'>
                <MDBRow className='mt-3'>
                    <h2>
                        {languages[currentLanguage].welcomeText}
                    </h2>
                </MDBRow>
                <MDBRow className='my-3 textPpanel'>
                    <h4 style={{textDecoration:"underline", marginBottom:"10px"}}>{introText[currentLanguage].headerFirst}</h4>
                    <p style={{fontSize:"20px", lineHeight:"150%"}}>
                        {introText[currentLanguage].first}

                    </p>
                </MDBRow>
                <MDBRow className='my-3 textPpanel'>
                <h4 style={{textDecoration:"underline", marginBottom:"10px"}}>{introText[currentLanguage].headerSecond}</h4>

                    {introText[currentLanguage].second.map((item, index) => (
                        <p style={{fontSize:"20px"}} key={index}>
                            {item}
                        </p>
                    ))}
                </MDBRow>
                <MDBRow>
                        <MDBRow>
                            <video className="videoTag" autoPlay loop muted>
                                <source src="https://geo-services.geographie.uni-erlangen.de/api/rekke/getVideo?filename=TitleVideo.mov" type="video/mp4" />
                            </video>
                        </MDBRow>
                        <MDBRow className='textPanel'>
                            <p>
                                {
                                    introText[currentLanguage].videoDescription.title
                                }
                            </p>
                        </MDBRow>
                </MDBRow>
            </MDBRow>

            <MDBRow className='center_panel my-3'>

            {/* Generate a grid view with small cards for each item in the preset.json*/}
            <MDBContainer className='p-3' >
                <MDBRow>
                    <h2>
                        {presetData[currentLanguage].title}
                    </h2>
                </MDBRow>
                <MDBRow>
                    <p style={{fontSize:"20px", lineHeight:"150%"}}>
                    {presetData[currentLanguage].description}

                    </p>
                </MDBRow>
                <MDBRow className='mb-3'>
                    <TripleSwitch
                        currentLanguage={currentLanguage}
                        additionalLayer={additionalLayer}
                        setAdditionalLayer={setAdditionalLayer}
                    />

                </MDBRow>
                <MDBRow style={{width:"100%"}}>

                    <MDBTable bordered responsive style={{width:"100%"}}>
                        <MDBTableHead>
                            <tr>
                                <th scope='col' colSpan={2} style={{ borderRight:"2px solid black" }} > </th>
                                <th scope='col' colSpan={2} style={{ fontWeight: "bold", borderBottom:"1px solid grey", borderRight:"2px solid black"  }}>SSP1-2.6</th>
                                <th scope='col' colSpan={2} style={{ fontWeight: "bold", borderBottom:"1px solid grey"  }}>SSP5-5.8</th>
                            </tr>
                            <tr style={{borderBottom:"2px solid black"}}>
                                <th scope='col' colSpan={2} style={{ borderRight:"2px solid black" }}></th>
                                <th scope='col' style={{ fontWeight: "bold", borderRight:"1px solid grey"  }}>2045</th>
                                <th scope='col' style={{ fontWeight: "bold", borderRight:"2px solid black" }}>2085</th>
                                <th scope='col' style={{ fontWeight: "bold", borderRight:"1px solid grey"  }}>2045</th>
                                <th scope='col' style={{ fontWeight: "bold" }}>2085</th>

                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr style={{borderBottom:"1px solid grey"}}>
                                <th className='align-items-center' rowSpan={2} scope='row' style={{ fontWeight: "bold", borderRight:"1px solid grey" }}>SSP1-2.6</th>
                                <th scope="row" style={{ fontWeight: "bold", borderRight:"2px solid black"}}>2045</th>
                                <td style={{borderRight:"1px solid grey"}}>
                                    <MDBIcon fas icon="x" size="2x" />

                                </td>
                                <td style={{borderRight:"2px solid black"}}>
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary"
                                        onClick={() => chooseAndNavigate(0,2)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                                <td style={{borderRight:"1px solid grey"}}>
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary"
                                        onClick={() => chooseAndNavigate(0, 1)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                                <td >
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(0,3)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                            </tr>
                            <tr style={{borderBottom:"2px solid black"}}>
                                <th scope="row" style={{ fontWeight: "bold", borderRight:"2px solid black" }}>2085</th>
                                <td style={{borderRight:"1px solid grey"}}>
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(2, 0)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                                <td style={{borderRight:"2px solid black"}}>
                                    <MDBIcon fas icon="x" size="2x" />

                                </td>
                                <td style={{borderRight:"1px solid grey"}}>
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(2,1)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                                <td >
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(2,3)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                            </tr>
                            <tr style={{borderBottom:"1px solid grey"}}>
                                <th rowSpan={2} scope='row' style={{ fontWeight: "bold", borderRight:"1px solid grey" }}>SSP5-5.8</th>
                                <th scope="row" style={{ fontWeight: "bold", borderRight:"2px solid black" }}>2045</th>
                                <td style={{borderRight:"1px solid grey"}}>
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(1,0)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                                <td style={{borderRight:"2px solid black"}}>
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(1,2)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                                <td style={{borderRight:"1px solid grey"}}>
                                    <MDBIcon fas icon="x" size="2x" />

                                </td>
                                <td >
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(1,3)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                            </tr>
                            <tr >
                                <th scope="row" style={{ fontWeight: "bold", borderRight:"2px solid black" }}>2085</th>
                                <td style={{borderRight:"1px solid grey"}}>
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(3,0)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                                <td style={{borderRight:"2px solid black"}}>
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(3,2)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                                <td style={{borderRight:"1px solid grey"}}>
                                    <MDBBtn
                                        className={`presetButton ${additionalLayer}`}
                                        color="secondary" onClick={() => chooseAndNavigate(3,1)}>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </td>
                                <td >
                                    <MDBIcon fas icon="x" size="2x" />

                                </td>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                    {/* {presetData[currentLanguage]['presets'].map((item) => (
                        <MDBCol key={item.id} md="4" className="mb-4">

                            <MDBCard style={{ height: "100%", backgroundColor: item.color }}>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                        {item.title}

                                    </MDBCardTitle>
                                    <MDBCardText>
                                        <Markdown>
                                            {item.description}
                                        </Markdown>
                                    </MDBCardText>
                                </MDBCardBody>
                                <MDBCardFooter>
                                    <MDBBtn color="secondary" onClick={() => navigate(`/map?leftImage=${item.leftImage}&rightImage=${item.rightImage}&cultureLayer=${item.cultureLayer}&resilienceLayer=${item.resilienceLayer}&nature=${item.nature}&historical=${item.historical}&landscape=${item.landscape}&monument=${item.monument}&social=${item.social}&sport=${item.sport}&language=${item.language}`)
                                    }>
                                        {languages[currentLanguage].preset}
                                    </MDBBtn>
                                </MDBCardFooter>
                            </MDBCard>
                        </MDBCol>
                    ))} */}
                </MDBRow>
                {/* <MDBRow>
                    <p>
                        Karte konfigurieren beschreibung
                    </p> */}
                {/* </MDBRow> */}
            </MDBContainer>


            <MDBRow style={{ width: "100%" }} className='d-flex justify-content-center mb-3'>
                <MDBBtn color="secondary" style={{ width: "50%" }} onClick={() => navigate("/menue/leftImage")}>
                    {languages[currentLanguage].startButton}
                </MDBBtn>
            </MDBRow>
            <MDBRow style={{ width: "100%", height: "20px" }} className='d-flex justify-content-center mb-3'>

            </MDBRow>



            </MDBRow>

        </MDBContainer>
    )
}

export default Home