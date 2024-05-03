import React, { useState, useRef, useEffect } from 'react';
import './Map.css'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import L, { LatLngBounds } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { ImageOverlay } from 'react-leaflet/ImageOverlay'
import { LayerGroup, LayersControl, useMapEvent, useMapEvents } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import menue from '../configData/menue.json'
import languages from '../configData/languages.json'
import LegendDummy from '../configData/LegendDummy.png'
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTooltip } from 'mdb-react-ui-kit';

async function toHTMLImage(geoTiffDataRGB, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;  // array of RGBA values


  // convert GeoTiff's RGB values to ImageData's RGBA values
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const srcIdx = 3 * i * width + 3 * j;
      const idx = 4 * i * width + 4 * j;
      data[idx] = geoTiffDataRGB[srcIdx];
      data[idx + 1] = geoTiffDataRGB[srcIdx + 1];
      data[idx + 2] = geoTiffDataRGB[srcIdx + 2];
      data[idx + 3] = 255;  // fully opaque
    }
  }
  ctx.putImageData(imageData, 0, 0);

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    image.src = canvas.toDataURL();
  });
}

function MapView({
  currentLanguage
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [leftImage, setLeftImage] = useState()
  const [rightImage, setRightImage] = useState()
  const [leftImageData, setLeftImageData] = useState()
  const [rightImageData, setRightImageData] = useState()
  const [culturalLayer, setCulturalLayer] = useState()
  const [resilienceLayer, setResilienceLayer] = useState()
  const [historicalRelevantLayer, setHistoricalRelevantLayer] = useState()
  const [monumentLayer, setMonumentLayer] = useState()
  const [landscapeFeatureLayer, setLandscapeFeatureLayer] = useState()
  const [socialMeetingLayer, setSocialMeetingLayer] = useState()
  const [closeNatureLayer, setCloseNatureLayer] = useState()
  const [sportsLayer, setSportsLayer] = useState()

  const previoisClickedLayer = useRef();
  const [showPopupOverlay, setShowPopupOverlay] = useState(true);

  const [southWest, setSouthWest] = useState([49.5333, 9.9])
  const [northEast, setNorthEast] = useState([49.9333, 10.7])

  const bounds = new LatLngBounds(southWest, northEast);
  const [leftBound, setLeftBound] = useState(50);
  const [dragLeft, setDragLeft] = useState("50%");
  const [showDrag, setShowDrag] = useState(false);
  var map;
  const [popupData, setPopupData] = useState({});

  const [showLegend, setShowLegend] = useState(true);

  const [sliderGrabbed, setSliderGrabbed] = useState(false);


  const fetchData = async (imageURL) => {
    console.log(imageURL)
    try {
      const response = await fetch(imageURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setNorthEast(prev => [jsonData['north'] - 0.001, jsonData['east']])
      setSouthWest(prev => [jsonData['south'] - 0.001, jsonData['west']])
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //fetch the image src from the search query and the menue.json
  useEffect(() => {

    // scroll to top of page
    window.scrollTo(0, 0)
    //fetch the image data id from searchparams for leftImage and rightImage
    if (searchParams.get("leftImage") != null) {

      if (searchParams.get("leftImage") >= menue.config_items.simulated.image_configuration.length) {
        // console.log(menue.config_items.modelled.image_configuration.find((element) => element.id == searchParams.get("leftImage")));
        setLeftImage(menue.config_items.modelled.image_configuration.find((element) => element.id == searchParams.get("leftImage")));
        // fetchData(menue.config_items.modelled.image_configuration.find((element) => element.id == searchParams.get["leftImage"]));
      } else {
        setLeftImage(menue.config_items.simulated.image_configuration.find((element) => element.id == searchParams.get("leftImage")));
        fetchData(menue.config_items.simulated.image_configuration.find((element) => element.id == searchParams.get["leftImage"]));

      }
    }
    if (searchParams.get("rightImage") != null) {
      if (searchParams.get("rightImage") >= menue.config_items.simulated.image_configuration.length) {
        // console.log(menue.config_items.modelled.image_configuration.find((element) => element.id == searchParams.get("rightImage")));
        setRightImage(menue.config_items.modelled.image_configuration.find((element) => element.id == searchParams.get("rightImage")));
        // fetchData(menue.config_items.modelled.image_configuration.find((element) => element.id == searchParams.get['rightImage']).meta)
      } else {
        setRightImage(menue.config_items.simulated.image_configuration.find((element) => element.id == searchParams.get("rightImage")));
        // fetchData(menue.config_items.simulated.image_configuration.find((element) => element.id == searchParams.get['rightImage']).meta);
      }

    }
    if (searchParams.get("historical")) {
      //fetch the historical folder from the server
      getGeojsonFolder(languages[currentLanguage].selection.additional_layer.culture.options[0].src).then((data) => {
        //fetch the geojson data from the server
        var jsonList = []
        data.forEach((element) => {
          getGeojson(element, languages[currentLanguage].selection.additional_layer.culture.options[0].src).then((geojson) => {
            //set the geojson data to the state
            jsonList.push(geojson)
          })
        })
        setHistoricalRelevantLayer(jsonList)
      })
    }
    if (searchParams.get("landscape")) {
      //fetch the landscape folder from the server
      getGeojsonFolder(languages[currentLanguage].selection.additional_layer.culture.options[1].src).then((data) => {
        //fetch the geojson data from the server
        if (data == undefined) {
          return
        }
        var jsonList = []
        data.forEach((element) => {
          getGeojson(element, languages[currentLanguage].selection.additional_layer.culture.options[1].src).then((geojson) => {
            //set the geojson data to the state
            jsonList.push(geojson)
          })
        })
        setLandscapeFeatureLayer(jsonList)
      })
    }
    if (searchParams.get("monument")) {
      //fetch the monument folder from the server
      getGeojsonFolder(languages[currentLanguage].selection.additional_layer.culture.options[2].src).then((data) => {
        //fetch the geojson data from the server
        if (data == undefined) {
          return
        }
        var jsonList = []
        data.forEach((element) => {
          getGeojson(element, languages[currentLanguage].selection.additional_layer.culture.options[2].src).then((geojson) => {
            //set the geojson data to the state
            jsonList.push(geojson)
          })
        })
        setMonumentLayer(jsonList)
      })
    }

    if (searchParams.get("social")) {
      //fetch the social folder from the server
      getGeojsonFolder(languages[currentLanguage].selection.additional_layer.resiliance.options[0].src).then((data) => {
        //fetch the geojson data from the server
        if (data == undefined) {
          return
        }
        var jsonList = []
        data.forEach((element) => {
          getGeojson(element, languages[currentLanguage].selection.additional_layer.resiliance.options[0].src).then((geojson) => {
            //set the geojson data to the state
            jsonList.push(geojson)
          })
        })
        setSocialMeetingLayer(jsonList)
      })
    }
    if (searchParams.get("nature")) {
      //fetch the nature folder from the server
      getGeojsonFolder(languages[currentLanguage].selection.additional_layer.resiliance.options[1].src).then((data) => {
        //fetch the geojson data from the server
        if (data == undefined) {
          return
        }
        var jsonList = []
        data.forEach((element) => {
          getGeojson(element, languages[currentLanguage].selection.additional_layer.resiliance.options[1].src).then((geojson) => {
            //set the geojson data to the state
            jsonList.push(geojson)
          })
        })
        setCloseNatureLayer(jsonList)
      })
    }
    if (searchParams.get("sports")) {
      //fetch the sports folder from the server
      getGeojsonFolder(languages[currentLanguage].selection.additional_layer.resiliance.options[2].src).then((data) => {
        //fetch the geojson data from the server
        if (data == undefined) {
          return
        }
        var jsonList = []
        data.forEach((element) => {
          getGeojson(element, languages[currentLanguage].selection.additional_layer.resiliance.options[2].src).then((geojson) => {
            //set the geojson data to the state
            jsonList.push(geojson)
          })
        })
        setSportsLayer(jsonList)
      })
    }


  }, [])

  //use effect to print historicalRelevantLayer
  useEffect(() => {
    console.log(rightImage)
    if (rightImage != undefined) {

      fetchData(rightImage.meta)
    }
    if (leftImage != undefined) {
      fetchData(leftImage.meta)
    }
  }, [leftImage, rightImage]);

  //function for fetching the src folder from the server by callin ...api/rekke/getGeojsonFolder?foldername=src and return the list of files inside these folders.
  const getGeojsonFolder = async (foldername) => {
    try {
      const response = await fetch(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getGeojsonFolder?foldername=${foldername}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      return jsonData
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //function for fetching the geojson data from the server by callin ...api/rekke/getGeojson?filename=filename&foldername=src and return the geojson data.
  //The filenames will be fetched by the getGeojsonFolder function.
  const getGeojson = async (filename, foldername) => {
    try {
      const response = await fetch(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getGeojson?filename=${filename}&foldername=${foldername}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      return jsonData
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  // const handleSliderChange = (event) => {
  //   const sliderValue = parseFloat(event.target.value);
  //   const mapContainer = document.getElementById("map");
  //   const mapWidth = mapContainer.offsetWidth;
  //   const imageWidth = mapWidth * sliderValue;
  //   const maxLeftBound = mapWidth - imageWidth;
  //   const newLeftBound = maxLeftBound >= 0 ? maxLeftBound : 0;
  //   setLeftBound(newLeftBound);
  // };

  function recalculateClip() {
    if (document.querySelectorAll(".prognosis")[0] == undefined) {
      return
    };
    //recalculate the clipt of image overlay
    var leafletPane = document.querySelectorAll(".leaflet-image-layer")[0]
    var prognosisEl = document.querySelectorAll(".prognosis")[0]
    var currentEl = document.querySelectorAll(".current")[0]
    var imageStart = parseInt(prognosisEl.style.transform.split("(")[1].split("px")[0]) + (parseInt(leafletPane.style.transform.split("(")[1].split("px")[0]));
    var dragOverlay = document.querySelector("#drag-overlay")
    console.log(document.getElementById("drag-overlay").style.left)

    if (dragOverlay.style.left != "50vw") {
      if (parseFloat(dragOverlay.style.left.split("px")[0]) > imageStart) {

        prognosisEl.style.cssText += `clip: rect(0px,${prognosisEl.style.width},${prognosisEl.style.height},${(parseFloat(document.getElementById("drag-overlay").style.left.replace("px", "")) - (imageStart ^ 1)) - (parseFloat(document.getElementById("drag-overlay").style.left.replace("px", "")) - parseFloat(dragOverlay.style.left.replace("px", "")))}px);`;
        currentEl.style.cssText += `clip: rect(0px,${(parseFloat(document.getElementById("drag-overlay").style.left.replace("px", "")) - (imageStart ^ 1)) - (parseFloat(document.getElementById("drag-overlay").style.left.replace("px", "")) - parseFloat(dragOverlay.style.left.replace("px", "")))}px,${currentEl.style.height},0px);`;
      }
    }
  }

  function MyComponent() {
    map = useMapEvents({
      load: () => recalculateClip(),
      zoom: () => recalculateClip(),
      move: () => recalculateClip(),
      layeradd: (handler) => {
        //If the layer is the image overlay add the drag overlay
        if (handler.layer._url != undefined) {
          setShowDrag(true)
        }
      },
      layerremove: (handler) => {
        //If the layer is the image overlay remove the drag overlay
        if (handler.layer._url != undefined) {
          setShowDrag(false)
        }
      }

    },
    );



    return null
  }

  function handleDragMove(e) {
    e.preventDefault();

    var leafletPane = document.querySelectorAll(".leaflet-map-pane")[0];
    var prognosisEl = document.querySelectorAll(".prognosis")[0];
    var currentEl = document.querySelectorAll(".current")[0];
    var imageStart = parseInt(prognosisEl.style.transform.split("(")[1].split("px")[0]) + (parseInt(leafletPane.style.transform.split("(")[1].split("px")[0]));
    var dragOverlay = document.querySelector("#drag-overlay");



    if (e.pageX > imageStart || (e.touches && e.touches[0].pageX > imageStart)) {
      prognosisEl.style.cssText += `clip: rect(0px,${prognosisEl.style.width},${prognosisEl.style.height},${(document.getElementById("slider-container").style.width - (imageStart ^ 1)) - (document.getElementById("slider-container").style.width - parseFloat(dragOverlay.style.left.split("px")[0]))}px);`;

      currentEl.style.cssText += `clip: rect(0px,${(document.getElementById("slider-container").style.width - (imageStart ^ 1)) - (document.getElementById("slider-container").style.width - parseFloat(dragOverlay.style.left.split("px")[0]))}px,${currentEl.style.height},0px);`;
    }


    if (e.pageX != 0 || e.touches && e.touches[0].pageX != 0) {

      setDragLeft(`${(e.pageX - ((window.innerWidth * 0.1) / 2)) || e.touches[0].pageX - ((window.innerWidth * 0.1) / 2) - 15}px`);
    }
    if(e.screenX != 0 || e.touches && e.touches[0].screenX != 0){
      setDragLeft(`${(e.screenX - ((window.innerWidth * 0.1) / 2)) || e.touches[0].screenX - ((window.innerWidth * 0.1) / 2) - 15}px`);

    }
  };

  function highlightFeature(e, layer, popupD) {
    layer.setStyle({ color: "yellow", fillColor: "#ffee00ec" })
    setPopupData(prev => popupD);
    previoisClickedLayer.current = layer;

  }

  function resetHighlight(e, layer) {
    layer.setStyle(layer.options.style)
  }

  function openPopupData(feature, layer) {
    if (previoisClickedLayer.current != undefined) {
      previoisClickedLayer.current.setStyle(previoisClickedLayer.current.options.style)
    }

    const popupD = {
      name: feature.properties.name,
      id: feature.properties.Id,
      boundary: feature.properties.boundary,
      sgk: feature.properties.sgk,
      amenity: feature.properties.amenity,
    }
    layer.on("click", (e) => highlightFeature(e, layer, popupD));

  }



  return (
    <>
      <div className="map-overlay">
        <div className="map-overlay-content">
          <h1>Rekke Map Tool</h1>

          <MDBContainer fluid className="d-flex justify-content-center">
            <MDBRow style={{ width: "90vw" }}>
              <MDBCol md={3}>

                <MDBBtn
                  color="secondary"
                  onClick={() => {
                    navigate("/menue/selectionOverview?leftImage=" + searchParams.get("leftImage") + "&rightImage=" + searchParams.get("rightImage") + "&historical=" + searchParams.get("historical") + "&landscape=" + searchParams.get("landscape") + "&monument=" + searchParams.get("monument") + "&social=" + searchParams.get("social") + "&nature=" + searchParams.get("nature") + "&sports=" + searchParams.get("sports"))

                    window.location.href = `/rekke/menue/selectionOverview?leftImage=${searchParams.get("leftImage")}&rightImage=${searchParams.get("rightImage")}&historical=${searchParams.get("historical")}&landscape=${searchParams.get("landscape")}&monument=${searchParams.get("monument")}&social=${searchParams.get("social")}&nature=${searchParams.get("nature")}&sports=${searchParams.get("sports")}`
                  }} style={{ margin: "10px" }}>
                  <MDBIcon fas icon="arrow-left" className='mx-3' />
                </MDBBtn>

                <p>
                  {languages[currentLanguage].startAgain}
                </p>
              </MDBCol>
              <MDBCol >
                <p>
                  {languages[currentLanguage].selectInstruction}
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

        </div>
      </div>
      <hr />
      {leftImage != undefined && rightImage != undefined &&
        <MDBContainer fluid className="d-flex justify-content-center">
          <MDBRow style={{ width: "90vw" }}>
            <MDBCol>
              <p style={{ fontWeight: "bold" }}>
                {languages[currentLanguage].areas + " "}
                {leftImage.id >= menue.config_items.simulated.image_configuration.length ? menue.config_items.modelled.name[currentLanguage] : menue.config_items.simulated.name[currentLanguage]}

              </p>
              <p style={{ fontWeight: "bold" }}>
                <MDBTooltip tag={"a"} wrapperProps={{ href: '#' }} title={menue.ssp[leftImage.ssp].number + " Quelle: " + menue.ssp.source.value} >
                  <span>
                    <a target='_blank' href={menue.ssp.source.url2}>{menue.ssp[leftImage.ssp].name[currentLanguage] + " "}</a>
                  </span>
                </MDBTooltip>
                <br />

                <MDBTooltip tag={"a"} wrapperProps={{ href: '#' }} title={menue.time_frames[leftImage.time_frame].name[currentLanguage] + " " + menue.time_frames[leftImage.time_frame].start + " - " + menue.time_frames[leftImage.time_frame].end} >
                  <span>
                    {menue.time_frames[leftImage.time_frame].name[currentLanguage] + " "}
                  </span>
                </MDBTooltip>
                <br />

                <MDBTooltip tag={"a"} wrapperProps={{ href: '#' }} title={menue.scenarios[leftImage.scenario].name[currentLanguage] + " = " + menue.scenarios[leftImage.scenario].description[currentLanguage]} >
                  <span>
                    {menue.scenarios[leftImage.scenario].name[currentLanguage]}
                  </span>
                </MDBTooltip>
              </p>
            </MDBCol>
            <MDBCol>
              <p style={{ fontWeight: "bold" }}>
                {languages[currentLanguage].areas + " "}
                {rightImage.id >= menue.config_items.simulated.image_configuration.length ? menue.config_items.modelled.name[currentLanguage] : menue.config_items.simulated.name[currentLanguage]}
              </p>
              <p style={{ fontWeight: "bold" }}>
                <MDBTooltip tag={"a"} wrapperProps={{ href: '#' }} title={menue.ssp[rightImage.ssp].number + " Quelle: " + menue.ssp.source.value} >
                  <span>
                    <a target='_blank' href={menue.ssp.source.url2}>{menue.ssp[rightImage.ssp].name[currentLanguage] + " "}</a>
                  </span>
                </MDBTooltip>
                <br />

                <MDBTooltip tag={"a"} wrapperProps={{ href: '#' }} title={menue.time_frames[rightImage.time_frame].name[currentLanguage]}>
                  <span>{menue.time_frames[rightImage.time_frame].name[currentLanguage] + " "}</span>
                </MDBTooltip>
                <br />

                <MDBTooltip tag={"a"} wrapperProps={{ href: '#' }} title={menue.scenarios[rightImage.scenario].name[currentLanguage]}>
                  <span>  {menue.scenarios[rightImage.scenario].name[currentLanguage]}</span>
                </MDBTooltip>

              </p>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      }
      <div className='slider-box'>

        <div className='slider-container' id='slider-container'>
          {showDrag &&
            /* <div className='slider drag-overlay' id='drag-overlay'>
              <input type="range" min="0" max="100" value={leftBound} onChange={handleSliderChange} />
            </div>*/

            <div className='drag-overlay' id="drag-overlay"

              style={{ left: dragLeft }}
              onDragStart={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:1'}
              onTouchStart={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:1'}

              onDragEnd={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'}
              onTouchEnd={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'}
              onDrag={(e) => handleDragMove(e)}
              onTouchMove={(e) => handleDragMove(e)}
              onMouseDown={(e) => {
                if(!sliderGrabbed){
                  // remove the event listener for the drag move
                  document.querySelector("#map-container").removeEventListener("mousemove", handleDragMove);
                }
                setSliderGrabbed(!sliderGrabbed);

              }}
              onMouseUp={(e) => {
                if (sliderGrabbed) {
                  // remove the event listener for the drag move
                  document.querySelector("#map-container").removeEventListener("mousemove", handleDragMove);
                }
                setSliderGrabbed(!sliderGrabbed);
              }}

              onMouseMove={(e) => {
                if (!sliderGrabbed) {
                  document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'
                  
                  return;
                }
                document.querySelector("#drag-overlay").style.cssText += 'opacity:1'
                // select the map and add the event listener for the drag move
                document.querySelector("#map-container").addEventListener("mousemove", handleDragMove);
                // add click event listener to remove the event listener
                document.querySelector("#map-container").addEventListener("mouseup", () => {
                  document.querySelector("#map-container").removeEventListener("mousemove", handleDragMove);
                  setSliderGrabbed(!sliderGrabbed)
                });

              }}


            >
              <div className='drag-middle'
                draggable="true"

                onDragStart={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:1'}
                onTouchStart={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:1'}

                onDragEnd={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'}
                onTouchEnd={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'}
                onDrag={(e) => handleDragMove(e)}

              // onMouseDown={(e) => setSliderGrabbed(!sliderGrabbed)}
              // onMouseMove={(e) => {
              //   if (!sliderGrabbed) {
              //     document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'
              //     return;
              //   }
              //   document.querySelector("#drag-overlay").style.cssText += 'opacity:1'
              //   handleDragMove(e);

              // }}
              >
                <i className="fa-solid fa-up-down"></i>

              </div>

              {/* <
          <div className='drag-bottom' /> */}

            </div>
          }
          <div className="map-container" id='map-container' style={{ width: "100%", height: window.innerWidth > 600 ? "700px" : "400px" }}>

            <MapContainer
              center={[49.8333, 11.2]}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%", left: "0px" }}
              whenCreated={(map) => {
                map.setMaxBounds(bounds);
                map.setMinZoom(map.getBoundsZoom(bounds));
              }}
              zoomControl={true}

            >
              <MyComponent />
              <LayersControl
                position="topright"
              >
                <LayersControl.BaseLayer checked={true} name="OpenStreetMap">

                  <TileLayer url="https://osm.rrze.fau.de/tiles/{z}/{x}/{y}.png" />
                </LayersControl.BaseLayer>


                <LayersControl.Overlay
                  checked={true}
                  name="Image Layer">

                  <LayerGroup className="image-overlay" >
                    {rightImage &&
                      <ImageOverlay
                        className="prognosis"
                        url={rightImage.src}
                        bounds={bounds}
                        opacity={0.5}
                        zoomAnimation={false}
                        maxZoom={5}


                      />
                    }
                    {leftImage &&
                      <ImageOverlay
                        className="current"
                        url={leftImage.src}
                        bounds={bounds}
                        opacity={0.5}
                        zoomAnimation={false}
                        maxZoom={5}
                      />
                    }

                  </LayerGroup>

                </LayersControl.Overlay>
                <LayersControl.Overlay
                  name={languages[currentLanguage].selection.additional_layer.culture.options[0].name}
                  checked={searchParams.get("historical") == "true" ? true : false}
                >

                  <LayerGroup>
                    {historicalRelevantLayer != undefined &&

                      <>
                        {historicalRelevantLayer.map((geojson, index) => {
                          return <GeoJSON
                            key={index}
                            data={geojson}
                            style={{
                              color: "lightblue",
                              weight: 1,
                              opacity: 0.4,
                              fillColor: "lightblue",
                              fillOpacity: 0.5
                            }
                            }
                            pointToLayer={(feature, latlng) => {
                              return L.circleMarker(latlng, {
                                radius: 8,
                                fillColor: "lightblue",
                                color: "lightblue",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                              });
                            }
                            }
                            onEachFeature={openPopupData}

                          />
                        })}
                      </>
                    }
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay
                  name={languages[currentLanguage].selection.additional_layer.culture.options[1].name}
                  checked={searchParams.get("landscape") == "true" ? true : false}
                >
                  <LayerGroup>
                    {landscapeFeatureLayer != undefined &&
                      <>
                        {landscapeFeatureLayer.map((geojson, index) => {
                          return <GeoJSON
                            key={index}
                            data={geojson}
                            style={{
                              color: "lightgreen",
                              weight: 1,
                              opacity: 0.4,
                              fillColor: "lightgreen",
                              fillOpacity: 0.5
                            }
                            }
                            pointToLayer={(feature, latlng) => {
                              return L.circleMarker(latlng, {
                                radius: 8,
                                fillColor: "lightgreen",
                                color: "lightgreen",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                              });
                            }
                            }
                            onEachFeature={openPopupData}

                          />
                        })}
                      </>
                    }
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay
                  name={languages[currentLanguage].selection.additional_layer.culture.options[2].name}
                  checked={searchParams.get("monument") == "true" ? true : false}

                >
                  <LayerGroup>
                    {monumentLayer != undefined &&
                      <>
                        {monumentLayer.map((geojson, index) => {
                          return <GeoJSON
                            key={index}
                            data={geojson}
                            style={{
                              color: "#bd56df",
                              weight: 1,
                              opacity: 0.4,
                              fillColor: "#bd56df",
                              fillOpacity: 0.5
                            }
                            }
                            pointToLayer={(feature, latlng) => {
                              return L.circleMarker(latlng, {
                                radius: 8,
                                fillColor: "#bd56df",
                                color: "#bd56df",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                              });
                            }
                            }
                            onEachFeature={openPopupData}

                          />
                        })}
                      </>
                    }
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay
                  name={languages[currentLanguage].selection.additional_layer.resiliance.options[0].name}
                  checked={searchParams.get("social") == "true" ? true : false}
                >
                  <LayerGroup>
                    {socialMeetingLayer != undefined &&
                      <>
                        {socialMeetingLayer.map((geojson, index) => {
                          return <GeoJSON
                            key={index}
                            data={geojson}
                            style={{
                              color: "#32e1c1",
                              weight: 1,
                              opacity: 0.4,
                              fillColor: "#32e1c1",
                              fillOpacity: 0.5,


                            }
                            }
                            pointToLayer={(feature, latlng) => {
                              return L.circleMarker(latlng, {
                                radius: 8,
                                fillColor: "#32e1c1",
                                color: "#32e1c1",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                              });
                            }
                            }
                            onEachFeature={openPopupData}

                          />
                        })}
                      </>
                    }
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay
                  name={languages[currentLanguage].selection.additional_layer.resiliance.options[1].name}
                  checked={searchParams.get("nature") == "true" ? true : false}
                >
                  <LayerGroup>
                    {closeNatureLayer != undefined &&
                      <>
                        {closeNatureLayer.map((geojson, index) => {
                          return <GeoJSON
                            key={index}
                            data={geojson}
                            style={{
                              color: "#206736",
                              weight: 1,
                              opacity: 0.4,
                              fillColor: "#206736",
                              fillOpacity: 0.5
                            }
                            }
                            pointToLayer={(feature, latlng) => {
                              return L.circleMarker(latlng, {
                                radius: 8,
                                fillColor: "#206736",
                                color: "#206736",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                              });
                            }
                            }
                            onEachFeature={openPopupData}

                          />
                        })}
                      </>
                    }
                  </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay
                  name={languages[currentLanguage].selection.additional_layer.resiliance.options[2].name}
                  checked={searchParams.get("sport") == "true" ? true : false}
                >
                  <LayerGroup>
                    {sportsLayer != undefined &&
                      <>
                        {sportsLayer.map((geojson, index) => {
                          return <GeoJSON
                            key={index}
                            data={geojson}
                            style={{
                              color: "lightred",
                              weight: 1,
                              opacity: 0.4,
                              fillColor: "lightred",
                              fillOpacity: 0.5
                            }
                            }
                            pointToLayer={(feature, latlng) => {
                              return L.circleMarker(latlng, {
                                radius: 8,
                                fillColor: "lightred",
                                color: "lightred",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8,

                              });
                            }
                            }
                            onEachFeature={openPopupData}

                          />
                        })}
                      </>
                    }
                  </LayerGroup>
                </LayersControl.Overlay>

              </LayersControl>


            </MapContainer>


          </div>
          {showPopupOverlay ? <div className="popup-data" style={{
            position: "absolute",
            width: "300px",
            bottom: "0px",
            left: "0px",
            zIndex: "1000",
            backgroundColor: "white",
            padding: "10px",
            // borderRadius: "5px",
            // boxShadow: "0px 0px 5px 0px black"

          }}>
            <MDBBtn
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                zIndex: "1100",
              }
              }
              tag='a' color='none' className='m-1' onClick={() => setShowPopupOverlay(false)}>
              <MDBIcon fas icon="times" className='mx-3' />
            </MDBBtn>
            <p>
              {popupData != undefined ? "" :
                "no selection"
              }
            </p>
            <h4>
              {popupData != undefined ? popupData.name != undefined ? `Name: ${popupData.name}` : popupData.id != undefined ? `ID: ${popupData.id}` : "" : ""}
            </h4>
            <p>
              {popupData != undefined && popupData.boundary != undefined ? `Boundary: ${popupData.boundary}` : ""}
            </p>
            <p>
              {popupData != undefined && popupData.sgk != undefined ? `SGK: ${popupData.sgk}` : ""}
            </p>
            <p>
              {popupData != undefined && popupData.amenity != undefined ? `Amenity: ${popupData.amenity}` : ""}
            </p>
          </div>
            : <MDBBtn
              style={{
                position: "absolute",
                bottom: "0px",
                left: "0px",
                zIndex: "1000",
                backgroundColor: "white",
                borderRadius: "100px",
              }
              }
              tag='a' color='none' className='m-1'
              onClick={() => setShowPopupOverlay(true)}>
              <MDBIcon fas icon="info" className='mx-3' />
            </MDBBtn>
          }
          {showLegend ?
            <div className="legend-data" style={{
              // position: "absolute",
              // width: "300px",
              // bottom: "0px",
              // right: "0px",
              // zIndex: "1000",
              // backgroundColor: "white",
              // padding: "10px",
              // borderRadius: "5px",
              // boxShadow: "0px 0px 5px 0px black"

            }}>
              <MDBBtn
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  zIndex: "1100",
                }
                }
                tag='a' color='none' className='m-1' onClick={() => setShowLegend(false)}>
                <MDBIcon fas icon="times" className='mx-3' />
              </MDBBtn>
              <h4>
                {languages[currentLanguage].legend}
              </h4>
              <MDBTooltip title={languages[currentLanguage].legendLong} tag='a' wrapperProps={{ href: '#' }} >
                <span style={{ textDecoration: "underline" }}>{languages[currentLanguage].legendName}</span>
              </MDBTooltip>
              <p>
                <img src={LegendDummy} alt="legend" style={{ width: "100%" }} />


              </p>


            </div>
            : <MDBBtn
              style={{
                position: "absolute",
                bottom: "20px",
                right: "0px",
                zIndex: "1000",
                backgroundColor: "white",
              }
              }
              tag='a' color='none' className='m-1'
              onClick={() => setShowLegend(true)}>
              <MDBIcon fas icon="tag" className='mx-3' size='sm' />
            </MDBBtn>
          }

        </div>

      </div>



    </>

  )
}

export default MapView

