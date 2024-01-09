import React, { useState, useRef, useEffect } from 'react';
import './Map.css'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ImageOverlay } from 'react-leaflet/ImageOverlay'
import { LayerGroup, LayersControl, useMapEvent, useMapEvents } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { useParams, useSearchParams } from 'react-router-dom';
import menue from '../configData/menue.json'
import languages from '../configData/languages.json'
import example from '../configData/example.json'
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit';

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

  const [leftImage, setLeftImage] = useState()
  const [rightImage, setRightImage] = useState()
  const [culturalLayer, setCulturalLayer] = useState()
  const [resilienceLayer, setResilienceLayer] = useState()
  const [historicalRelevantLayer, setHistoricalRelevantLayer] = useState()
  const [monumentLayer, setMonumentLayer] = useState()
  const [landscapeFeatureLayer, setLandscapeFeatureLayer] = useState()
  const [socialMeetingLayer, setSocialMeetingLayer] = useState()
  const [closeNatureLayer, setCloseNatureLayer] = useState()
  const [sportsLayer, setSportsLayer] = useState()


  const [southWest, setSouthWest] = useState([49.5333, 9.9])
  const [northEast, setNorthEast] = useState([49.9333, 10.7])

  const bounds = new LatLngBounds(southWest, northEast);
  const [leftBound, setLeftBound] = useState(0);
  const [dragLeft, setDragLeft] = useState(window.innerWidth / 2 + "px");
  const [showDrag, setShowDrag] = useState(false);
  var map;

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
      setLeftImage(menue.image_configuration[searchParams.get("leftImage")].src);
      fetchData(menue.image_configuration[searchParams.get("leftImage")].meta)

    }
    if (searchParams.get("rightImage") != null) {
      setRightImage(menue.image_configuration[searchParams.get("rightImage")].src);
    }
    console.log(searchParams.get("historical"))
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
    console.log(historicalRelevantLayer)
  }, [historicalRelevantLayer])

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



  const handleSliderChange = (event) => {
    const sliderValue = parseFloat(event.target.value);
    const mapContainer = document.getElementById("map");
    const mapWidth = mapContainer.offsetWidth;
    const imageWidth = mapWidth * sliderValue;
    const maxLeftBound = mapWidth - imageWidth;
    const newLeftBound = maxLeftBound >= 0 ? maxLeftBound : 0;
    setLeftBound(newLeftBound);
  };

  const recalculateClip = () => {
    if (document.querySelectorAll(".prognosis")[0] == undefined) {
      return
    };
    //recalculate the clipt of image overlay
    var leafletPane = document.querySelectorAll(".leaflet-image-layer")[0]
    var prognosisEl = document.querySelectorAll(".prognosis")[0]
    var currentEl = document.querySelectorAll(".current")[0]
    var imageStart = parseInt(prognosisEl.style.transform.split("(")[1].split("px")[0]) + (parseInt(leafletPane.style.transform.split("(")[1].split("px")[0]));
    var dragOverlay = document.querySelector("#drag-overlay")
    if (dragOverlay.style.left != "50vw") {
      if (parseFloat(dragOverlay.style.left.split("px")[0]) > imageStart) {
        prognosisEl.style.cssText += `clip: rect(0px,${prognosisEl.style.width},${prognosisEl.style.height},${(window.innerWidth - (imageStart ^ 1)) - (window.innerWidth - parseFloat(dragOverlay.style.left.split("px")[0]))}px);`;

        currentEl.style.cssText += `clip: rect(0px,${(window.innerWidth - (imageStart ^ 1)) - (window.innerWidth - parseFloat(dragOverlay.style.left.split("px")[0]))}px,${currentEl.style.height},0px);`;
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






  const handleDragMove = (e) => {
    e.preventDefault();

    var leafletPane = document.querySelectorAll(".leaflet-map-pane")[0];
    var prognosisEl = document.querySelectorAll(".prognosis")[0];
    var currentEl = document.querySelectorAll(".current")[0];
    console.log(leafletPane.style.transform.split("(")[1].split("px")[0]);
    var imageStart = parseInt(prognosisEl.style.transform.split("(")[1].split("px")[0]) + (parseInt(leafletPane.style.transform.split("(")[1].split("px")[0]));
    var dragOverlay = document.querySelector("#drag-overlay");

    console.log(e);

    if (e.pageX > imageStart || (e.touches && e.touches[0].pageX > imageStart)) {
      prognosisEl.style.cssText += `clip: rect(0px,${prognosisEl.style.width},${prognosisEl.style.height},${(window.innerWidth - (imageStart ^ 1)) - (window.innerWidth - parseFloat(dragOverlay.style.left.split("px")[0]))}px);`;

      currentEl.style.cssText += `clip: rect(0px,${(window.innerWidth - (imageStart ^ 1)) - (window.innerWidth - parseFloat(dragOverlay.style.left.split("px")[0]))}px,${currentEl.style.height},0px);`;
    }

    if (e.pageX != 0 || (e.touches && e.touches[0].pageX != 0)) {
      setDragLeft(`${e.pageX || e.touches[0].pageX}px`);
    }
  };

  return (
    <>
      <div className="map-container" style={{ width: "100%" }}>
        <div className="map-overlay">
          <div className="map-overlay-content">
            <h1>Rekke Map Tool</h1>
            <MDBRow>
            <MDBCol md={1}>
              {/* Button to change go back to the map selection with the selected parameters from the top*/}
              <MDBContainer
                fluid
                className="d-flex justify-content-center"
              >
                <MDBRow className="d-flex justify-content-center">
                  <a href={`/rekke/menue?leftImage=${searchParams.get("leftImage")}&rightImage=${searchParams.get("rightImage")}&historical=${searchParams.get("historical")}&landscape=${searchParams.get("landscape")}&monument=${searchParams.get("monument")}&social=${searchParams.get("social")}&nature=${searchParams.get("nature")}&sports=${searchParams.get("sports")}`}>
                    <MDBIcon fas icon="arrow-left" size="lg" />
                  </a>
                  <p>
                    Karte neu auswählen
                  </p>
                </MDBRow>
              </MDBContainer>


            </MDBCol>
            <MDBCol >
              <p>Klicken Sie mit Ihrer linken Maus-Taste auf einen blauen Punkt des Sliders um diesen mit Ihrer Maus zu bewegen. Bewegen Sie den Slider mit Hilfe der blauen Punkte und beobachten Sie die Veränderungen der Klimadaten. Zum loslassen Klicken sie erneut</p>
            </MDBCol>
            </MDBRow>
          </div>
          {/* <div className="map-overlay-slider">
            <input type="range" min="0" max="1" step="0.01" defaultValue="0.5" onChange={handleSliderChange} />
          </div> */}

        </div>
        <div className="map" id="map">
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
                      url={rightImage}
                      bounds={bounds}
                      opacity={0.8}
                      zoomAnimation={false}
                      maxZoom={5}


                    />
                  }
                  {leftImage &&
                    <ImageOverlay
                      className="current"
                      url={leftImage}
                      bounds={bounds}
                      opacity={0.7}
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
                            fillOpacity: 0.7
                          }
                          }

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
                            fillOpacity: 0.7
                          }
                          }
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
                            color: "lightred",
                            weight: 1,
                            opacity: 0.4,
                            fillColor: "lightred",
                            fillOpacity: 0.7
                          }
                          }
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
                            color: "lightblue",
                            weight: 1,
                            opacity: 0.4,
                            fillColor: "lightblue",
                            fillOpacity: 0.7,

                          }
                          }
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
                            color: "lightgreen",
                            weight: 1,
                            opacity: 0.4,
                            fillColor: "lightgreen",
                            fillOpacity: 0.7
                          }
                          }
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
                            fillOpacity: 0.7
                          }
                          }
                        />
                      })}
                    </>
                  }
                </LayerGroup>
              </LayersControl.Overlay>

            </LayersControl>


          </MapContainer>

        </div>

      </div>
      {showDrag &&
        <div className='drag-overlay' id="drag-overlay" style={{ left: dragLeft }}
          onDragStart={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:1'}
          onTouchStart={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:1'}

          onDragEnd={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'}
          onTouchEnd={() => document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'}
          onDrag={(e) => handleDragMove(e)}
          onTouchMove={(e) => handleDragMove(e)}

          onMouseDown={(e) => setSliderGrabbed(!sliderGrabbed)}
          onMouseMove={(e) => {
            if (!sliderGrabbed) {
              document.querySelector("#drag-overlay").style.cssText += 'opacity:0.5'
              return;
            }
            document.querySelector("#drag-overlay").style.cssText += 'opacity:1'
            handleDragMove(e);

          }}

        >

          <div className='drag-middle'>
            <i class="fa-solid fa-chevron-left"></i>
            <i class="fa-solid fa-chevron-right"></i>

          </div>
          <div className='drag-bottom' />

        </div>
      }
    </>

  )
}

export default MapView

