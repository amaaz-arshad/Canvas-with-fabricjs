import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import imageData from "./data/ImageData";
import { createContext } from "react";
import { fabric } from "fabric";
import ts from "typescript";

function Newfile() {
  const [isImage, setIsImage] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  useLayoutEffect(() => {
    // setIsImage(true);
    const canvas = new fabric.Canvas("c", {
      height: 450,
      width: 650,
      // backgroundColor: "yellow",
    });
    // canvas.setHeight(400);
    // canvas.setWidth(600);

    // Left Image
    fabric.Image.fromURL(imageData[0], (img) => {
      img.set({
        left: 0,
        top: 0,
        // Scale image to fit width / height ?
      });
      img.scaleToHeight(450);
      img.scaleToWidth(650);
      canvas.add(img);
    });

    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }, []);

  const setBgImage = (image: string) => {
    // setIsImage(true);
    const canvas = new fabric.Canvas("c", {
      height: 450,
      width: 650,
      // backgroundColor: "yellow",
    });

    // Left Image
    fabric.Image.fromURL(image, (img) => {
      img.set({
        left: 0,
        top: 0,
        // Scale image to fit width / height ?
      });
      img.scaleToHeight(450);
      img.scaleToWidth(650);
      canvas.add(img);
      canvas.centerObject(img);
    });
  };

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
                  setBgImage(img);
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
              <canvas id="c" />
              <div className="buttons">
                <button className="btn btn-primary">Zoom in</button>
                <button className="btn btn-primary">Zoom out</button>
                <button className="btn btn-primary">Adjust brightness</button>
                <button className="btn btn-primary">Adjust contrast</button>
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

export default Newfile;
