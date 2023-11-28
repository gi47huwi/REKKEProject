import React, { useEffect, useState } from 'react'
import languages from '../configData/languages.json'
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBRadio, MDBRange, MDBRow } from 'mdb-react-ui-kit'
import './Menue.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import RadioSelector from './menueSelections/RadioSelector';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SlideCard from './SlideCard'


function Menue({
    currentLanguage
}) {
    const [compareTime, setCompareTime] = useState();
    const [climateModel, setClimateModel] = useState();
    const [szenario, setSzenario] = useState();
    const [frequency, setFrequency] = useState();
    const [intensity, setIntensity] = useState();
    const [landuse, setLanduse] = useState();
    const [landcoverage, setLandCoverage] = useState();


    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // var frequency;
    useEffect(() => {
        if (searchParams.get("frequency") != null) {
            var frequencyNumber = searchParams.get("frequency");
            if (frequencyNumber > languages[currentLanguage].selection.frequency.values.length - 1) {
                setFrequency();
            } else {
                setFrequency(searchParams.get("frequency"));

            }
        }

    }, [])

    useEffect(() => {
        // if (searchParams == null) return;
        if (searchParams.get("frequency") != null) {
            var frequencyNumber = searchParams.get("frequency");
            if (frequencyNumber > languages[currentLanguage].selection.frequency.values.length - 1) {
                setFrequency();
            } else {
                setFrequency(searchParams.get("frequency"));

            }
        }
        if (searchParams.get("model") != null) {
            setClimateModel(searchParams.get("model"));


        }
        if (searchParams.get("szenario") != null) {
            setSzenario(searchParams.get("szenario"));
        }
        if (searchParams.get("time") != null) {
            setCompareTime(searchParams.get("time"));
        }



    }, [searchParams])




    return (
        <>
            <MDBCol>
                <MDBRow className='mb-3'>
                    <MDBCol sm={1} md={1} >
                        <h3 className='turned'>
                            {languages[currentLanguage].preset}
                        </h3>
                    </MDBCol>
                    <MDBCol md={10} sm={10}>
                        <Swiper
                            modules={[Navigation, Pagination, A11y]}
                            spaceBetween={30}
                            allowTouchMove
                            slidesPerView={window.innerWidth < 775 ? 1 : 3}
                            navigation
                            pagination={{ clickable: true }}>
                            <SwiperSlide >
                                <SlideCard
                                    presetName={"worst"}
                                    model="1"
                                    szenario={2}
                                    frequency={3}
                                />
                            </SwiperSlide>
                            <SwiperSlide >
                                <SlideCard
                                    presetName={"easy"}
                                    model="0"
                                    szenario={1}
                                    frequency={0}
                                />
                            </SwiperSlide>
                            <SwiperSlide >
                                <SlideCard
                                    presetName={"moderate"}
                                    model="0"
                                    szenario={2}
                                    frequency={2}
                                />
                            </SwiperSlide>
                            <SwiperSlide >
                                <SlideCard
                                    presetName={"high"}
                                    model="1"
                                    szenario={3}
                                    frequency={2}
                                />
                            </SwiperSlide>
                        </Swiper>

                    </MDBCol>

                </MDBRow>
                <MDBRow className='outer-row my-4'>
                    <MDBCol sm={1} md={1} >
                        <h3 className='turned'>
                            {languages[currentLanguage].selection.time.name}
                        </h3>
                    </MDBCol>

                    <MDBCol sm={10} md={10}>
                        <RadioSelector
                            currentLanguage={currentLanguage}
                            selectedFilter={compareTime}
                            setSelectedFilter={(val) => setCompareTime(val)}
                            name={"time"}
                            currentLanguageData={languages[currentLanguage].selection.time}
                        />


                    </MDBCol>


                </MDBRow>
                <MDBRow className='outer-row my-4'>
                    <MDBCol sm={1} md={1} >
                        <h3 className='turned'>
                            {languages[currentLanguage].selection.climate.name}
                        </h3>
                    </MDBCol>

                    <MDBCol sm={10} md={10}>
                        <RadioSelector
                            currentLanguage={currentLanguage}
                            selectedFilter={climateModel}
                            setSelectedFilter={(val) => setClimateModel(val)}
                            name={"model"}
                            currentLanguageData={languages[currentLanguage].selection.climate}
                        />


                    </MDBCol>


                </MDBRow>
                <MDBRow className='outer-row my-3'>

                    <MDBCol sm={1} md={1}>
                        <h3 className='turned'>
                            {languages[currentLanguage].selection.szenario.name}
                        </h3>
                    </MDBCol>
                    <MDBCol sm={10} md={10}>
                        <RadioSelector
                            currentLanguage={currentLanguage}
                            name={"szenario"}
                            currentLanguageData={languages[currentLanguage].selection.szenario}
                            selectedFilter={szenario}
                            setSelectedFilter={(val) => setSzenario(val)}
                        />

                    </MDBCol>

                </MDBRow>
                
                <MDBRow className='outer-row my-4 '>

                    <MDBCol sm={1} md={1} >
                        <h3 className='turned'>
                            {languages[currentLanguage].selection.intensity.name}
                        </h3>
                    </MDBCol>
                    <MDBCol sm={10} md={10}>
                        <MDBRow className='square border rounded-8 my-2' style={{ height: "80%" }}>
                            <MDBCol>
                                Val01
                            </MDBCol>
                            <MDBCol>
                                Val01
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className='outer-row my-4 '>

                    <MDBCol sm={1} md={1}>
                        <h3 className='turned'>
                            {languages[currentLanguage].selection.landuse.name}
                        </h3>
                    </MDBCol>
                    <MDBCol sm={10} md={10}>
                        <MDBRow className='square border rounded-8 my-2' style={{ height: "80%" }}>
                            <MDBCol>
                                Val01
                            </MDBCol>
                            <MDBCol>
                                Val01
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>
                </MDBRow>
                <MDBRow className='outer-row my-4 '>
                    <MDBCol sm={1} md={1}>
                        <h3 className='turned'>
                            {languages[currentLanguage].selection.landcoverage.name}
                        </h3>
                    </MDBCol>
                    <MDBCol sm={10} md={10}>
                        <MDBRow className='square border rounded-8 my-2' style={{ height: "80%" }}>
                            <MDBCol>
                                Val01
                            </MDBCol>
                            <MDBCol>
                                Val01
                            </MDBCol>
                        </MDBRow>

                    </MDBCol>

                </MDBRow>
                <MDBRow className='outer-row my-4 '>
                    <MDBRow className='my-4 '>

                        <h3 >
                            {languages[currentLanguage].showMap}
                        </h3>
                    </MDBRow>


                </MDBRow>
                <MDBRow className='my-4 '>
                    <MDBBtn onClick={() => navigate("/map/001")} >
                        {languages[currentLanguage].showMap}
                    </MDBBtn>

                </MDBRow>



            </MDBCol>
        </>
    )
}

export default Menue