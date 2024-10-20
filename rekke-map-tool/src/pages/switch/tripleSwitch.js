import React, { useState, useEffect } from 'react'
import "./style.css";


function TripleSwitch({
  currentLanguage,
  additionalLayer,
  setAdditionalLayer
}) {

  const labels = {
    left: {
      en: {
        title: "Cultural landscape"
      },
      de: {
        title: "Kulturlandschaft"
      }
    },
    center: {
      en: {
        title: "None"
      },
      de: {
        title: "Ohne"
      }
    },
    right: {
      en: {
        title: "Natural space"
      },
      de: {
        title: "Naturlandschaft"
      }
    }
  }

  const [animation, setAnimation] = useState(null)

  const getSwitchAnimation = (value) => {

    if (value === "center" && additionalLayer === "left") {
      setAnimation("left-to-center");
    } else if (value === "right" && additionalLayer === "center") {
      setAnimation("center-to-right");
    } else if (value === "center" && additionalLayer === "right") {
      setAnimation("right-to-center");
    } else if (value === "left" && additionalLayer === "center") {
      setAnimation("center-to-left");
    } else if (value === "right" && additionalLayer === "left") {
      setAnimation("left-to-right");
    } else if (value === "left" && additionalLayer === "right") {
      setAnimation("right-to-left");
    }
    // this.props.onChange(value);
    setAnimation(null)
    setAdditionalLayer(value);
  };

  useEffect(() => {
    getSwitchAnimation("center")
  }, [])

  return (
    <div className="main-container">
      <div
        className={`switch ${animation} ${additionalLayer}-position`}
      ></div>
      <input
        
        onChange={(e) => getSwitchAnimation(e.target.value)}
        name="map-switch"
        id="left"
        type="radio"
        value="left"
      />
      <label
        className={`left-label ${additionalLayer === "left" && "black-font"
          }`}
        htmlFor="left"
      >
        <h4>{labels.left[currentLanguage].title}</h4>
      </label>

      <input
      defaultChecked
        onChange={(e) => getSwitchAnimation(e.target.value)}
        name="map-switch"
        id="center"
        type="radio"
        value="center"
      />
      <label
        className={`center-label ${additionalLayer === "left" && "black-font"
          === "center" && "black-font"
          }`}
        htmlFor="center"
      >
        <h4>{labels.center[currentLanguage].title}</h4>
      </label>

      <input
        onChange={(e) => getSwitchAnimation(e.target.value)}
        name="map-switch"
        id="right"
        type="radio"
        value="right"
      />
      <label
        className={`right-label ${additionalLayer === "right" && "black-font"
          }`}
        htmlFor="right"
      >
        <h4>{labels.right[currentLanguage].title}</h4>
      </label>
    </div>
  )
}

export default TripleSwitch