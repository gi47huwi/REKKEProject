import React, { useEffect, useState } from 'react'
import languages from '../configData/languages.json'
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBRadio, MDBRange, MDBRow } from 'mdb-react-ui-kit'
import './Menue.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import RadioSelector from './menueSelections/RadioSelector';


function Menue({
    currentLanguage
}) {

    const [climateModel, setClimateModel] = useState();

    const [szenario, setSzenario] = useState();
    const [frequency, setFrequency] = useState();
    const [intensity, setIntensity] = useState();
    const [landuse, setLanduse] = useState();
    const [landcoverage, setLandCoverage] = useState();


    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // var frequency;
    useEffect(()=>{
        if(searchParams.get("frequency")!=null){
            setFrequency(searchParams.get("frequency"));
        }

    },[])




    return (
        <>
            <MDBCol>
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
                <MDBRow className='outer-row my-3'>

                    <MDBCol sm={1} md={1}>
                        <h3 className='turned'>
                            {languages[currentLanguage].selection.frequency.name}
                        </h3>
                    </MDBCol>
                    <MDBCol sm={10} md={10}>
                        <MDBRow className=' square border rounded-8 my-2' style={{ height: "28vh" }}>
                            <MDBCol style={{ height: "100%", overflowX: "hidden", overflowY: "scroll"}} className='rangeCol'>
                                    
                                    <MDBRange
                                        value={frequency}
                                        onChange={(val)=>{
                                            console.log(val);
                                            setFrequency(val.target.valueAsNumber)}}
                                        min='0'
                                        max={languages[currentLanguage].selection.frequency.values.length-1}
                                        step='1'
                                        id='heatFrequency'
                                        label={languages[currentLanguage].selection.frequency.name}
                                    />

                            </MDBCol>
                            <MDBCol style={{ height: "100%", overflowY: "scroll", overflowX: "hidden", padding: "10px" }}>
                                <h4>
                                    {frequency != null && `${languages[currentLanguage].selection.frequency.name}: ${languages[currentLanguage].selection.frequency.values[frequency].id}`}
                                </h4>
                                <p className='description'>
                                    {frequency != null && languages[currentLanguage].selection.frequency.values[frequency].details}
                                </p>
                                {
                                    frequency != null &&
                                    <a className='source' target='_blank' href={languages[currentLanguage].selection.frequency.values[frequency].source}>
                                        {languages[currentLanguage].selection.frequency.values[frequency].source}
                                    </a>
                                }

                            </MDBCol>



                        </MDBRow>

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
                    <MDBBtn onClick={()=>navigate("/map/001")} >
                    {languages[currentLanguage].showMap}
                    </MDBBtn>

                </MDBRow>



            </MDBCol>
        </>
    )
}

export default Menue