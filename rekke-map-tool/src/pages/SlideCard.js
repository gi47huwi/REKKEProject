import { MDBCard, MDBCardBody, MDBCardHeader } from 'mdb-react-ui-kit'
import React from 'react'
import './SliderCard.css'
import { useNavigate } from 'react-router-dom'

function SlideCard({
  presetName,
  model,
  szenario,
  frequency,
}) {

  const navigate = useNavigate();

  return (
    <>
      <MDBCard  onClick={()=>navigate(`/menue?model=${model}&szenario=${szenario}&frequency=${frequency}`)}>
        <MDBCardHeader>
          {presetName}


        </MDBCardHeader>
        <MDBCardBody>
          <ul>
            <li> {model}</li>
            <li> {szenario}</li>
            <li> {frequency}</li>

          </ul>

        </MDBCardBody>

      </MDBCard>
    </>
  )
}

export default SlideCard