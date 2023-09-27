import React, { useState } from 'react'
import languages from '../configData/languages.json'
import { MDBCol, MDBCollapse, MDBContainer, MDBRadio, MDBRow } from 'mdb-react-ui-kit'
import './Menue.css'
import { useSearchParams } from 'react-router-dom';
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
                        setSelectedFilter={(val)=>setClimateModel(val)}
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
                            setSelectedFilter={(val)=>setSzenario(val)}
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
                    <h3 >
                        {languages[currentLanguage].showMap}
                    </h3>


                </MDBRow>


            </MDBCol>
        </>
    )
}

export default Menue