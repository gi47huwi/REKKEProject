import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import "./Home.css"
import languages from "../configData/languages.json"
import { useNavigate } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SlideCard from './SlideCard'


function Home({
    currentLanguage
}) {

    const navigate = useNavigate();
    return (
        <>
            <div className='d-flex center_panel justify-content-center align-items-center'>
                <MDBCol>
                    <MDBRow className='mb-3'>
                        <h2>
                            {languages[currentLanguage].welcomeText}
                        </h2>

                    </MDBRow>
                    <MDBRow className='mb-4'>
                        <p>
                            {languages[currentLanguage].instruction}
                        </p>

                    </MDBRow>
                </MDBCol>
                <MDBRow className='position-absolute align-items-center justify-content-center' style={{ bottom: "15vh"}}>
                    <MDBBtn color="secondary" onClick={() => navigate("/menue")}>
                        {languages[currentLanguage].startButton}

                    </MDBBtn>


                </MDBRow>

            </div>
            <hr />
            <div className='bottom_panel'>
                <h3>
                    {languages[currentLanguage].preset}
                </h3>
                <div className='backgroundSwiper'>
                <Swiper 
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={30}
                    allowTouchMove
                    slidesPerView={window.innerWidth<775?1:3}
                    navigation
                    pagination={{ clickable: true }}>
                    <SwiperSlide >
                        <SlideCard
                            presetNumber={1}
                        />

                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideCard
                            presetNumber={2}

                        />

                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideCard
                            presetNumber={3}

                        />

                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideCard
                            presetNumber={4}

                        />

                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideCard
                            presetNumber={5}

                        />

                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideCard
                            presetNumber={6}

                        />

                    </SwiperSlide>

                </Swiper>
                </div>

            </div>





        </>
    )
}

export default Home