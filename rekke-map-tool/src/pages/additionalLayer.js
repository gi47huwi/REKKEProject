import React from 'react'
import { 
  MDBContainer,
   MDBRow, 
   MDBCol, 
   MDBCheckbox, 
   MDBListGroup, 
   MDBListGroupItem, 
   MDBBtn,
   MDBIcon,

  } from 'mdb-react-ui-kit'
import languages from '../configData/languages.json'
import { useNavigate } from 'react-router-dom'

function AdditionalLayer(
  { currentLanguage,
    cultureLayer,
    handleCultureLayer,
    subcultureLayerList,
    handleSubcultureLayer,
    resilianceLayer,
    handleResilianceLayer,
    subresuliencelayerList,
    handleSubresuliencelayer,
    setPage,

  }) {

    const navigate = useNavigate();
    


  return (
    <MDBContainer style={{ height: "80vh" }}>
      <MDBRow className='mt-4' >
        <MDBRow>

          <h3>
            {languages[currentLanguage].selection.additional_layer.name}
          </h3>
        </MDBRow>

        <MDBRow className='my-4 d-flex align-items-center justify-content-center'>
          <MDBCol md="6" className='my-4 d-flex align-items-left justify-content-left'>
            <MDBListGroup style={{ minWidth: '22rem' }} light>

              <MDBListGroupItem>
                <MDBRow>
                  <MDBCol>
                    <MDBCheckbox
                      id='cultureLayer'
                      checked={cultureLayer}
                      onChange={handleCultureLayer}
                    ></MDBCheckbox>
                  </MDBCol>
                  <MDBCol>

                    <h4>
                      {languages[currentLanguage].selection.additional_layer.culture.name}
                    </h4>
                  </MDBCol>

                </MDBRow>
              </MDBListGroupItem>
              {languages[currentLanguage].selection.additional_layer.culture.options.map((item) => {

                return (
                  <MDBListGroupItem
                    className='ps-4'
                    style={{ width: '100%', height: '30%' }}
                  >
                    <MDBRow>
                      <MDBCol
                        style={{ width: '50%' }}
                      >
                        <MDBCheckbox
                          id={item.id}
                          checked={subcultureLayerList[item.id]}
                          onChange={() => handleSubcultureLayer(item.id)}
                        ></MDBCheckbox>
                      </MDBCol>
                      <MDBCol
                        style={{ width: '50%' }}

                      >
                        <h6>
                          {item.name}
                        </h6>
                      </MDBCol>

                    </MDBRow>
                  </MDBListGroupItem>
                );
              })}
            </MDBListGroup>
          </MDBCol>
          <MDBCol md="6" className='d-flex align-items-center justify-content-center'>
            <MDBListGroup style={{ minWidth: '22rem' }} light>

              <MDBListGroupItem>
                <MDBRow>
                  <MDBCol>
                    <MDBCheckbox
                      id='resilianceLayer'
                      checked={resilianceLayer}
                      onChange={handleResilianceLayer}
                    ></MDBCheckbox>
                  </MDBCol>
                  <MDBCol>

                    <h4>
                      {languages[currentLanguage].selection.additional_layer.resiliance.name}
                    </h4>
                  </MDBCol>

                </MDBRow>
              </MDBListGroupItem>
              {languages[currentLanguage].selection.additional_layer.resiliance.options.map((item) => {

                return (
                  <MDBListGroupItem
                    className='ps-4'
                    style={{ width: '100%', height: '30%' }}
                  >
                    <MDBRow>
                      <MDBCol
                        style={{ width: '50%' }}
                      >
                        <MDBCheckbox
                          id={item.id}
                          checked={subresuliencelayerList[item.id]}
                          onChange={() => handleSubresuliencelayer(item.id)}
                        ></MDBCheckbox>
                      </MDBCol>
                      <MDBCol
                        style={{ width: '50%' }}

                      >
                        <h6>
                          {item.name}
                        </h6>
                      </MDBCol>

                    </MDBRow>
                  </MDBListGroupItem>
                );
              })}
            </MDBListGroup>

          </MDBCol>


        </MDBRow>
      </MDBRow >
      <MDBRow>
        <MDBCol>
          <MDBBtn onClick={() => {
            setPage("pagetwo");
            navigate("../rightImage");
            window.scrollTo(0, 0);
          }
          } color="secondary" style={{ margin: "10px" }}>Back</MDBBtn>
        </MDBCol>

        <MDBCol>
          <MDBBtn onClick={() => {
             setPage("pagefour");
             navigate("../selectionOverview");
             //scroll to top
             window.scrollTo(0, 0);
            
          }} color="success" style={{ margin: "10px" }}>{languages[currentLanguage].selection.compare_layer.submit}</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default AdditionalLayer