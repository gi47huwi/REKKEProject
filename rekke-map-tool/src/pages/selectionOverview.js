import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardTitle, MDBCardImage, MDBCardBody, MDBCardText, MDBBtn, MDBCardFooter } from 'mdb-react-ui-kit'
import React, {useEffect} from 'react'
import languages from '../configData/languages.json'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import menue from '../configData/menue.json'

function SelectionOverview(
  { currentLanguage,
    leftImage,
    rightImage,
    cultureLayer,
    subcultureLayerList,
    resilianceLayer,
    subresuliencelayerList,
    setPage,
    setLeftImage,
    setRightImage,
    setCultureLayer,
    setResilianceLayer,
    setSubcultureLayerList,
    setSubresuliencelayerList

  }
) {
  const navigate = useNavigate();

  const [parameters, setParameters] = useSearchParams();

  useEffect(() => {
    if(parameters){
      const leftImage = parameters.get("leftImage");
      const rightImage = parameters.get("rightImage");
      const cultureLayer = parameters.get("cultureLayer");
      const resilianceLayer = parameters.get("resilianceLayer");
      const social = parameters.get("social");
      const nature = parameters.get("nature");
      const sport = parameters.get("sport");
      const historical = parameters.get("historical");
      const landscape = parameters.get("landscape");
      const monument = parameters.get("monument");
      const language = parameters.get("language");

      if (leftImage != null) {
        console.log(leftImage);

        if (leftImage >= menue.config_items.simulated.image_configuration.length) {
          setLeftImage(menue.config_items.modelled.image_configuration.find((element) => element.id == leftImage));
          console.log(menue.config_items.modelled.image_configuration.find((element) => element.id == leftImage));  
        } else {
          setLeftImage(menue.config_items.simulated.image_configuration.find((element) => element.id == leftImage));
          
        }
      }
      if (rightImage != null) {
        if (rightImage >= menue.config_items.simulated.image_configuration.length) {
          setRightImage(menue.config_items.modelled.image_configuration.find((element) => element.id == rightImage));
        } else {
          setRightImage(menue.config_items.simulated.image_configuration.find((element) => element.id == rightImage));
        }
  
      }

      // setLeftImage(leftImage);
      // setRightImage(rightImage);
      setCultureLayer(cultureLayer);
      setResilianceLayer(resilianceLayer);
      // setSubcultureLayerList([historical, landscape, monument]);
      // setSubresuliencelayerList([social, nature, sport]);
      setPage("pagefour");
    }
  }, [parameters])
  


  function imageCard(side, image){
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
        <MDBCardImage src={image.src} position='top' alt='...' />
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
    <MDBContainer style={{ height: "fit-content" }}>
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
            if(leftImage === null || rightImage === null){
              alert("Please select both images to proceed")
            }            
            navigate(
              "/map?leftImage=" + leftImage.id + 
            "&rightImage=" + rightImage.id + 
            "&cultureLayer=" + cultureLayer + 
            "&resilienceLayer=" + resilianceLayer +  
            "&social=" + subresuliencelayerList[0] +
            "&nature=" + subresuliencelayerList[1] +
            "&sport=" + subresuliencelayerList[2] +
            "&historical=" + subcultureLayerList[0] +
            "&landscape=" + subcultureLayerList[1] +
            "&monument=" + subcultureLayerList[2] +
            "&language=" + currentLanguage)
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