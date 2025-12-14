import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

const Designer = () => {
  //   const canvasRef = useRef(null);
  //   const fabricCanvasRef = useRef(null);
  //   const fileInputRef = useRef(null);

  //   useEffect(() => {
  //     const fabricCanvas = new fabric.Canvas(canvasRef.current, {
  //       width: 1200,
  //       height: 800,
  //       selection: true,
  //     });

  //     fabricCanvasRef.current = fabricCanvas;

  //     // Print boundary
  //     const boundary = new fabric.Rect({
  //       left: 0,
  //       top: 0,
  //       width: 1200,
  //       height: 800,
  //       fill: "transparent",
  //       stroke: "#666",
  //       strokeWidth: 2,
  //       strokeDashArray: [8, 6],
  //       selectable: false,
  //       evented: false,
  //     });

  //     fabricCanvas.add(boundary);
  //     // fabricCanvas.sendToBack(boundary);

  //     return () => fabricCanvas.dispose();
  //   }, []);

  //   const handleUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();

  //   reader.onload = async () => {
  //     const canvas = fabricCanvasRef.current;

  //    const imgElement = new Image();
  //     imgElement.src = "/image.png"; // path to your image
  //     imgElement.onload = () => {
  //       const img = new fabric.Image(imgElement, {
  //         left: 150,
  //         top: 150,
  //         scaleX: 0.5,
  //         scaleY: 0.5,
  //       });

  //     // Center image
  //     img.set({
  //       left: canvas.width / 2,
  //       top: canvas.height / 2,
  //       originX: "center",
  //       originY: "center",
  //     });

  //     img.scaleToWidth(500);

  //   };

  //   reader.readAsDataURL(file);
  // };

  //   return (
  //     <div className="flex h-screen bg-gray-100 mt-50">
  //       {/* LEFT PANEL */}
  //       <div className="w-[300px] bg-white border-r p-4">
  //         <button
  //           onClick={() => fileInputRef.current.click()}
  //           className="px-4 py-2 bg-black text-white rounded"
  //         >
  //           Upload Image
  //         </button>

  //         <input
  //           type="file"
  //           ref={fileInputRef}
  //           accept="image/*"
  //           onChange={handleUpload}
  //           hidden
  //         />
  //       </div>

  //       {/* RIGHT CANVAS */}
  //       <div className="flex-1 flex justify-center items-center">
  //         <canvas ref={canvasRef} className="border bg-white" />
  //       </div>
  //     </div>
  //   );
  // };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1168,
      height: 800,
      backgroundColor: null,
    });

    // Modern way to load image
    const imgElement = new Image();
    imgElement.src = "/images/hiw1.jpeg"; // path to your image
    imgElement.onload = () => {
      const img = new fabric.Image(imgElement, {
        left: 0,
        top: 0,
        scaleX: 0.96,
        scaleY: 0.96,
        //selectable: false,
      });

      // // Create a clipping circle
      const Cliprect = new fabric.Rect({
        top: 0,
        left: 0,
        height: 400,
        width: 800,
        absolutePositioned: true,
      });
      
      img.set({ clipPath: Cliprect });
      const text = new fabric.Text("Nikhil", {
        left: 50,
        top: 50,
        fontSize: 40,
        fill: "#000",
        clipPath: Cliprect,
        absolutePositioned: true
      });
      
      canvas.add(img);
      canvas.add(text);

    };

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className=" bg-[url('/images/hiw1.jpeg')] bg-no-repeat bg-contain bg-right mt-35 flex items-center justify-end">
      <canvas ref={canvasRef} className="" />
    </div>
  );
};
export default Designer;
