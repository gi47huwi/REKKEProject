import React, { useState } from 'react'
import languages from '../../configData/languages.json'
import { MDBCol, MDBCollapse, MDBContainer, MDBRadio, MDBRow } from 'mdb-react-ui-kit'
import '../Menue.css'
import { useSearchParams } from 'react-router-dom';

function RadioSelector({
    currentLanguage,
    selectedFilter,
    setSelectedFilter,
    name,
    currentLanguageData

}) {

    const [searchParams, setSearchParams] = useSearchParams();

  return (
    <MDBRow className='d-flex justify-content-center align-items-center square border rounded-8 my-2' style={{ height: "28vh" }}>
        <MDBCol className='d-flex justify-content-center align-items-center ' style={{ height: "100%",overflowX:"hidden", overflowY: "scroll"}}>
            <div className='mt-4'>
                {currentLanguageData.values.map((value, index) => {
                    var defaultCheckedVal = false;
                    if (searchParams.get(name) != null) {
                        var queryVal = searchParams.get(name);
                        if (queryVal == value.id) {
                            defaultCheckedVal = true;
                        }
                    } else {

                    }
                    return <MDBRadio
                        name={name}
                        id={value.id}
                        label={`${value.id}: ${value.label}`}
                        onChange={() => setSelectedFilter(index)}
                        defaultChecked={defaultCheckedVal}
                    />
                })}

            </div>
        </MDBCol>
        <MDBCol style={{ height: "100%", overflowY: "scroll",overflowX:"hidden", padding: "10px" }}>
            <h4>
                {selectedFilter != null && `${currentLanguageData.name}: ${currentLanguageData.values[selectedFilter].id}`}
            </h4>
            <p className='description'>
                {selectedFilter != null && currentLanguageData.values[selectedFilter].details}
            </p>
            {
                selectedFilter != null &&
                <a className='source' target='_blank' href={currentLanguageData.values[selectedFilter].source}>
                    {currentLanguageData.values[selectedFilter].source}
                </a>
            }

        </MDBCol>


    </MDBRow>
  )
}

export default RadioSelector