import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardTitle, MDBCardImage, MDBCardBody, MDBCardText, MDBBtn, MDBCardFooter } from 'mdb-react-ui-kit'
import React from 'react'
import languages from '../configData/languages.json'
import { useNavigate } from 'react-router-dom'

function SelectionOverview(
  { currentLanguage,
    leftImage,
    rightImage,
    cultureLayer,
    subcultureLayerList,
    resilianceLayer,
    subresuliencelayerList,
    setPage,
  }
) {
  const navigate = useNavigate();


  function imageCard(side, image){
    console.log(image)
    if(image === null){
      return <MDBCard style={{ width: '22rem', height: "32rem", padding:"5px 5px 5px 5px" }}>
        <MDBCardTitle>
          {languages[currentLanguage].selection.compare_layer[side]}
        </MDBCardTitle>
        <MDBCardBody>
          <MDBCardText>
            {languages[currentLanguage].selection.compare_layer.no_image}
          </MDBCardText>
          <MDBCardText>
            {languages[currentLanguage].selection.compare_layer.waring}
          </MDBCardText>
          
        </MDBCardBody>
        <MDBCardFooter>
        <MDBBtn onClick={() => {
            if(side === "left"){
              setPage("pageone");
              navigate("../leftImage");
            }
            if(side === "right"){
              setPage("pagetwo");
              navigate("../rightImage");
            }
          }}>
            {languages[currentLanguage].selection.compare_layer.select}
          </MDBBtn>
        </MDBCardFooter>

      </MDBCard>
    }else{
      return <MDBCard style={{ width: '22rem', height: "32rem", padding:"5px 5px 5px 5px" }}>
        <MDBCardTitle>
          {languages[currentLanguage].selection.compare_layer[side]}
        </MDBCardTitle>
        <MDBCardImage src={image} position='top' alt='...' />
        <MDBCardBody>
          <MDBCardText>
            {languages[currentLanguage].selection.compare_layer[side]}
          </MDBCardText>
        </MDBCardBody>
        <MDBCardFooter>
          <MDBBtn onClick={() => {
            if(side === "left"){
              setPage("pageone");
              navigate("../leftImage");
            }
            if(side === "right"){
              setPage("pagetwo");
              navigate("../rightImage");
            }
          }
          } color="secondary" style={{ margin: "10px" }}>
            {languages[currentLanguage].selection.compare_layer.change}
          </MDBBtn>
        </MDBCardFooter>
      </MDBCard>


    }
    
  }


  return (
    <MDBContainer style={{ height: "80vh" }}>
      <MDBRow className='mt-4' >
        <MDBRow>
          <h3>
            {languages[currentLanguage].selection.overview.name}
          </h3>
        </MDBRow>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          {imageCard("left", leftImage)}
        </MDBCol>
        <MDBCol>
          {imageCard("right", rightImage)}
        </MDBCol>
        <MDBCol>
          <MDBCard style={{ width: '22rem', height: "32rem", padding:"5px 5px 5px 5px" }}>
            <MDBCardTitle>
              {languages[currentLanguage].selection.additional_layer.title}
            </MDBCardTitle>
            <MDBCardBody>
              <MDBCardText>
                <h6 style={{fontWeight:"bold"}}>
                {languages[currentLanguage].selection.additional_layer.culture.name}
                </h6>
                {subcultureLayerList.length > 0 ?
                subcultureLayerList.map((item, index) => {
                  if(item){
                    return (
                      <MDBCardText>
                        {languages[currentLanguage].selection.additional_layer.culture.options[index].name}
                      </MDBCardText>
                    );
                  }
                })
                : languages[currentLanguage].selection.additional_layer.warning}
              </MDBCardText>
              <MDBCardText>
                <h6 style={{fontWeight:"bold"}}>
                {languages[currentLanguage].selection.additional_layer.resiliance.name}
                </h6>
                {subresuliencelayerList.length > 0 ?
                subresuliencelayerList.map((item, index) => {
                  if(item){
                    return (
                      <MDBCardText>
                        {languages[currentLanguage].selection.additional_layer.resiliance.options[index].name}
                      </MDBCardText>
                    );
                  }
                })
                : languages[currentLanguage].selection.additional_layer.warning}

              </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter>
              <MDBBtn onClick={() => {
                setPage("pagethree");
                navigate("../additionalLayer");
              }
              } color="secondary" style={{ margin: "10px" }}>
                {languages[currentLanguage].selection.additional_layer.change}
              </MDBBtn>
            </MDBCardFooter>
          </MDBCard>

        </MDBCol>
      </MDBRow>
      <hr />
      <MDBRow className='mt-4'>
        <MDBCol>
          <MDBBtn onClick={() => {
            setPage("pageone");
            navigate("../leftImage");
          }
          } color="secondary" style={{ margin: "10px" }}>
            {languages[currentLanguage].startAgain}
          </MDBBtn>
        </MDBCol>
        <MDBCol>
          <MDBBtn onClick={() => {
            setPage("pagetwo");
            navigate("../rightImage");
          }
          } color="secondary" style={{ margin: "10px" }}>
            {languages[currentLanguage].showMap}
          </MDBBtn>
        </MDBCol>
        </MDBRow>
    </MDBContainer>
  )
}

export default SelectionOverview