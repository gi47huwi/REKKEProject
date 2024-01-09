import React, { useEffect, useState } from 'react'

import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon, MDBContainer, MDBCheckbox, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDrop, useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import languages from '../configData/languages.json'
import menue from '../configData/menue.json'
import './Menue.css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Markdown from 'react-markdown'


const DraggableCard = ({ item }) => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => ({ id: item.id }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),

    });

    if (isTouchDevice) {
        return (
            <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, height: "10rem" }}>
                <MDBCard
                    style={{
                        width: "100%",
                        height: "fit-content",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderColor: item.color,
                    }}
                >
                    {/* <MDBCardImage src={item.src} alt={item.name} /> */}
                    <MDBCardBody>
                        <MDBCardTitle>{item.name}</MDBCardTitle>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );

    } else {
        return (

            <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, width: "80%" }}>
                <MDBCard style={{ width: "100%", height: "fit-content", borderStyle: "solid", borderWidth: "2px", borderColor: item.color }}>
                    <MDBCardImage src={item.src} alt={item.name} />
                    <MDBCardBody>
                        <MDBCardTitle>{item.name}</MDBCardTitle>
                        <MDBCardText>
                            <Markdown>{item.description}</Markdown>

                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );

    }


};


const DropArea = ({ side, currentLanguage }) => {
    const [droppedCard, setDroppedCard] = useState(undefined);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    //load the dropped card from the url if it is set
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if (searchParams.get(side + "Image") != null) {
            setDroppedCard({ id: searchParams.get(side + "Image") });
        }
    }, []);

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item) => {
            // Handle the dropped item here
            if (!droppedCard != item) {
                // Handle the dropped item here
                setDroppedCard(item);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    const handleRemove = () => {
        setDroppedCard(undefined);
    };


    return (
        <div ref={drop} style={{
            backgroundColor: isOver ? 'lightblue' : side === "left" ? "rgb(175, 213, 175)" : "rgb(175, 213, 175)",
            maxWidth: isTouchDevice ? "100vw" : "40vw",
            minHeight: isTouchDevice ? "" : "40rem",
            borderBottom: isTouchDevice ? "1px solid grey" : "",
        }}>
            {side === 'left' && <h3>{languages[currentLanguage].selection.compare_layer.left}</h3>}
            {side === 'right' && <h3>{languages[currentLanguage].selection.compare_layer.right}</h3>}
            <div style={{ width: "80%", height: "100%", marginLeft: "10%" }}>
                {droppedCard != undefined ?
                    isTouchDevice ?
                        <>
                            <MDBRow className='d-flex align-items-center justify-content-center mb-2'>
                                <MDBCard
                                    className={'droppedCard ' + side}
                                    id={droppedCard.id}
                                    style={{
                                        width: "fit-content",
                                        height: "fit-content",
                                        borderStyle: "solid",
                                        borderWidth: "2px",
                                        borderColor: menue.image_configuration[droppedCard.id].color,
                                    }}
                                >
                                    {/* <MDBCardImage src={item.src} alt={item.name} /> */}
                                    <MDBCardBody>
                                        <MDBCardTitle>{menue.image_configuration[droppedCard.id].name}</MDBCardTitle>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBRow>
                            <MDBRow className='d-flex align-items-center justify-content-center mb-2'>
                                <MDBBtn style={{ width: "15rem" }} color="danger" onClick={handleRemove}><MDBIcon fas icon='trash-alt' /></MDBBtn>
                            </MDBRow>
                        </>
                        :
                        <>
                            <MDBRow className='mb-3 d-flex align-items-center justify-content-center'>
                                <MDBCard
                                    className={'droppedCard ' + side}
                                    id={droppedCard.id}
                                    style={{
                                        width: "15rem",
                                        height: "30rem",
                                        borderStyle: "solid",
                                        borderWidth: "2px",
                                        borderColor: menue.image_configuration[droppedCard.id].color,
                                    }}
                                >
                                    <MDBCardImage style={{ width: "100%", aspectRatio: "auto" }}
                                        src={menue.image_configuration[droppedCard.id].src} alt={menue.image_configuration[droppedCard.id].name} />
                                    <MDBCardBody>
                                        <MDBCardTitle>{menue.image_configuration[droppedCard.id].name}</MDBCardTitle>
                                        <MDBCardText style={{ height: "50%", overflow: "hidden" }}>
                                            <Markdown>
                                                {menue.image_configuration[droppedCard.id].description}
                                            </Markdown>
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBRow>
                            <MDBRow className='d-flex align-items-center justify-content-center'>
                                <MDBBtn style={{ width: "15rem" }} color="danger" onClick={handleRemove}><MDBIcon fas icon='trash-alt' /></MDBBtn>
                            </MDBRow>
                        </>
                    : null}
            </div>
        </div>
    );
};

function Menue({
    currentLanguage
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    const [warning, setWarning] = useState(false)
    const [cultureLayer, setCultureLayer] = useState(false)
    const [resilianceLayer, setResilianceLayer] = useState(false)
    const [subcultureLayer1, setSubcultureLayer1] = useState(false)
    const [subcultureLayer2, setSubcultureLayer2] = useState(false)
    const [subcultureLayer3, setSubcultureLayer3] = useState(false)
    const [subresuliencelayer1, setSubresuliencelayer1] = useState(false)
    const [subresuliencelayer2, setSubresuliencelayer2] = useState(false)
    const [subresuliencelayer3, setSubresuliencelayer3] = useState(false)
    const [navigateBool, setNavigateBool] = useState(false)
    var subcultureLayerList = [
        subcultureLayer1,
        subcultureLayer2,
        subcultureLayer3
    ]
    var setSubCultureLayerList = [
        setSubcultureLayer1,
        setSubcultureLayer2,
        setSubcultureLayer3
    ]

    var subresuliencelayerList = [
        subresuliencelayer1,
        subresuliencelayer2,
        subresuliencelayer3
    ]
    var setSubResuliencelayerList = [
        setSubresuliencelayer1,
        setSubresuliencelayer2,
        setSubresuliencelayer3
    ]


    function handleCultureLayer() {
        setCultureLayer(!cultureLayer);
        if (cultureLayer) {
            setSubcultureLayer1(false);
            setSubcultureLayer2(false);
            setSubcultureLayer3(false);
        } else {

            setSubcultureLayer1(true);
            setSubcultureLayer2(true);
            setSubcultureLayer3(true);
        }
    }

    function handleSubcultureLayer(index) {
        setSubCultureLayerList[index](!subcultureLayerList[index]);
        if (subcultureLayerList[index]) {
            setCultureLayer(false);
        } else {
            var allSelected = true;
            for (var i = 0; i < subcultureLayerList.length; i++) {
                if (index != i && !subcultureLayerList[i]) {
                    allSelected = false;
                }
            }
            if (allSelected) {
                setCultureLayer(true);
            }
        }

    }


    function handleResilianceLayer() {
        setResilianceLayer(!resilianceLayer);
        if (resilianceLayer) {
            setSubresuliencelayer1(false);
            setSubresuliencelayer2(false);
            setSubresuliencelayer3(false);
        } else {

            setSubresuliencelayer1(true);
            setSubresuliencelayer2(true);
            setSubresuliencelayer3(true);
        }
    }

    function handleSubresuliencelayer(index) {
        setSubResuliencelayerList[index](!subresuliencelayerList[index]);
        if (subresuliencelayerList[index]) {
            setResilianceLayer(false);
        } else {
            var allSelected = true;
            for (var i = 0; i < subresuliencelayerList.length; i++) {
                if (index != i && !subresuliencelayerList[i]) {
                    allSelected = false;
                }
            }
            if (allSelected) {
                setResilianceLayer(true);
            }
        }
    }

    //set all layers from the url if they are set
    useEffect(() => {
        window.scrollTo(0, 0)

        var subcultureLayer1Name = languages[currentLanguage].selection.additional_layer.culture.options[0].param;
        var subcultureLayer2Name = languages[currentLanguage].selection.additional_layer.culture.options[1].param;
        var subcultureLayer3Name = languages[currentLanguage].selection.additional_layer.culture.options[2].param;
        var subresuliencelayer1Name = languages[currentLanguage].selection.additional_layer.resiliance.options[0].param;
        var subresuliencelayer2Name = languages[currentLanguage].selection.additional_layer.resiliance.options[1].param;
        var subresuliencelayer3Name = languages[currentLanguage].selection.additional_layer.resiliance.options[2].param;
        if (searchParams.get("cultureLayer") != null) {
            setCultureLayer(searchParams.get("cultureLayer") == "true");
        }
        if (searchParams.get("resilianceLayer") != null) {
            setResilianceLayer(searchParams.get("resilianceLayer") == "true");
        }
        if (searchParams.get(subcultureLayer1Name) != null) {
            setSubcultureLayer1(searchParams.get(subcultureLayer1Name) == "true");
        }
        if (searchParams.get(subcultureLayer2Name) != null) {
            setSubcultureLayer2(searchParams.get(subcultureLayer2Name) == "true");
        }
        if (searchParams.get(subcultureLayer3Name) != null) {
            setSubcultureLayer3(searchParams.get(subcultureLayer3Name) == "true");
        }
        if (searchParams.get(subresuliencelayer1Name) != null) {
            setSubresuliencelayer1(searchParams.get(subresuliencelayer1Name) == "true");
        }
        if (searchParams.get(subresuliencelayer2Name) != null) {
            setSubresuliencelayer2(searchParams.get(subresuliencelayer2Name) == "true");
        }
        if (searchParams.get(subresuliencelayer3Name) != null) {
            setSubresuliencelayer3(searchParams.get(subresuliencelayer3Name) == "true");
        }
    }, []);

    function navigateToMapWithParameters() {
        ///set the parameters in the url
        /// - leftImage
        /// - rightImage
        /// - cultureLayer
        /// - resilianceLayer
        /// - subcultureLayer1
        /// - subcultureLayer2
        /// - subcultureLayer3
        /// - subresuliencelayer1
        /// - subresuliencelayer2
        /// - subresuliencelayer3

        var leftImage = undefined;

        var rightImage = undefined;
        //select by class name "droppedCard" and differentiating by side
        var droppedCards = document.querySelectorAll(".droppedCard");
        for (var i = 0; i < droppedCards.length; i++) {
            if (droppedCards[i].classList.contains("left")) {
                leftImage = droppedCards[i].id;
            } else if (droppedCards[i].classList.contains("right")) {
                rightImage = droppedCards[i].id;
            }
        }
        //if no image is selected, return and set a warning
        if (leftImage == undefined || rightImage == undefined) {
            setWarning(languages[currentLanguage].selection.compare_layer.warning);

            return;
        }
        //if none of the layers is selected return and set a warning
        if (!cultureLayer && !resilianceLayer && !subcultureLayer1 && !subcultureLayer2 && !subcultureLayer3 && !subresuliencelayer1 && !subresuliencelayer2 && !subresuliencelayer3) {
            setWarning(languages[currentLanguage].selection.additional_layer.warning);
            return;
        }

        var cultureLayerString = cultureLayer ? "true" : "false";
        var resilianceLayerString = resilianceLayer ? "true" : "false";
        var subcultureLayer1String = subcultureLayer1 ? "true" : "false";
        var subcultureLayer2String = subcultureLayer2 ? "true" : "false";
        var subcultureLayer3String = subcultureLayer3 ? "true" : "false";
        var subresuliencelayer1String = subresuliencelayer1 ? "true" : "false";
        var subresuliencelayer2String = subresuliencelayer2 ? "true" : "false";
        var subresuliencelayer3String = subresuliencelayer3 ? "true" : "false";

        setSearchParams({
            leftImage: leftImage,
            rightImage: rightImage,
            cultureLayer: cultureLayerString,
            resilianceLayer: resilianceLayerString,
            historical: subcultureLayer1String,
            landscape: subcultureLayer2String,
            monument: subcultureLayer3String,
            social: subresuliencelayer1String,
            nature: subresuliencelayer2String,
            sport: subresuliencelayer3String,
        });

        setNavigateBool(true);


    }

    //effect for make warning dissappear after 5 seconds
    useEffect(() => {
        if (warning) {
            setTimeout(() => {
                setWarning(false);
            }, 5000);
        }
    }, [warning]);

    //effect for navigate when search params are set
    useEffect(() => {
        if (navigateBool) {
            //add search parameters to navigate to the map
            navigate("/map?" + searchParams.toString() + "&language=" + currentLanguage);
            setNavigateBool(false);
        }
    }, [navigateBool]);

    return (
        <MDBContainer >

            <MDBCol>
                <MDBRow className='mt-4 mb-4'>
                    <h3 >
                        1. {languages[currentLanguage].selection.compare_layer.name}
                    </h3>
                </MDBRow>
                <MDBRow className='mb-3' style={{ height: "fit-content" }}>
                    <Swiper
                        style={{ height: "50rem" }}
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={50}
                        slidesPerView={isTouchDevice ? 1 : 2}
                        navigation
                        allowTouchMove={false}
                        draggable={false}
                        pagination={{ clickable: true }}>
                        {menue.image_configuration.map((item, index) => {
                            return (
                                <SwiperSlide>
                                    <DraggableCard key={index} item={item} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>

                </MDBRow>
                <MDBRow>
                    {isTouchDevice ?
                        <>
                            <MDBRow className='mb-2 ' style={{ height: "fit-content", minHeight: "20vh" }}>
                                <DropArea side="left" currentLanguage={currentLanguage} />
                            </MDBRow>
                            <MDBRow style={{ height: "fit-content", minHeight: "20vh" }}>
                                <DropArea side="right" currentLanguage={currentLanguage} />
                            </MDBRow>
                        </> :
                        <>
                            <MDBCol md="6" style={{ height: "fit-content", minHeight: "20vh" }}>
                                <DropArea side="left" currentLanguage={currentLanguage} />
                            </MDBCol>
                            <MDBCol md="6" style={{ height: "fit-content", minHeight: "20vh" }}>
                                <DropArea side="right" currentLanguage={currentLanguage} />
                            </MDBCol>
                        </>
                    }
                </MDBRow>
                <hr />
                <MDBRow className='mt-4' >
                    <MDBRow>

                        <h3>
                            2. {languages[currentLanguage].selection.additional_layer.name}
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
                <MDBRow className='outer-row mt-4 ' >
                    <MDBRow className='mt-4'>
                        <h3 >
                            3. {languages[currentLanguage].showMap}
                        </h3>
                    </MDBRow>


                </MDBRow>
                <MDBRow className='my-4 d-flex align-items-center justify-content-center' >
                    {warning &&
                        <MDBRow className='mt-4'>
                            <p style={{ color: "red" }}>
                                {warning}
                            </p>
                        </MDBRow>
                    }
                    <MDBBtn
                        disabled={warning}
                        onClick={() => navigateToMapWithParameters()}
                        style={{ width: "90vw" }}
                    >
                        {languages[currentLanguage].showMap}
                    </MDBBtn>


                </MDBRow>



            </MDBCol >
        </MDBContainer >
    )
}

export default Menue