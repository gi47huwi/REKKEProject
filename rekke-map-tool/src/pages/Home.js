import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter } from 'mdb-react-ui-kit'
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


function Home({
    currentLanguage
}) {


    const navigate = useNavigate();
    return (
        <MDBContainer>
            <MDBRow className='center_panel my-3'>
                <MDBRow>
                    <h2>
                        {languages[currentLanguage].welcomeText}
                    </h2>
                </MDBRow>
                <MDBRow>
                    {/*Display the titleVideo in a loop video*/}
                    <video className="videoTag" autoPlay loop muted>
                        <source src="https://geo-services.geographie.uni-erlangen.de/api/rekke/getVideo?filename=TitleVideo.mov" type="video/mp4" />
                    </video>
                </MDBRow>

            </MDBRow>



            {/* Generate a grid view with small cards for each item in the preset.json*/}
            <MDBContainer className='backgroundContainer p-3'>
                <MDBRow>
                    {presetData[currentLanguage].map((item) => (
                        <MDBCol key={item.id} md="4" className="mb-4">

                            <MDBCard style={{ height: "100%" }}>
                                <MDBCardBody>
                                    <MDBCardTitle>{item.name}</MDBCardTitle>
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
                    ))}
                </MDBRow>
            </MDBContainer>

            <MDBRow style={{ width: "100%" }} className='d-flex justify-content-center mb-3'>
                <MDBBtn color="secondary" style={{ width: "50%" }} onClick={() => navigate("/menue")}>
                    {languages[currentLanguage].startButton}
                </MDBBtn>
            </MDBRow>
            <MDBRow style={{ width: "100%", height: "20px" }} className='d-flex justify-content-center mb-3'>

            </MDBRow>




        </MDBContainer>
    )
}

export default Home