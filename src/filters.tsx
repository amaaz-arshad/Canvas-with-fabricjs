// @ts-nocheck
import React, { useState } from "react";
import img from "./Sample.jpg";

const Filters = () => {
  const [blurRange, setBlurRange] = useState(0);
  const [brightnessRange, setBrightnessRange] = useState(100);
  const [contrastRange, setContrastRange] = useState(100);

  var image = document.querySelector("img");
  var filterControls = document.querySelectorAll("input[type=range]");
  function applyFilter() {
    var computedFilters = "";
    filterControls.forEach(function (item, index) {
      computedFilters +=
        item.getAttribute("data-filter") +
        "(" +
        item.value +
        item.getAttribute("data-scale") +
        ") ";
    });
    image.style.filter = computedFilters;
  }

  return (
    <div>
      <img src={img} height="500" />
      <br />
      <label>Blur</label>
      <input
        type="range"
        min="0"
        max="100"
        value={blurRange}
        step="1"
        onChange={(e) => {
          setBlurRange(e.target.value);
          applyFilter();
        }}
        data-filter="blur"
        data-scale="px"
      />
      <br />
      <label>Brightness</label>
      <input
        type="range"
        min="0"
        max="200"
        value={brightnessRange}
        step="1"
        onChange={(e) => {
          setBrightnessRange(e.target.value);
          applyFilter();
        }}
        data-filter="brightness"
        data-scale="%"
      />
      <br />
      <label>Contrast</label>
      <input
        type="range"
        min="0"
        max="200"
        value={contrastRange}
        step="1"
        onChange={(e) => {
          setContrastRange(e.target.value);
          applyFilter();
        }}
        data-filter="contrast"
        data-scale="%"
      />
      <br />
      <label>Grayscale</label>
      <input
        type="range"
        min="0"
        max="100"
        value="0"
        step="1"
        onChange={() => applyFilter()}
        data-filter="grayscale"
        data-scale="%"
      />
      <br />
      <label>Hue Rotate</label>
      <input
        type="range"
        min="0"
        max="360"
        value="0"
        step="1"
        onChange={() => applyFilter()}
        data-filter="hue-rotate"
        data-scale="deg"
      />
      <br />
      <label>Invert</label>
      <input
        type="range"
        min="0"
        max="100"
        value="0"
        step="1"
        onChange={() => applyFilter()}
        data-filter="invert"
        data-scale="%"
      />
      <br />
      <label>Opacity</label>
      <input
        type="range"
        min="0"
        max="100"
        value="100"
        step="1"
        onChange={() => applyFilter()}
        data-filter="opacity"
        data-scale="%"
      />
      <br />
      <label>Saturate</label>
      <input
        type="range"
        min="1"
        max="100"
        value="1"
        step="1"
        onChange={() => applyFilter()}
        data-filter="saturate"
        data-scale=""
      />
      <br />
      <label>Sepia</label>
      <input
        type="range"
        min="0"
        max="100"
        value="0"
        step="1"
        onChange={() => applyFilter()}
        data-filter="sepia"
        data-scale="%"
      />
      <br />
    </div>
  );
};

export default Filters;
