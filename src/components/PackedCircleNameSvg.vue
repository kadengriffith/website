<script setup>
import svgContent from "./assets/name.svg?raw";
import * as d3 from "d3";

const props = defineProps({
  circleColors: {
    type: Array,
    default: () => [
      "#00ff00",
      "#ff0000",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
      "#ffffff",
    ],
  },
});
const canvasRef = useTemplateRef("canvasRef");
const parentElement = computed(() => canvasRef.value?.parentElement);
const { width: size } = useElementSize(parentElement);
const { pixelRatio } = useDevicePixelRatio();
const scaledSize = computed(() => size.value * pixelRatio.value);
const r = 1;
const cursorForceRadius = 80;
const cursorForceStrength = 4;
const shapeStrengthValue = 1;
const debouncedSetup = useDebounceFn(() => {
  setupSVGPath();
  generateShapePoints();
  initializeCircles();
  createSimulation();
}, 50);
let simulation = null;
let circles = [];
let pathBounds = null;
let pathContext = null;
let shapePoints = [];
let mouseX = 0;
let mouseY = 0;

function getPathData(element) {
  const tagName = element.tagName.toLowerCase();

  switch (tagName) {
    case "path":
      return element.getAttribute("d");
    case "circle":
      const cx = parseFloat(element.getAttribute("cx") || 0);
      const cy = parseFloat(element.getAttribute("cy") || 0);
      const r = parseFloat(element.getAttribute("r") || 0);
      return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${
        cx + r
      } ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy}`;
    case "rect":
      const x = parseFloat(element.getAttribute("x") || 0);
      const y = parseFloat(element.getAttribute("y") || 0);
      const width = parseFloat(element.getAttribute("width") || 0);
      const height = parseFloat(element.getAttribute("height") || 0);
      return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${
        y + height
      } L ${x} ${y + height} Z`;
    case "polygon":
      const points = element.getAttribute("points");
      if (points) {
        const coords = points.trim().split(/\s+|,/).map(Number);
        let path = `M ${coords[0]} ${coords[1]}`;
        for (let i = 2; i < coords.length; i += 2) {
          path += ` L ${coords[i]} ${coords[i + 1]}`;
        }
        return path + " Z";
      }
      break;
    default:
      return null;
  }
}

function createPathContext(offsetX, offsetY, paths, scale) {
  const canvas = document.createElement("canvas");

  canvas.width = scaledSize.value;
  canvas.height = scaledSize.value;

  const ctx = canvas.getContext("2d");
  ctx.setTransform(pixelRatio.value, 0, 0, pixelRatio.value, 0, 0);
  ctx.fillStyle = "white";

  for (let i = 0; i < paths.length; ++i) {
    const path = paths[i];
    const pathData = getPathData(path);

    if (pathData) {
      const path2D = new Path2D(pathData);
      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);
      ctx.fill(path2D);
      ctx.restore();
    }
  }

  pathContext = ctx;
}

function setupSVGPath() {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
  const inputSvg = svgDoc.querySelector("svg");

  if (!inputSvg) {
    return;
  }

  const viewBox = inputSvg.getAttribute("viewBox");

  let sourceWidth, sourceHeight;

  if (viewBox) {
    const [, , w, h] = viewBox.split(" ").map(Number);
    sourceWidth = w;
    sourceHeight = h;
  } else {
    sourceWidth = parseFloat(inputSvg.getAttribute("width")) || 100;
    sourceHeight = parseFloat(inputSvg.getAttribute("height")) || 100;
  }

  const scaleX = (size.value * 0.5) / sourceWidth;
  const scaleY = (size.value * 0.5) / sourceHeight;
  const scale = Math.min(scaleX, scaleY);
  const offsetX = (size.value - sourceWidth * scale) / 2;
  const offsetY = (size.value - sourceHeight * scale) / 2;
  const paths = inputSvg.querySelectorAll(
    "path, polygon, circle, rect, ellipse"
  );
  const whitePaths = [];

  for (let i = 0; i < paths.length; ++i) {
    const path = paths[i];
    const fill = path.getAttribute("fill");

    if (!fill || fill === "white" || fill === "#ffffff" || fill === "#fff") {
      whitePaths.push(path);
    }
  }

  const targetPaths = whitePaths.length > 0 ? whitePaths : Array.from(paths);

  createPathContext(offsetX, offsetY, targetPaths, scale);

  pathBounds = {
    x: offsetX,
    y: offsetY,
    width: sourceWidth * scale,
    height: sourceHeight * scale,
    scale,
    centerX: offsetX + (sourceWidth * scale) / 2,
    centerY: offsetY + (sourceHeight * scale) / 2,
    paths: targetPaths.map((p) => ({
      element: p,
      data: getPathData(p),
    })),
  };
}

