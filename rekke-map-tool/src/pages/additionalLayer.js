import React from 'react'
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import languages from '../configData/languages.json'

function AdditionalLayer(
    {currentLanguage}
) {
  return (
    <MDBContainer style={{height:"80vh"}}>
      <MDBRow style={{height:"10%"}}>
        <h2>
          {languages[currentLanguage].selection.additional_layer.name}
        </h2>
      </MDBRow>
      <MDBRow>


      </MDBRow>
    </MDBContainer>
  )
}

export default AdditionalLayer