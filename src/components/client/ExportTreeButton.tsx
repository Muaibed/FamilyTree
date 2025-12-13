import { jsPDF } from 'jspdf';

const getTreeSVG = () => {
  const svg = document.querySelector(".rd3t-svg"); 
    if (!svg) {
      alert("No SVG tree found!");
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

    return source;
}

function svgToCanvas(svgSource: string, SCALE_FACTOR: number): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgSource)}`;
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth * SCALE_FACTOR;
            canvas.height = img.naturalHeight * SCALE_FACTOR;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.scale(SCALE_FACTOR, SCALE_FACTOR);
                ctx.drawImage(img, 0, 0);
                resolve(canvas);
            } else {
                reject(new Error("Could not get 2D context for canvas."));
            }
        };

        img.onerror = (e) => reject(new Error(`Failed to load SVG into image: ${e}`));

        img.src = svgUrl;
    });
}

function canvasToPdf(canvas: Awaited<HTMLCanvasElement>, SCALE_FACTOR: number, fileName: string = 'family-tree.pdf'): void {
    const originalWidth = canvas.width / SCALE_FACTOR;
    const originalHeight = canvas.height / SCALE_FACTOR;

    const doc = new jsPDF({
        orientation: canvas.width > canvas.height ? 'l' : 'p',
        unit: 'px',
        format: [originalWidth, originalHeight]
    });
    
    const imgData = canvas.toDataURL('image/png');

    doc.addImage(
        imgData, 
        'PNG', 
        0, 
        0, 
        originalWidth, 
        originalHeight,
        undefined, // Name
        'FAST' // Compression type
    );

    doc.save(fileName);
}

export const downloadSVG = () => {
    let source = getTreeSVG();
    if (!source)
      return;

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

  export const downloadPDF = async () => {
    let source = getTreeSVG();
    if (!source)
      return;

    const SCALE_FACTOR = 3.125;
    const canvas = await svgToCanvas(source, SCALE_FACTOR);
    canvasToPdf(canvas, SCALE_FACTOR, 'family-tree.pdf')
  };

