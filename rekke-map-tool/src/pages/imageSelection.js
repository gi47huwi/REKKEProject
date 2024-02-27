import { MDBAccordion, MDBAccordionItem, MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardImage, MDBCardText, MDBCardTitle, MDBCheckbox, MDBCol, MDBContainer, MDBIcon, MDBRadio, MDBRow } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import menue from '../configData/menue.json'
import languages from '../configData/languages.json'
import { useNavigate } from 'react-router-dom'
import Markdown from 'react-markdown'

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
  const [warning, setWarning] = useState("")

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
      <MDBAccordion style={{ width: "80vw" }} initialActive={1}>
        <MDBAccordionItem collapseId={1} headerTitle={menue.config_items.modelled.title[currentLanguage]}>
          <MDBRow style={{ width: "80vw" }}>
            {menue.config_items.modelled.image_configuration.map((image, index) => {
              return (
                <MDBCard

                  className={addSelectedImage(image)}
                  style={{ width: "20rem", height: "30rem", margin: "10px" }} key={index}
                >
                  <MDBCardImage src={image.src} alt={image.name} style={{ width: "auro", height: "10rem" }} onClick={() => setImage(image.url, side)} />

                  <MDBCardBody>
                    <MDBCardTitle>
                      {menue.ssp[image.ssp].name[currentLanguage] + " "}
                      {menue.time_frames[image.time_frame].name[currentLanguage] + " "}
                      {menue.config_items.modelled.name[currentLanguage] + " "}
                      {menue.scenarios[image.scenario].name[currentLanguage] + " "}
                    </MDBCardTitle>
                    {/* <MDBCardText>
                  <Markdown>

                  {image.description}
                  </Markdown>
                </MDBCardText> */}
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
                          setImage(image.src, side)
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
        </MDBAccordionItem>
        <MDBAccordionItem collapseId={2} headerTitle={menue.config_items.simulated.title[currentLanguage]}>
          <MDBRow style={{ width: "80vw" }}>


            {menue.config_items.simulated.image_configuration.map((image, index) => {
              return (
                <MDBCard

                  className={addSelectedImage(image)}
                  style={{ width: "20rem", height: "30rem", margin: "10px" }} key={index}
                >
                  <MDBCardImage src={image.src} alt={image.name} style={{ width: "auro", height: "10rem" }} onClick={() => setImage(image.url, side)} />

                  <MDBCardBody>
                    <MDBCardTitle>
                      {menue.ssp[image.ssp].name[currentLanguage] + " "}
                      {menue.time_frames[image.time_frame].name[currentLanguage] + " "}
                      {menue.config_items.simulated.name[currentLanguage] + " "}
                      {menue.scenarios[image.scenario].name[currentLanguage] + " "}

                    </MDBCardTitle>
                    {/* <MDBCardText>
                  <Markdown>

                  {image.description}
                  </Markdown>
                </MDBCardText> */}
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

        </MDBAccordionItem>
      </MDBAccordion>

      <MDBRow className='mt-4'>
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
          }} color="danger" style={{ margin: "10px" }}>
            <MDBIcon fas icon="trash-alt" className='mx-3' />
            {languages[currentLanguage].selection.compare_layer.none}
          </MDBBtn>


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
            <MDBIcon fas icon="exchange-alt" className='mx-3' />
            {languages[currentLanguage].selection.compare_layer.switch}
          </MDBBtn>
        </MDBCol>
        <MDBCol>
          <MDBBtn onClick={() => {
            if (side === "left") {
              if (leftImage === null) {
                setWarning(languages[currentLanguage].selection.compare_layer.warning);
                setTimeout(() => {
                  setWarning("")
                }, 3000);

                return
              }

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
      {warning && <MDBRow>
        <h4 className="text-danger">{warning}</h4>
      </MDBRow>}

    </MDBContainer>
  )
}

export default ImageSelection