function generateShapePoints() {
  if (!pathContext) {
    return;
  }

  shapePoints = [];
  const step = r * 2;

  for (
    let x = pathBounds.x + r;
    x < pathBounds.x + pathBounds.width - r;
    x += step
  ) {
    for (
      let y = pathBounds.y + r;
      y < pathBounds.y + pathBounds.height - r;
      y += step
    ) {
      if (isPointInPath(x, y)) {
        shapePoints.push({ x, y });
      }
    }
  }
}

function isPointInPath(x, y) {
  if (!pathContext) {
    return false;
  }

  if (x >= 0 && x < size.value && y >= 0 && y < size.value) {
    const imageData = pathContext.getImageData(
      Math.floor(x * pixelRatio.value),
      Math.floor(y * pixelRatio.value),
      1,
      1
    );

    return imageData.data[3] > 0;
  }

  return false;
}

function initializeCircles() {
  circles = [];

  for (let i = 0; i < shapePoints.length; ++i) {
    const { x, y } = shapePoints[i];

    circles.push({
      id: i,
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      radius: 1,
      color: props.circleColors[i % props.circleColors.length],
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      targetPoint: { x, y },
    });
  }
}

function shapeForce() {
  return function (alpha) {
    for (let i = 0; i < circles.length; ++i) {
      const circle = circles[i];
      const target = circle.targetPoint;
      const dx = target.x - circle.x;
      const dy = target.y - circle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        const force = alpha * shapeStrengthValue * Math.min(1, distance / 10);

        circle.vx += (dx / distance) * force;
        circle.vy += (dy / distance) * force;
      }
    }
  };
}

function cursorForce() {
  return function (alpha) {
    for (let i = 0; i < circles.length; ++i) {
      const circle = circles[i];
      const dx = circle.x - mouseX;
      const dy = circle.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = cursorForceRadius;

      if (distance < maxDistance && distance > 0) {
        const radialX = dx / distance;
        const radialY = dy / distance;
        const vDotR = circle.vx * radialX + circle.vy * radialY;

        if (vDotR < 0) {
          const force =
            ((maxDistance - distance) / maxDistance) *
            alpha *
            cursorForceStrength;
          const tx = circle.targetPoint.x - circle.x;
          const ty = circle.targetPoint.y - circle.y;
          const tDist = Math.sqrt(tx * tx + ty * ty) || 1;
          const steerX = (tx / tDist) * 0.3;
          const steerY = (ty / tDist) * 0.3;

          circle.vx += radialX * force + steerX * force * 0.5;
          circle.vy += radialY * force + steerY * force * 0.5;
        }
      }
    }
  };
}

function drawCanvas() {
  const canvas = canvasRef.value;

  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });

  ctx.save()

  ctx.setTransform(pixelRatio.value, 0, 0, pixelRatio.value, 0, 0);
  ctx.clearRect(0, 0, scaledSize.value, scaledSize.value);

  for (let i = 0; i < circles.length; ++i) {
    const c = circles[i];

    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
    ctx.fillStyle = c.color;
    ctx.globalAlpha = 0.9;
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  ctx.restore()
}

function createSimulation() {
  if (simulation) {
    simulation.stop();
  }

  simulation = d3
    .forceSimulation(circles)
    .force(
      "collision",
      d3
        .forceCollide()
        .radius(r + 0.1)
        .strength(1)
    )
    .force("shape", shapeForce())
    .alphaDecay(0)
    .velocityDecay(0.05);

  simulation.on("tick", drawCanvas);

  drawCanvas();
}

function onPointermove(event) {
  const rect = canvasRef.value.getBoundingClientRect();

  mouseX = (event.clientX - rect.left) * (size.value / rect.width);
  mouseY = (event.clientY - rect.top) * (size.value / rect.height);

  if (simulation && !simulation.force("cursor")) {
    simulation.force("cursor", cursorForce());
  }

  if (simulation) {
    simulation.alpha(1).restart();
  }
}

function onPointerleave() {
  if (simulation) {
    simulation.force("cursor", null);
    simulation.alpha(0.5).restart();
  }
}

watch([size, pixelRatio, canvasRef], debouncedSetup);

onBeforeUnmount(() => {
  if (simulation) {
    simulation.stop();
  }
});
</script>

<template>
  <div class="relative w-full h-32">
    <canvas
      ref="canvasRef"
      :width="scaledSize"
      :height="scaledSize"
      :style="{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${size}px`,
        height: `${size}px`,
      }"
      @pointermove="onPointermove"
      @pointerleave="onPointerleave"
    />
  </div>
</template>
