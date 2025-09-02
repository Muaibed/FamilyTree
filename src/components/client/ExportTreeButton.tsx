import React from "react";
import { Button } from "../ui/button";

const ExportTreeButton = () => {
  const downloadSVG = () => {
    const svg = document.querySelector(".rd3t-svg"); 
    if (!svg) {
      alert("No tree SVG found!");
      return;
    }

    const styles = `
      .rd3t-grabbable {
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
      }
      .rd3t-grabbable:active {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
      }
        
      /* Node */
      .rd3t-node {
        cursor: pointer;
        fill: #777;
        stroke: #000;
        stroke-width: 2;
      }
          
      .rd3t-leaf-node {
        cursor: pointer;
        fill: transparent;
        stroke: #000;
        stroke-width: 1;
      }
  
      .rd3t-label__title {
        fill: #000;
        stroke: none;
        font-weight: bolder;
      }
    
      .rd3t-label__attributes {
        fill: #777;
        stroke: none;
        font-weight: bolder;
        font-size: smaller;
      }
      
      /* Link */
      .rd3t-link {
        fill: none;
        stroke: #000;
      }

      .rd3t-tree-container {
        width: 100%;
        height: 100%;
      }

      .custom-link {
        stroke: #4b5462 !important;
        stroke-width: 1 
      }
      .rd3t-node { fill: #f2faff; }
      .rd3t-leaf-node { fill: #f2faff }
      .fill-male { fill: #60B5FF; stroke: none }
      .fill-female { fill: #EC7FA9; stroke: none }
      .fill-white { stroke: none }
    `;
        
      const clonedSvg = svg.cloneNode(true) as SVGElement;
      
      const styleElement = document.createElement("style");
      styleElement.textContent = styles;
      
      clonedSvg.insertBefore(styleElement, clonedSvg.firstChild);
      
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(clonedSvg);
    

    // XML header for safety
    if (!source.match(/^<\?xml/)) {
      source = '<?xml version="1.0" encoding="UTF-8"?>\n' + source;
    }

    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "family-tree.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={downloadSVG}
      className="px-4 py-2"
    >
      Export Tree as SVG
    </Button>
  );
};

export default ExportTreeButton;
