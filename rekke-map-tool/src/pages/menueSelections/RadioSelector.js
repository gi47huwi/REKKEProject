import React, { useEffect, useState } from 'react'
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
    const [defaultCheckedVal, setDefaultChecked] = useState({});

    useEffect(() => {
        currentLanguageData.values.map((value, index) => {
            setDefaultChecked(prev => ({
                ...prev,
                [index]: false
            }))

        });
        if (searchParams.get(name) != null) {
            currentLanguageData.values.map((element, index) => {
                if (element.id == searchParams.get(name)) {
                    setSelectedFilter(index);
                    setDefaultChecked(prev => ({
                        ...prev,
                        [index]: true
                    }))


                }
            })
        }

    }, [])

    useEffect(() => {
        // if (searchParams.get(name) == null) {
        //     currentLanguageData.values.map((value, index) => {
        //         setDefaultChecked(prev => ({
        //             ...prev,
        //             [index]: false
        //         }))

        //     });
        // } else {
        //     setDefaultChecked(prev => ({
        //         ...prev,
        //         [searchParams.get(name)]: true
        //     }))

        // }
        console.log(`${name} ${searchParams.get(name)}`)
        currentLanguageData.values.map((value, index) => {

            if (searchParams.get(name) == index) {
                console.log(`${name} ${index}`)

                setDefaultChecked(prev => ({
                    ...prev,
                    [index]: true
                }));

            } else {
                setDefaultChecked(prev => ({
                    ...prev,
                    [index]: false
                }))

            }


        });


    }, [searchParams])


    return (
        <MDBRow className='d-flex justify-content-center align-items-center square border rounded-8 my-2' style={{ height: "28vh" }}>
            <MDBCol className='d-flex justify-content-center align-items-center ' style={{ height: "100%", overflowX: "hidden", overflowY: "scroll" }}>
                <div className='mt-4'>
                    {currentLanguageData.values.map((value, index) => {
                        // var defaultCheckedVal = false;
                        // if (searchParams.get(name) != null) {
                        //     var queryVal = searchParams.get(name);
                        //     if (queryVal == value.id) {
                        //         defaultCheckedVal = true;
                        //     }
                        // }
                        return <MDBRadio
                            name={name}
                            id={index}
                            label={`${value.label}`}
                            onChange={() => setSelectedFilter(index)}
                            defaultChecked={defaultCheckedVal[index]}
                        />
                    })}

                </div>
            </MDBCol>
            <MDBCol style={{ height: "100%", overflowY: "scroll", overflowX: "hidden", padding: "10px" }}>
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