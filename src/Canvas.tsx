// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import imageData from "./data/ImageData";
import { createContext } from "react";
import { fabric } from "fabric";
import ts from "typescript";

function Canvas() {
  const [image, setImage] = useState<string>("");
  const [showBrightnessRange, setShowBrightnessRange] =
    useState<boolean>(false);
  const [showContrastRange, setShowContrastRange] = useState<boolean>(false);
  const [brightnessRange, setBrightnessRange] = useState<number>(100);
  const [contrastRange, setContrastRange] = useState<number>(100);

  var img = document.querySelector("#imageCanvas");
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
    img.style.filter = computedFilters;
  }

  function adjustBrightness(): void {
    setShowBrightnessRange(true);
    setShowContrastRange(false);
  }

  function adjustContrast(): void {
    setShowBrightnessRange(false);
    setShowContrastRange(true);
  }

  return (
    <div className="">
      <div className="row">
        <div className="col-md-3">
          <div className="left-side">
            {imageData.map((img, index) => (
              <div
                key={index}
                className="side-image"
                onClick={() => {
                  setImage(img);
                  setBrightnessRange(100);
                  setContrastRange(100);
                  setShowBrightnessRange(false);
                  setShowContrastRange(false);
                  applyFilter();
                }}
              >
                <img src={img} width="100%" />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <div className="right-side">
            {image ? (
              <>
                <img id="imageCanvas" src={image} width="100%" />

                {showBrightnessRange && (
                  <div className="range">
                    <label
                      style={{ position: "relative", top: "-3px" }}
                      className="me-4"
                    >
                      Brightness
                    </label>

                    <input
                      id="input-brightness"
                      type="range"
                      min="0"
                      max="200"
                      step="1"
                      value={brightnessRange}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setBrightnessRange(parseInt(e.target.value));
                        applyFilter();
                      }}
                      data-filter="brightness"
                      data-scale="%"
                    />
                  </div>
                )}
                {showContrastRange && (
                  <div className="range">
                    <label
                      style={{ position: "relative", top: "-3px" }}
                      className="me-4"
                    >
                      Contrast
                    </label>

                    <input
                      id="input-contrast"
                      type="range"
                      min="0"
                      max="200"
                      step="1"
                      value={contrastRange}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setContrastRange(parseInt(e.target.value));
                        applyFilter();
                      }}
                      data-filter="contrast"
                      data-scale="%"
                    />
                  </div>
                )}
                <div className="buttons">
                  <button className="btn btn-primary">Zoom in</button>
                  <button className="btn btn-primary">Zoom out</button>
                  <button
                    onClick={() => adjustBrightness()}
                    className="btn btn-primary"
                  >
                    Adjust brightness
                  </button>
                  <button
                    onClick={() => adjustContrast()}
                    className="btn btn-primary"
                  >
                    Adjust contrast
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-center mt-5">
                  Select an image to show here
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
