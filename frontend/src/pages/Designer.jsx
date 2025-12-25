import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import html2canvas from "html2canvas";

const SIDE_CONFIG = {
  front: { key: "Front", label: "Front", bgImage: "/Black/Front.jpg" },
  back: { key: "Back", label: "Back", bgImage: "/Black/Back.jpg" },
  // left: { key: "left", label: "Left", bgImage: "/Black/left.png" },
  // right: { key: "right", label: "Right", bgImage: "/Black/right.png" },
};

const AVAILABLE_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Navy Blue", value: "#0a1f44" },
  { name: "Red", value: "#c1121f" },
  { name: "Royal Blue", value: "#0057b7" },
  { name: "Grey", value: "#9ca3af" },
  { name: "Olive Green", value: "#556b2f" },
];

const Designer = () => {
  
  const fabricCanvasRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const CliprectRef = useRef(null);
  const initialClipRef = useRef(null);
  const clipStackRef = useRef([]);
  const baseSizeRef = useRef({ width: 1800, height: 1200 });
  const textInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const selectedObjectRef = useRef(null);
  const [showTextControls, setShowTextControls] = useState(false);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [mockMode, setMockMode] = useState(false);
  const mockImageRef = useRef(null);
  const mockClipRef = useRef(null);
  const [currentSide, setCurrentSide] = useState("Front");
  const [sideDesigns, setSideDesigns] = useState({
    front: {
      Black: null,
      White: null,
      NavyBlue: null,
      Red: null,
      RoyalBlue: null,
      Grey: null,
      OliveGreen: null,
    },
    back: {
      Black: null,
      White: null,
      NavyBlue: null,
      Red: null,
      RoyalBlue: null,
      Grey: null,
      OliveGreen: null,
    },
    // left: {
    //   Black: null,
    //   White: null,
    //   NavyBlue: null,
    //   Red: null,
    //   RoyalBlue: null,
    //   Grey: null,
    //   OliveGreen: null,
    // },
    // right: {
    //   Black: null,
    //   White: null,
    //   NavyBlue: null,
    //   Red: null,
    //   RoyalBlue: null,
    //   Grey: null,
    //   OliveGreen: null,
    // },
  });

  const [selectedColor, setSelectedColor] = useState("Black");
  const [imageUrl, setImageUrl] = useState("Black/Front.jpg");
  const sideDesignsRef = useRef(null);

  const containerBoxRef = useRef(null);
const [box, setBox] = useState({ width: 0, height: 0 });

useEffect(() => {
  if (!containerBoxRef.current) return;

  const { width, height } = containerBoxRef.current.getBoundingClientRect();

  setBox({
    width: width * 0.35,
    height: height * 0.45,
  });
}, []);

  useEffect(() => {
    sideDesignsRef.current = sideDesigns;
  }, [sideDesigns]);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 80,
      height: baseSizeRef.current.height,
      backgroundColor: null,
      preserveObjectStacking: true,
    });

    fabricCanvasRef.current = canvas;

    // Modern way to load image
    const imgElement = new Image();
    imgElement.src = imageUrl; // path to your image
    imgElement.onload = () => {
      const img = new fabric.Image(imgElement, {
        left: canvas.getWidth(),
        top: canvas.getHeight(),
        originX: "center",
        originY: "center",
        scaleX: 1,
        scaleY: 1,
        selectable: false,
        evented: false,
        absolutePositioned: true,
      });

      const Cliprect = new fabric.Rect({
        top: containerRef.current.clientHeight / 2 + 40,
        left: containerRef.current.clientWidth / 2 - 5,
        height: 350,
        width: 301,
        originX: "center",
        originY: "center",
        absolutePositioned: true,
        selectable: false,
        evented: false,
      });

      const clipBorder = new fabric.Rect({
        top: containerRef.current.clientHeight / 2 + 43,
        left: containerRef.current.clientWidth / 2 - 5,
        height: 351,
        width: 301,
        absolutePositioned: true,
        originX: "center",
        originY: "center",
        fill: "transparent",
        stroke: "red",
        strokeWidth: 2,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
        visible: false,
      });

      CliprectRef.current = Cliprect;
      initialClipRef.current = Cliprect;
      img.set({ clipPath: Cliprect });

      canvas.add(clipBorder);
      canvas.bringObjectToFront(clipBorder);
      canvas.add(img);

      const selectionHandler = (opt) => {
        const active = canvas.getActiveObject
          ? canvas.getActiveObject()
          : opt.target;
        const obj = active || opt.target;
        const isText =
          obj &&
          (obj.type === "textbox" ||
            obj.type === "i-text" ||
            obj.type === "text");
        if (isText) {
          selectedObjectRef.current = obj;
          setShowTextControls(true);
          setFontColor(obj.fill || "#000000");
          setFontFamily(obj.fontFamily || "Arial");
        } else {
          selectedObjectRef.current = null;
          setShowTextControls(false);
        }
      };

      const clearHandler = () => {
        selectedObjectRef.current = null;
        setShowTextControls(false);
      };

      canvas.on("selection:created", selectionHandler);
      canvas.on("selection:updated", selectionHandler);
      canvas.on("selection:cleared", clearHandler);
    };

    return () => {
      try {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      } catch (e) {}
      canvas.dispose();
    };
  }, []);

  // Responsive canvas for mobile: scale canvas by container width
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const maxWidth = container.clientWidth || baseSizeRef.current.width;
      const factor = Math.min(1, maxWidth / baseSizeRef.current.width);
      const newWidth = Math.round(baseSizeRef.current.width * factor);
      const newHeight = Math.round(baseSizeRef.current.height * factor);
      canvas.setWidth(newWidth);
      canvas.setHeight(newHeight);
      canvas.setZoom(factor);
      canvas.requestRenderAll();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function setCanvasBackground(imageUrl) {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        img.set({
          originX: "center",
          originY: "center",
          left: canvas.width / 2,
          top: canvas.height / 2,
          selectable: false,
          evented: false,
        });

        canvas.setBackgroundImage(img, canvas.requestRenderAll.bind(canvas));
      },
      { crossOrigin: "anonymous" }
    );
  }

  function colorKey(name) {
    return String(name || "").replace(/\s+/g, "");
  }

  function saveCurrentSideDesign() {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.discardActiveObject?.();

    const json = canvas.toJSON(["isMaskImage", "absolutePositioned"]);
    const cKey = colorKey(selectedColor);

    setSideDesigns((prev) => {
      const updated = {
        ...prev,
        [currentSide]: {
          ...prev[currentSide],
          [cKey]: json,
        },
      };
      sideDesignsRef.current = updated;
      return updated;
    });
  }

  function syncAllSidesToNewColor(fromColor, toColor) {
    const fromKey = colorKey(fromColor);
    const toKey = colorKey(toColor);

    setSideDesigns((prev) => {
      const updated = { ...prev };

      // ["front", "back", "left", "right"].forEach(side => {
      ["front", "back"].forEach((side) => {
        const source = prev?.[side]?.[fromKey];
        const target = prev?.[side]?.[toKey];

        // copy ONLY if target color is empty
        if (!target && source) {
          updated[side] = {
            ...updated[side],
            [toKey]: source,
          };
        }
      });

      sideDesignsRef.current = updated;
      return updated;
    });
  }

  // --- Create a new base clip and border and add border to canvas ---
  // returns the clipRect
  function createBaseClip(canvas) {
    // compute clip position relative to container
    const top = containerRef.current.clientHeight / 2 + 40;
    const left = containerRef.current.clientWidth / 2 - 5;

    const clipRect = new fabric.Rect({
      top,
      left,
      height: 350,
      width: 301,
      originX: "center",
      originY: "center",
      absolutePositioned: true,
      selectable: false,
      evented: false,
    });

    // keep refs and add the border (visible) to canvas
    CliprectRef.current = clipRect;
    initialClipRef.current = clipRect;

    // Add border so user sees clip area. Ensure not duplicated.
    try {
      // remove any existing visible border (keep only one)
      const canvasBorders = canvas
        .getObjects()
        .filter(
          (o) => Array.isArray(o.strokeDashArray) && o.strokeDashArray.length
        );
      canvasBorders.forEach((b) => canvas.remove(b));
    } catch (e) {}

    return clipRect;
  }

  // --- Apply the current clip (CliprectRef.current) to all non-mask objects ---
  function applyClipToObjects() {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !CliprectRef.current) return;

    canvas.getObjects().forEach((obj) => {
      if (!obj) return;
      // do not change mask images or clip-border objects
      if (obj.isMaskImage) return;
      if (Array.isArray(obj.strokeDashArray) && obj.strokeDashArray.length)
        return;

      try {
        // every object must get its own clone of the clip (so references don't collide)
        let clipInstance = null;
        try {
          clipInstance = CliprectRef.current.clone();
        } catch (err) {
          // if clone fails, try to reuse original (fallback)
          clipInstance = CliprectRef.current;
        }
        clipInstance.set({
          selectable: false,
          evented: false,
          absolutePositioned: true,
        });

        obj.set("clipPath", clipInstance);
        if (typeof obj.setCoords === "function") obj.setCoords();
      } catch (e) {
        // ignore
      }
    });

    canvas.requestRenderAll && canvas.requestRenderAll();
  }

  function lockClipBorder(canvas) {
    if (!canvas) return;

    canvas.getObjects().forEach((obj) => {
      if (Array.isArray(obj.strokeDashArray) && obj.strokeDashArray.length) {
        obj.set({
          selectable: false,
          evented: false,
          hasControls: false,
          hasBorders: false,
          lockMovementX: true,
          lockMovementY: true,
          lockScalingX: true,
          lockScalingY: true,
          lockRotation: true,
        });
        obj.setCoords();
      }
    });
  }
  function handleSideChange(sideKey) {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    saveCurrentSideDesign();
    canvas.clear();
    setCurrentSide(sideKey);

    setTimeout(() => {
      const baseClip = createBaseClip(canvas);
      CliprectRef.current = baseClip;

      const cKey = colorKey(selectedColor);
      const saved = sideDesignsRef.current?.[sideKey]?.[cKey];

      const shirtPath = `${selectedColor}/${sideKey}.jpg`;
      setCanvasBackground(shirtPath);
      setImageUrl(shirtPath);

      if (!saved) {
        applyClipToObjects();
        lockClipBorder(canvas);
        canvas.requestRenderAll();
        return;
      }

      canvas.loadFromJSON(saved, () => {
        applyClipToObjects();
        lockClipBorder(canvas);
        canvas.requestRenderAll();
      });
    }, 40);
  }

  function handleImageChange(colorObj) {
    if (mockMode) return;
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const prevColor = selectedColor;

    // 1️⃣ Save current side
    saveCurrentSideDesign();

    // 2️⃣ SYNC ALL SIDES from prevColor → newColor
    syncAllSidesToNewColor(prevColor, colorObj.name);

    // 3️⃣ Update color state
    setSelectedColor(colorObj.name);
    const newImageUrl = `${colorObj.name}/${currentSide}.jpg`;
    setImageUrl(newImageUrl);

    setTimeout(() => {
      setCanvasBackground(newImageUrl);

      const baseClip = createBaseClip(canvas);
      CliprectRef.current = baseClip;

      const cKey = colorKey(colorObj.name);
      const saved = sideDesignsRef.current?.[currentSide]?.[cKey];

      if (!saved) {
        applyClipToObjects();
        lockClipBorder(canvas);
        canvas.requestRenderAll();
        return;
      }

      canvas.loadFromJSON(saved, () => {
        canvas.getObjects().forEach((obj) => {
          if (obj.isMaskImage) {
            obj.set({
              selectable: false,
              evented: false,
              absolutePositioned: true,
            });
            return;
          }
          let clipClone;
          try {
            clipClone = baseClip.clone();
          } catch {
            clipClone = baseClip;
          }
          clipClone.set({
            selectable: false,
            evented: false,
            absolutePositioned: true,
          });
          obj.set("clipPath", clipClone);
          obj.setCoords?.();
        });

        lockClipBorder(canvas);
        canvas.requestRenderAll();
      });
    }, 40);
  }

  function composeClip() {
    const canvas = fabricCanvasRef.current;
    const clips = clipStackRef.current || [];
    if (!canvas) return;

    if (clips.length === 0) {
      CliprectRef.current = initialClipRef.current;
    } else {
      // create a group from confirmed clip shapes
      try {
        const cloned = clips.map((c) => {
          // ensure we clone to detach from canvas
          let copy = null;
          try {
            copy = c.clone();
          } catch (e) {
            copy = c;
          }
          copy.set({
            selectable: false,
            evented: false,
            absolutePositioned: true,
          });
          return copy;
        });
        const group = new fabric.Group(cloned, {
          absolutePositioned: true,
          selectable: false,
          evented: false,
        });
        CliprectRef.current = group;
      } catch (e) {
        // fallback: use last clip only
        CliprectRef.current = clips[clips.length - 1];
      }
    }

    // apply composed clip to all canvas objects (except visible mock previews)
    try {
      canvas.getObjects().forEach((obj) => {
        if (!obj) return;
        if (obj === mockImageRef.current) return;
        try {
          obj.set("clipPath", CliprectRef.current);
          if (typeof obj.setCoords === "function") obj.setCoords();
        } catch (e) {}
      });
    } catch (e) {}
    canvas.requestRenderAll && canvas.requestRenderAll();
  }

  function handleColorChange(e) {
    const val = e.target.value;
    setFontColor(val);
    const obj = selectedObjectRef.current;
    const canvas = fabricCanvasRef.current;
    if (
      obj &&
      canvas &&
      (obj.type === "textbox" || obj.type === "i-text" || obj.type === "text")
    ) {
      obj.set("fill", val);
      canvas.requestRenderAll();
    }
  }

  function handleBringToFront() {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const active = canvas.getActiveObject();
    if (!active) return;

    try {
      const topIndex = canvas.getObjects().length - 1;
      canvas.moveTo(active, topIndex);
      if (typeof active.setCoords === "function") active.setCoords();
      canvas.requestRenderAll();
    } catch (err) {
      try {
        canvas.remove(active);
        canvas.add(active);
        if (typeof active.setCoords === "function") active.setCoords();
        canvas.requestRenderAll();
      } catch (e) {
        console.error("Could not bring object to front", e);
      }
    }
  }

  function handleDeleteObject() {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const activeObjects =
      (typeof canvas.getActiveObjects === "function" &&
        canvas.getActiveObjects()) ||
      (canvas.getActiveObject() ? [canvas.getActiveObject()] : []);

    if (!activeObjects || activeObjects.length === 0) return;

    activeObjects.forEach((obj) => {
      if (!obj) return;
      const t = obj.type;
      if (
        t === "image" ||
        t === "textbox" ||
        t === "text" ||
        t === "i-text" ||
        t === "group" ||
        t === "path"
      ) {
        try {
          canvas.remove(obj);
        } catch (e) {}
      }
    });

    try {
      // clear selection state
      canvas.discardActiveObject && canvas.discardActiveObject();
    } catch (e) {}
    selectedObjectRef.current = null;
    setShowTextControls(false);
    canvas.requestRenderAll && canvas.requestRenderAll();
  }

  function handleFontFamilyChange(e) {
    const val = e.target.value;
    setFontFamily(val);
    const obj = selectedObjectRef.current;
    const canvas = fabricCanvasRef.current;
    if (
      obj &&
      canvas &&
      (obj.type === "textbox" || obj.type === "i-text" || obj.type === "text")
    ) {
      const apply = () => {
        obj.set("fontFamily", val);
        canvas.requestRenderAll();
      };
      if (document.fonts && document.fonts.load) {
        document.fonts.load(`16px "${val}"`).then(apply).catch(apply);
      } else {
        apply();
      }
    }
  }

  function addCanvasText() {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const clipRect = CliprectRef.current;
    const value =
      (textInputRef.current && textInputRef.current.value) || "New Text";
    const ff = fontFamily || "Arial";
    const color = fontColor || "#000000";

    const createText = () => {
      const text = new fabric.Textbox(value, {
        left: clipRect.left + 50,
        top: clipRect.top + 50,
        fontSize: 30,
        fill: color,
        fontFamily: ff,
        clipPath: clipRect,
        absolutePositioned: true,
      });

      canvas.add(text);
      setTimeout(() => {
        if (canvas.contains(text)) {
          canvas.setActiveObject(text);
          if (typeof text.enterEditing === "function") {
            text.enterEditing();
            if (typeof text.selectAll === "function") text.selectAll();
          }
          const ta =
            canvas._textInput ||
            canvas.hiddenTextarea ||
            document.querySelector("textarea.fabric-textarea");
          if (ta && typeof ta.focus === "function") ta.focus();
          canvas.requestRenderAll();
        }
      }, 0);
    };

    if (document.fonts && document.fonts.load) {
      document.fonts.load(`16px "${ff}"`).then(createText).catch(createText);
    } else {
      createText();
    }
    textInputRef.current.value = "";
  }

  function handleUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const imgEl = new Image();
      imgEl.src = reader.result;
      imgEl.onload = () => {
        const canvas = fabricCanvasRef.current;
        canvas.discardActiveObject();
        if (!canvas) return;
        const clipRect = CliprectRef.current;
        const fImg = new fabric.Image(imgEl, {
          originX: "center",
          originY: "center",
          isMaskImage: false,
        });

        if (clipRect) {
          const cx = clipRect.left + 50;
          const cy = clipRect.top + 50;
          fImg.set({ left: cx, top: cy });
          const scale = Math.min(
            clipRect.width / fImg.width,
            clipRect.height / fImg.height
          );
          if (scale > 0) fImg.scale(scale);
          fImg.set({ clipPath: clipRect });
        } else {
          fImg.set({
            left: canvas.getWidth() / 2,
            top: canvas.getHeight() / 2,
          });
        }

        canvas.add(fImg);
      };
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function downloadClipArea() {
    const canvas = fabricCanvasRef.current;
    const clipArea = CliprectRef.current;
    if (!canvas || !clipArea) {
      alert("Please import a canvas and ensure clip area exists.");
      return;
    }

    const originalBg = canvas.backgroundImage;
    const wasClipVisible = clipArea.visible;

    // hide clip area for capture
    try {
      clipArea.visible = false;
    } catch (e) {}
    if (typeof canvas.setBackgroundImage === "function") {
      canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    } else {
      canvas.backgroundImage = null;
      if (typeof canvas.requestRenderAll === "function")
        canvas.requestRenderAll();
    }

    const scale = 5;
    const bounds = clipArea.getBoundingRect(true);

    const dataURL = canvas.toDataURL({
      format: "png",
      left: bounds.left + 1,
      top: bounds.top + 1,
      width: bounds.width - 1,
      height: bounds.height - 1,
      multiplier: scale,
      withoutTransform: false,
    });

    const image = new Image();
    image.onload = () => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = Math.round(bounds.width * scale);
      tempCanvas.height = Math.round(bounds.height * scale);
      const ctx = tempCanvas.getContext("2d");
      ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      ctx.drawImage(image, 0, 0);

      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const parts = Object.fromEntries(
        fmt.formatToParts(new Date()).map((p) => [p.type, p.value])
      );
      const indiaIsoSafe = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}-${parts.minute}-${parts.second}`;
      const link = document.createElement("a");
      link.href = tempCanvas.toDataURL("image/png");
      link.download = `Design_${indiaIsoSafe}_clip.png`;
      // append to DOM for broader browser compatibility, trigger download, then remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // restore
      if (typeof canvas.setBackgroundImage === "function") {
        canvas.setBackgroundImage(originalBg, canvas.renderAll.bind(canvas));
      } else {
        canvas.backgroundImage = originalBg;
        if (typeof canvas.requestRenderAll === "function")
          canvas.requestRenderAll();
      }
      try {
        clipArea.visible = wasClipVisible;
      } catch (e) {}
      if (typeof canvas.renderAll === "function") canvas.renderAll();
    };
    image.src = dataURL;
  }

  async function downloadCanvasWithBackground() {
    const canvas = fabricCanvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      alert("Canvas or container not found.");
      return;
    }

    canvas.discardActiveObject();
    canvas.requestRenderAll();

    // if you change the border color change here as well
    const objects = canvas.getObjects() || [];
    const borderObjs = objects.filter(
      (o) =>
        o?.stroke &&
        Array.isArray(o.strokeDashArray) &&
        o.strokeDashArray.length > 0
    );
    const prevVis = borderObjs.map((o) => o.visible);
    borderObjs.forEach((o) => (o.visible = false));
    canvas.requestRenderAll();

    await nextFrame();

    try {
      const exportCanvas = await html2canvas(container, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false,
        scale: 3,
        width: container.offsetWidth,
        height: container.offsetHeight,
        scrollX: 0,
        scrollY: 0,
      });

      const fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const parts = Object.fromEntries(
        fmt.formatToParts(new Date()).map((p) => [p.type, p.value])
      );

      const indiaIsoSafe = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}-${parts.minute}-${parts.second}`;

      const dataUrl = exportCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Design_${indiaIsoSafe}_full-mockup.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("html2canvas failed:", err);

      const fallbackDataUrl = canvas.toDataURL({
        format: "png",
        multiplier: 2,
      });

      const link = document.createElement("a");
      link.href = fallbackDataUrl;
      link.download = `Design_canvas-only.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      borderObjs.forEach((o, i) => {
        if (o) o.visible = prevVis[i];
      });
      canvas.requestRenderAll();
    }
  }

  const nextFrame = () => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  };

  function handleMockPrint() {
    // enter mock selection mode: show thumbnails and allow selecting a mockup
    setMockMode(true);
  }

  async function selectMockup(src) {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    // remove previous temporary mock if any
    try {
      if (mockImageRef.current) {
        canvas.remove(mockImageRef.current);
        mockImageRef.current = null;
      }
      if (mockClipRef.current) {
        // mockClipRef may be a clip object not added to canvas â€” just clear reference
        mockClipRef.current = null;
      }
    } catch (e) {}

    const imgEl = new Image();
    imgEl.crossOrigin = "anonymous";
    imgEl.src = src;
    imgEl.onload = () => {
      // visible mock image
      const img = new fabric.Image(imgEl, {
        left: CliprectRef.current.left + CliprectRef.current.width / 2,
        top: CliprectRef.current.top + CliprectRef.current.height / 2,
        originX: "center",
        originY: "center",
        opacity: 1,
        selectable: true,
        evented: true,
        hasControls: true,
        absolutePositioned: true,
      });

      // create a separate clip image (not added to canvas) to be used as clipPath when confirmed
      const clipImage = new fabric.Image(imgEl, {
        left: img.left,
        top: img.top,
        originX: "center",
        originY: "center",
        absolutePositioned: true,
        selectable: false,
        evented: false,
      });

      mockImageRef.current = img; // visible
      mockClipRef.current = clipImage; // prepared clip image (not used until confirm)

      canvas.add(img);
      try {
        canvas.setActiveObject(img);
        //canvas.bringToFront(img);
        canvas.bringObjectToFront(img);
      } catch (e) {}
      canvas.requestRenderAll();
    };
  }

  function cancelMockup() {
    const canvas = fabricCanvasRef.current;
    try {
      if (mockImageRef.current) canvas.remove(mockImageRef.current);
    } catch (e) {}
    mockImageRef.current = null;
    mockClipRef.current = null;
    setMockMode(false);
    // restore clip to any existing CliprectRef if needed (no-op)
    canvas && canvas.requestRenderAll && canvas.requestRenderAll();
  }

  function confirmMockup() {
    const canvas = fabricCanvasRef.current;
    if (!mockImageRef.current) return;

    try {
      mockImageRef.current.clone((cloned) => {
        cloned.set({
          selectable: false,
          evented: false,
          absolutePositioned: true,
          isMaskImage: true,
        });

        // push into clip stack
        clipStackRef.current.push(cloned);

        // recompute composed clip and apply
        composeClip();
        setClipCount(clipStackRef.current.length);

        // make the visible mock non-interactive template (keep on canvas)
        try {
          mockImageRef.current.set({
            selectable: false,
            evented: false,
            isMaskImage: true, // âœ… preserve mask flag
          });
        } catch (e) {}

        // clear temporary clip ref
        mockClipRef.current = null;

        // exit mock mode and re-enable buttons
        setMockMode(false);
        canvas && canvas.requestRenderAll && canvas.requestRenderAll();
      });
    } catch (e) {
      // fallback: if cloning fails
      try {
        const src =
          mockImageRef.current._element && mockImageRef.current._element.src;
        if (src) {
          const imgEl = new Image();
          imgEl.crossOrigin = "anonymous";
          imgEl.src = src;
          imgEl.onload = () => {
            const clipImg = new fabric.Image(imgEl, {
              left: mockImageRef.current.left,
              top: mockImageRef.current.top,
              originX: mockImageRef.current.originX || "center",
              originY: mockImageRef.current.originY || "center",
              scaleX: mockImageRef.current.scaleX,
              scaleY: mockImageRef.current.scaleY,
              angle: mockImageRef.current.angle || 0,
              selectable: false,
              evented: false,
              absolutePositioned: true,
              isMaskImage: true, // âœ… mark as mask
            });
            CliprectRef.current = clipImg;

            canvas.getObjects().forEach((obj) => {
              if (!obj || obj === mockImageRef.current) return;
              try {
                obj.set("clipPath", CliprectRef.current);
                if (typeof obj.setCoords === "function") obj.setCoords();
              } catch (e) {}
            });

            try {
              mockImageRef.current.set({
                selectable: false,
                evented: false,
                isMaskImage: true, // âœ… preserve mask flag
              });
            } catch (e) {}

            setMockMode(false);
            canvas && canvas.requestRenderAll && canvas.requestRenderAll();
          };
        }
      } catch (err) {}
    }
  }

  // function handleImageChange(colorObj) {
  //   if (mockMode) return;

  //   const canvas = fabricCanvasRef.current;
  //   if (!canvas) return;

  //   // 1️⃣ Save current design
  //   const json = canvas.toJSON(['isMaskImage']);
  //   setSideDesigns(prev => ({
  //     ...prev,
  //     [currentSide]: {
  //       ...prev[currentSide],
  //       [selectedColor]: json,
  //     },
  //   }));

  //   // 2️⃣ Update color / URL (note: no slash if your files are like Blackfront.png)
  //   setSelectedColor(colorObj.name);
  //   const newImageUrl = `${colorObj.name}/${currentSide}.png`;
  //   console.log("Changing to", newImageUrl);
  //   setImageUrl(newImageUrl);

  //   // 3️⃣ Remove ONLY shirt image
  //   if (baseShirtRef.current[currentSide]) {
  //     try {
  //       canvas.remove(baseShirtRef.current[currentSide]);
  //     } catch (e) {
  //       console.log("Old shirt not found");
  //     }
  //   }

  //   // 4️⃣ Load new shirt
  //   const imgElement = new Image();
  //   imgElement.crossOrigin = "anonymous";
  //   imgElement.src = newImageUrl;
  //   imgElement.onload = () => {
  //     const img = new fabric.Image(imgElement, {
  //       left: canvas.getWidth() / 2,
  //       top: canvas.getHeight() / 2,
  //       originX: "center",
  //       originY: "center",
  //       scaleX: 1,
  //       scaleY: 1,
  //       selectable: false,
  //       evented: false,
  //       absolutePositioned: true,
  //     });

  //     canvas.add(img);
  //     baseShirtRef.current[currentSide] = img;

  //     // // Put shirt behind everything
  //     // canvas.moveTo(img, 0);

  //     // Ensure existing clipBorder (created in createBaseClip) stays on top
  //     const border = canvas
  //       .getObjects()
  //       .find(o => Array.isArray(o.strokeDashArray) && o.strokeDashArray.length);
  //     if (border) {
  //       border.selectable = false;
  //       border.evented = false;
  //       // canvas.bringToFront(border);
  //       canvas.add(border);
  //     }

  //     canvas.requestRenderAll();
  //   };
  // }

  return (
    <div className="mt-35"
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#ffffff",
        borderColor: "red",
      }}
    >
      {/* LEFT PANEL */}
      <div
        style={{
          width: 300,
          padding: 16,
          borderRight: "1px solid #e5e7eb",
          background: "#fff",
        }}
      >
        <div>
          <input
            id="textName"
            ref={textInputRef}
            type="text"
            placeholder="Enter text here"
            style={{ width: 200, height: 5, padding: 16, marginBottom: 10 }}
          />
        </div>
        <div
          style={{
            marginTop: 8,
            display: "flex",
            gap: 8,
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={addCanvasText}
              disabled={mockMode}
              style={{ padding: "8px 12px" }}
            >
              Add Text
            </button>
            <button
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
              disabled={mockMode}
              style={{ padding: "8px 12px" }}
            >
              Upload Image
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleBringToFront}
              disabled={mockMode}
              style={{ padding: "8px 12px" }}
            >
              Bring to Front
            </button>
            <button
              onClick={handleDeleteObject}
              disabled={mockMode}
              style={{
                padding: "8px 12px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Delete Object
            </button>
            <button
              onClick={() => downloadClipArea()}
              disabled={mockMode}
              style={{ padding: "8px 12px" }}
            >
              Download Clip
            </button>
          </div>
          <div>
            <button
              onClick={() => downloadCanvasWithBackground()}
              disabled={mockMode}
              style={{ padding: "8px 12px" }}
            >
              Download Full Canvas
            </button>
            <button
              onClick={handleMockPrint}
              disabled={mockMode}
              style={{ padding: "8px 12px" }}
            >
              Mock Print
            </button>
          </div>
          <div style={{ marginTop: 20 }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "12px",
                color: "#6b7280",
              }}
            >
              Select Color:{" "}
              <span style={{ color: "#000" }}>{selectedColor}</span>
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                padding: "4px",
              }}
            >
              {AVAILABLE_COLORS.map((color) => {
                const isActive = selectedColor === color.name;

                return (
                  <button
                    key={color.value}
                    disabled={mockMode}
                    
                    // Calling handleImageChange and any other logic here
                    onClick={() => handleImageChange(color)}
                    style={{
                      position: "relative",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: color.value,
                      cursor: mockMode ? "not-allowed" : "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      // 1. The main border of the color circle itself
                      // Using a white border when active creates a "gap" effect
                      border: isActive ? "3px solid #fff" : "1px solid #e5e7eb",

                      // 2. The black outline around the white border
                      outline: isActive ? "2px solid #000" : "none",

                      boxShadow: isActive
                        ? "0 4px 12px rgba(0,0,0,0.3)"
                        : "0 2px 4px rgba(0,0,0,0.05)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {/* 3. The "Moving" Black Ring (Framer Motion) */}
                    
                      {isActive && (
                        <div
                          layoutId="colorOutline" // This makes the ring "slide" between colors
                          
                          style={{
                            position: "absolute",
                            inset: -5, // Slightly outside the button
                            borderRadius: "50%",
                            border: "2px solid #000",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    

                    {/* Tooltip */}
                    <span
                      
                      style={{
                        position: "absolute",
                        backgroundColor: "#000",
                        color: "#fff",
                        fontSize: "10px",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    >
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {mockMode && (
            <div
              style={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                {/* Thumbnail images - replace src paths with your mockup images in public/ */}
                <img
                  src="/cloud.png"
                  alt="mock1"
                  onClick={() => selectMockup("/cloud.png")}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    cursor: "pointer",
                    border: "1px solid #ddd",
                  }}
                />
                <img
                  src="/heart-shape.png"
                  alt="mock2"
                  onClick={() => selectMockup("/heart-shape.png")}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    cursor: "pointer",
                    border: "1px solid #ddd",
                  }}
                />
                <img
                  src="/Black/Front.jpg"
                  alt="mock3"
                  onClick={() => selectMockup("/Black/Front.jpg")}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    cursor: "pointer",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={cancelMockup}
                  style={{ padding: "8px 12px", background: "#ff0000ff" }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmMockup}
                  style={{
                    padding: "8px 12px",
                    background: "#10b981",
                    color: "#fff",
                  }}
                >
                  Confirm Mockup
                </button>
              </div>
            </div>
          )}

          {showTextControls && (
            <div
              style={{
                width: 250,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <label style={{ fontSize: 15, color: "red", paddingRight: 5 }}>
                Font Color
              </label>
              <input
                type="color"
                value={fontColor}
                style={{ height: 30, width: 250 }}
                onChange={handleColorChange}
              />

              <label style={{ fontSize: 15, color: "red", paddingRight: 5 }}>
                Font Family
              </label>
              <select
                value={fontFamily}
                style={{ height: 30, width: 250, fontSize: 15 }}
                onChange={handleFontFamilyChange}
              >
                <option>Arial</option>
                <option>Georgia</option>
                <option>Times New Roman</option>
                <option>Helvetica</option>
                <option>Comic Sans MS</option>
                <option>Dancing Script</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          flex: 1,
          backgroundImage: `url('${imageUrl}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <canvas ref={canvasRef} />{" "}
        <div
          style={{
            position: "absolute",
            width: "251px",
            height: "351px",
            left: "40%",
            top: "48%",
            transform: "translate(-50%, -50%)",
            border: "2px dashed red",
            pointerEvents: "none", // 🔥 impossible to select
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* RIGHT SIDE THUMBNAIL SWITCHER */}
      <div
        style={{
          display: "flex-row",
          gap: "12px",
          padding: "20px",
          justifyContent: "center", // Centers them horizontally
          alignItems: "flex-start", // Prevents vertical stretching
        }}
      >
        {Object.values(SIDE_CONFIG).map((side) => {
          const isActive = currentSide === side.key;
          const thumbsrc = `${selectedColor}/${side.key}.jpg`;

          return (
            <button
              key={side.key}
              onClick={() => handleSideChange(side.key)}
              
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100px", // Fixed width
                padding: "16px 8px",
                cursor: "pointer",
                border: "none",
                borderRadius: "16px",
                background: isActive ? "#fff" : "#f3f4f6",
                boxShadow: isActive
                  ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                  : "inset 0 0 0 1px #e5e7eb",
                transition: "background 0.3s ease",
              }}
            >
              {/* The Selection Ring */}

                {isActive && (
                  <div
                    layoutId="outline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: "absolute",
                      inset: -2,
                      border: "2px solid #000",
                      borderRadius: "18px",
                      pointerEvents: "none",
                    }}
                  />
                )}


              <div
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={thumbsrc}
                  alt={side.label}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    filter: isActive ? "none" : "grayscale(1) opacity(0.6)",
                  }}
                />
              </div>

              <span
                style={{
                  fontSize: "15px",
                  fontWeight: isActive ? "800" : "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: isActive ? "#000" : "#9ca3af",
                }}
              >
                {side.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Designer;
