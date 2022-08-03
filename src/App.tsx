// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import imageData from "./data/ImageData";
import { createContext } from "react";
import { fabric } from "fabric";

function App() {
  const [isImage, setIsImage] = useState<boolean>(false);
  const [showBrightnessRange, setShowBrightnessRange] =
    useState<boolean>(false);
  const [showContrastRange, setShowContrastRange] = useState<boolean>(false);
  const [brightnessRange, setBrightnessRange] = useState<number>(100);
  const [contrastRange, setContrastRange] = useState<number>(100);
  // const [mousePressed, setMousePressed] = useState<boolean>(false);
  // const [image, setImage] = useState<string>(imageData[0]);
  // const [Zoom, setZoom] = useState(1);
  // const [canvas, setCanvas] = useState<fabric.Canvas>();

  let Zoom = 1;
  let canvas: fabric.Canvas;
  let mousePressed = false;
  // let f = fabric.Image.filters;

  var img = document.querySelector("#c");
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

  useLayoutEffect(() => {
    // setIsImage(true);

    canvas = new fabric.Canvas("c", {
      height: 400,
      width: 600,
      selection: false,
      defaultCursor: "grab",
    });
    canvas.renderAll();
    // canvas.setHeight(400);
    // canvas.setWidth(600);

    fabric.Image.fromURL(
      imageData[0],
      (img) => {
        img.set({
          left: 0,
          top: 0,
          // Scale image to fit width / height ?
        });
        img.scaleToHeight(400);
        img.scaleToWidth(600);
        // canvas.add(img).renderAll();
        canvas.backgroundImage = img;
        canvas.renderAll();
        // canvas.setActiveObject(img);
        Zoom = 1;
        // setCanvas(canvas);
      }
      // {
      //   crossOrigin: "anonymous",
      // }
    );
    canvas.renderAll();

    // var filter = new fabric.Image.filters.Brightness({
    //   brightness: 0.05,
    // });
    // var object = canvas.getActiveObject();
    // // @ts-ignore
    // object.filters.push(filter);
    // // @ts-ignore

    // object.applyFilters();

    canvas.on("mouse:move", (event) => {
      if (mousePressed) {
        canvas.setCursor("grab");
        canvas.renderAll();
        const delta = new fabric.Point(event.e.movementX, event.e.movementY);
        canvas.relativePan(delta);
      }
    });

    canvas.on("mouse:down", (event) => {
      // console.log("mouse down");
      mousePressed = true;
      canvas.setCursor("grab");
      canvas.renderAll();
    });

    canvas.on("mouse:up", (event) => {
      // console.log("mouse up");
      mousePressed = false;
      canvas.setCursor("default");
      canvas.renderAll();
    });

    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      // setCanva(canvas);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }, []);

  const setBgImage = (image: string) => {
    // setIsImage(true);
    canvas = new fabric.Canvas("c", {
      height: 400,
      width: 600,
    });
    canvas.renderAll();

    fabric.Image.fromURL(
      image,
      (img) => {
        img.set({
          left: 0,
          top: 0,
          // Scale image to fit width / height ?
        });
        img.scaleToHeight(400);
        img.scaleToWidth(600);
        // canvas.add(img).renderAll();
        canvas.backgroundImage = img;
        Zoom = 1;
        canvas.renderAll();

        // canvas.setActiveObject(img);
        // canvas.centerObject(img);
        // canvas.renderAll();
      }
      // {
      //   crossOrigin: "anonymous",
      // }
    );
  };

  const zoomIn = () => {
    // setShowBrightnessRange(false);
    // setShowContrastRange(false);
    Zoom = Zoom * 1.25;
    canvas.setZoom(Zoom);

    // console.log("canvas zoom in", canvas);
    // setCanvas(canvas);
  };

  const zoomOut = () => {
    // setShowBrightnessRange(false);
    // setShowContrastRange(false);
    Zoom = Zoom * 0.8;
    canvas.setZoom(Zoom);

    // console.log("canvas zoom out", canvas);
    // setCanvas(canvas);
  };

  // const adjustBrightness = () => {
  //   var filter = new fabric.Image.filters.Brightness({
  //     brightness: 0.05
  //   });
  //   object.filters.push(filter);
  //   object.applyFilters();
  // };

  // function applyFilter(index: number, filter: fabric.IContrastFilter) {
  //   var obj = canvas.getActiveObject();
  //   obj.filters[index] = filter;
  //   obj.applyFilters(canvas.renderAll.bind(canvas));
  // }
  // document.getElementById("input").onchange = function () {
  //   applyFilter(
  //     0,
  //     new f.Contrast({
  //       contrast: parseInt(document.getElementById("input").value, 10),
  //     })
  //   );
  // };

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
                  // setImage(img);
                  setBgImage(img);
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
            {/* {isImage ? ( */}
            <>
              <canvas id="c"></canvas>
              {/* <input
                id="input"
                type="range"
                min="-255"
                max="255"
                value={range}
                step="1"
                onChange={function (e) {
                  setRange(e.target.value);
                  applyFilter(
                    0,
                    new f.Contrast({
                      contrast: parseInt(
                        document.getElementById("input").value,
                        10
                      ),
                    })
                  );
                }}
              /> */}
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
                <button onClick={() => zoomIn()} className="btn btn-primary">
                  Zoom in
                </button>
                <button onClick={() => zoomOut()} className="btn btn-primary">
                  Zoom out
                </button>
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
            {/* ) : (
              <>
                <h3 className="text-center mt-5">
                  Select an image to show here
                </h3>
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
