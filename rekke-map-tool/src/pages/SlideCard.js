import { MDBCard, MDBCardBody, MDBCardHeader } from 'mdb-react-ui-kit'
import React from 'react'
import './SliderCard.css'

function SlideCard({
    presetNumber
}) {
  return (
    <>
    <MDBCard  >
        <MDBCardHeader>
        {presetNumber}


        </MDBCardHeader>
        <MDBCardBody>
            <ul>
                <li> preset item 01</li>
                <li> preset item 02</li>
                <li> preset item 03</li>

            </ul>

        </MDBCardBody>

    </MDBCard>
    </>
  )
}

export default SlideCard