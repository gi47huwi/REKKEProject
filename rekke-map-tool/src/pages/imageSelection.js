import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage, MDBCardText, MDBCardTitle, MDBCheckbox, MDBCol, MDBContainer, MDBRadio, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import menue from '../configData/menue.json'
import languages from '../configData/languages.json'
import { useNavigate } from 'react-router-dom'

function ImageSelection(
  { side,
    currentLanguage,
    setImage,
    setSecondaryImage,
    leftImage,
    rightImage,
    setPage

  }
) {

  const navigate = useNavigate();

  const addSelectedImage = (image) => {
    if (side === "left") {
      if (leftImage === image.src) {
        return "border border-primary"
      } else if (rightImage === image.src) {
        return "border border-secondary"
      }

    } else {
      if (rightImage === image.src) {
        return "border border-primary"
      } else if (leftImage === image.src) {
        return "border border-secondary"
      }
    }
  }

  return (
    <MDBContainer className='my-4' style={{ width: "100%" }}>
      <MDBRow className='my-3'>
        <h2>
          {languages[currentLanguage].selection.compare_layer.name}
        </h2>
        <h3>{side}</h3>
      </MDBRow>
      <MDBRow style={{ width: "80vw" }}>

        {menue.image_configuration.map((image, index) => {
          return (
            <MDBCard
              // onClick={() => {
              //   if(side === "left"){
              //     if(image.src === rightImage){
              //       return
              //     }
              //   }
              //   if(side === "right"){
              //     if(image.src === leftImage){
              //       return
              //     }
              //   }
              //   setImage(image.src)
              // }}
              className={addSelectedImage(image)}
              style={{ width: "20rem", height: "30rem", margin: "10px" }} key={index}
            >
              <MDBCardImage src={image.src} alt={image.name} style={{ width: "100%", height: "auto" }} onClick={() => setImage(image.url, side)} />
              <MDBCardTitle>{image.name}</MDBCardTitle>
              <MDBCardBody>
                <MDBCardText>
                  {image.description}
                </MDBCardText>
              </MDBCardBody>
              <MDBCardFooter>
                <MDBRadio
                  onClick={
                    () => {
                      if (side === "left") {
                        if (image.src === rightImage) {
                          return
                        }
                      }
                      if (side === "right") {
                        if (image.src === leftImage) {
                          return
                        }
                      }
                      setImage(image.src)
                    }
                  }
                  value={image.src}
                  checked={side === "left" ? leftImage === image.src : rightImage === image.src}
                  disabled={side === "left" ? rightImage === image.src : leftImage === image.src}
                  defaultChecked={
                    side === "left" ? leftImage === image.src : rightImage === image.src
                  }
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  label={languages[currentLanguage].selection.compare_layer.select}
                />

              </MDBCardFooter>
            </MDBCard>

          )

        }
        )}


      </MDBRow>
      <MDBRow>
        <MDBCol>
          <MDBBtn onClick={() => {
            if (side === "left") {
              setPage("pageone");
              navigate("../leftImage");
              window.scrollTo(0, 0);
            } else {
              setPage("pageone");
              navigate("../leftImage");
              window.scrollTo(0, 0);
            }
          }
          } color="secondary" style={{ margin: "10px" }}>Back</MDBBtn>

        </MDBCol>


        <MDBCol>
          <MDBBtn onClick={() => {
            if (side === "left") {
              setImage("none", "left")
            } else {
              setImage("none", "right")
            }
          }} color="danger" style={{ margin: "10px" }}>{languages[currentLanguage].selection.compare_layer.none}</MDBBtn>


        </MDBCol>
        <MDBCol>
          <MDBBtn
            onClick={() => {
              if (side === "left") {
                setSecondaryImage(leftImage);
                setImage(rightImage)
              } else {
                setSecondaryImage(rightImage);
                setImage(leftImage);
              }
            }
            }>
            {languages[currentLanguage].selection.compare_layer.switch}

          </MDBBtn>
        </MDBCol>
        <MDBCol>
          <MDBBtn onClick={() => {
            if (side === "left") {
              setPage("pagetwo");
              navigate("../rightImage");
              //scroll to top
              window.scrollTo(0, 0);
              
            } else {
              setPage("pagethree");
              navigate("../additionalLayer");
              //scroll to top
              window.scrollTo(0, 0);
            }
            
          }} color="success" style={{ margin: "10px" }}>{languages[currentLanguage].selection.compare_layer.submit}</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default ImageSelection