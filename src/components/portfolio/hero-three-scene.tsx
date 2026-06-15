"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const colors = {
  paper: 0xf7f7f5,
  white: 0xffffff,
  muted: 0xf0f0ee,
  border: 0xe5e5e3,
  ink: 0x0a0a0a,
  softInk: 0x6b7280,
  green: 0x16a34a,
  greenDeep: 0x15803d,
  indigo: 0x4f46e5,
};

type SceneNode = THREE.Group & {
  userData: {
    baseY?: number;
    spin?: number;
  };
};

function addBox(
  parent: THREE.Object3D,
  size: [number, number, number],
  color: number,
  position: THREE.Vector3,
  options: {
    opacity?: number;
    emissive?: number;
    emissiveIntensity?: number;
    metalness?: number;
    roughness?: number;
  } = {},
) {
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.46,
    metalness: options.metalness ?? 0.12,
    emissive: options.emissive ?? color,
    emissiveIntensity: options.emissiveIntensity ?? 0.02,
    transparent: options.opacity !== undefined,
    opacity: options.opacity ?? 1,
  });

  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.copy(position);
  parent.add(mesh);

  return mesh;
}

function addEdgeOutline(mesh: THREE.Mesh, color = colors.green, opacity = 0.5) {
  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    }),
  );
  mesh.add(outline);
  return outline;
}

function addPanelLines(
  parent: THREE.Object3D,
  width: number,
  height: number,
  variant: "terminal" | "dashboard" | "mobile" | "course",
) {
  const lineColors =
    variant === "terminal"
      ? [colors.green, colors.green, colors.indigo, colors.green]
      : [colors.ink, colors.green, colors.indigo, colors.greenDeep];

  const lineCount = variant === "mobile" ? 5 : 6;

  for (let index = 0; index < lineCount; index += 1) {
    const ratio = variant === "dashboard" ? 0.25 + (index % 3) * 0.16 : 0.32;
    const lineWidth = width * (ratio + ((index * 17) % 21) / 100);
    const lineHeight = variant === "mobile" ? 0.055 : 0.06;
    const line = new THREE.Mesh(
      new THREE.BoxGeometry(lineWidth, lineHeight, 0.026),
      new THREE.MeshBasicMaterial({
        color: lineColors[index % lineColors.length],
        transparent: true,
        opacity: variant === "terminal" ? 0.82 : 0.52,
        depthWrite: false,
      }),
    );
    line.position.set(
      -width * 0.26 + (index % 2) * width * 0.12,
      height * 0.18 - index * height * 0.105,
      0.082,
    );
    parent.add(line);
  }
}

function addFloatingPanel({
  parent,
  width,
  height,
  position,
  rotation,
  variant,
}: {
  parent: THREE.Object3D;
  width: number;
  height: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  variant: "terminal" | "dashboard" | "mobile" | "course";
}) {
  const panel = new THREE.Group() as SceneNode;
  panel.position.copy(position);
  panel.rotation.copy(rotation);
  panel.userData.baseY = position.y;
  panel.userData.spin = variant === "mobile" ? 0.45 : 0.25;

  const bodyColor = variant === "terminal" ? colors.ink : colors.white;
  const body = addBox(
    panel,
    [width, height, 0.09],
    bodyColor,
    new THREE.Vector3(),
    {
      opacity: variant === "terminal" ? 0.92 : 0.9,
      emissive: variant === "terminal" ? colors.green : colors.white,
      emissiveIntensity: variant === "terminal" ? 0.16 : 0.02,
      metalness: 0.16,
      roughness: 0.32,
    },
  );
  addEdgeOutline(
    body,
    variant === "terminal" ? colors.green : colors.border,
    0.72,
  );

  const header = addBox(
    panel,
    [width * 0.86, height * 0.12, 0.035],
    variant === "terminal" ? colors.green : colors.muted,
    new THREE.Vector3(0, height * 0.33, 0.078),
    {
      opacity: variant === "terminal" ? 0.9 : 0.96,
      emissive: variant === "terminal" ? colors.green : colors.border,
      emissiveIntensity: variant === "terminal" ? 0.3 : 0.02,
    },
  );
  header.name = "panel-header";

  addPanelLines(panel, width, height, variant);

  if (variant === "dashboard") {
    for (let index = 0; index < 4; index += 1) {
      const bar = addBox(
        panel,
        [width * 0.1, height * (0.22 + index * 0.04), 0.045],
        index % 2 ? colors.indigo : colors.green,
        new THREE.Vector3(width * (-0.34 + index * 0.21), -height * 0.22, 0.09),
        { opacity: 0.75, emissiveIntensity: 0.08 },
      );
      bar.name = "dashboard-bar";
    }
  }

  if (variant === "mobile") {
    const homePill = addBox(
      panel,
      [width * 0.28, height * 0.035, 0.035],
      colors.green,
      new THREE.Vector3(0, -height * 0.39, 0.09),
      { opacity: 0.72, emissiveIntensity: 0.16 },
    );
    homePill.name = "mobile-home";
  }

  parent.add(panel);
  return panel;
}

function addSignalNode(
  parent: THREE.Object3D,
  position: THREE.Vector3,
  color: number,
) {
  const node = new THREE.Group() as SceneNode;
  node.position.copy(position);
  node.userData.baseY = position.y;

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 20, 16),
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.18,
      metalness: 0.16,
      emissive: color,
      emissiveIntensity: 0.85,
    }),
  );

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.34, 0.012, 8, 54),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    }),
  );
  ring.rotation.x = Math.PI / 2;

  const stem = addBox(
    node,
    [0.04, 0.42, 0.04],
    color,
    new THREE.Vector3(0, -0.24, 0),
    { opacity: 0.36, emissiveIntensity: 0.12 },
  );
  stem.name = "node-stem";

  node.add(core, ring);
  parent.add(node);
  return node;
}

function addDataStream(
  parent: THREE.Object3D,
  points: THREE.Vector3[],
  color: number,
  offset: number,
) {
  const curve = new THREE.CatmullRomCurve3(points);
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 80, 0.014, 7, false),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    }),
  );
  parent.add(tube);

  const pulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 16, 12),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    }),
  );
  parent.add(pulse);

  return { curve, tube, pulse, offset, speed: 0.08 + offset * 0.045 };
}

function addMizoSignalMarks(parent: THREE.Object3D) {
  const marks: SceneNode[] = [];

  for (let index = 0; index < 12; index += 1) {
    const mark = new THREE.Group() as SceneNode;
    const angle = (Math.PI * 2 * index) / 12;
    const radius = 2.4 + (index % 3) * 0.52;
    mark.position.set(
      Math.cos(angle) * radius,
      -0.18 + (index % 4) * 0.32,
      Math.sin(angle) * radius * 0.38,
    );
    mark.rotation.set(Math.PI / 2.6, 0, angle);
    mark.userData.baseY = mark.position.y;
    mark.userData.spin = index % 2 ? -0.34 : 0.34;

    const triangle = new THREE.Mesh(
      new THREE.CircleGeometry(0.14 + (index % 3) * 0.025, 3),
      new THREE.MeshBasicMaterial({
        color: index % 2 ? colors.green : colors.indigo,
        transparent: true,
        opacity: 0.26,
        depthWrite: false,
      }),
    );
    mark.add(triangle);
    parent.add(mark);
    marks.push(mark);
  }

  return marks;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (
      child instanceof THREE.Mesh ||
      child instanceof THREE.Line ||
      child instanceof THREE.LineSegments ||
      child instanceof THREE.Points
    ) {
      child.geometry.dispose();

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
}

export function HeroThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = containerRef.current;

    if (!host) {
      return;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "hero-three-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 90);
    camera.position.set(0, 0.5, 11.4);

    const world = new THREE.Group();
    scene.add(world);

    const signalRig = new THREE.Group();
    signalRig.position.set(2.35, -0.2, -0.1);
    signalRig.rotation.set(-0.04, -0.24, 0.02);
    world.add(signalRig);

    const ambient = new THREE.AmbientLight(colors.white, 2.2);
    const key = new THREE.DirectionalLight(colors.white, 2.8);
    key.position.set(2.6, 4.2, 5.4);
    const greenLight = new THREE.PointLight(colors.green, 42, 15);
    greenLight.position.set(1.1, 0.9, 2.1);
    const indigoLight = new THREE.PointLight(colors.indigo, 18, 14);
    indigoLight.position.set(-2.4, 1.2, 2.8);
    scene.add(ambient, key, greenLight, indigoLight);

    const atlasBase = new THREE.Mesh(
      new THREE.CylinderGeometry(3.8, 4.28, 0.22, 8),
      new THREE.MeshStandardMaterial({
        color: colors.white,
        roughness: 0.32,
        metalness: 0.1,
        transparent: true,
        opacity: 0.64,
        emissive: colors.green,
        emissiveIntensity: 0.018,
      }),
    );
    atlasBase.position.set(0.18, -2.06, -0.26);
    atlasBase.rotation.y = Math.PI / 8;
    signalRig.add(atlasBase);
    addEdgeOutline(atlasBase, colors.green, 0.28);

    const floorGrid = new THREE.GridHelper(
      11.5,
      22,
      colors.green,
      colors.border,
    );
    floorGrid.position.set(0.2, -2.21, -0.4);
    floorGrid.rotation.z = -0.08;
    if (!Array.isArray(floorGrid.material)) {
      floorGrid.material.transparent = true;
      floorGrid.material.opacity = 0.24;
    }
    signalRig.add(floorGrid);

    const coreGroup = new THREE.Group() as SceneNode;
    coreGroup.position.set(0.66, -0.2, 0.65);
    coreGroup.userData.baseY = coreGroup.position.y;
    signalRig.add(coreGroup);

    const coreTerminal = addBox(
      coreGroup,
      [2.22, 1.18, 0.16],
      colors.ink,
      new THREE.Vector3(0, 0, 0),
      {
        opacity: 0.94,
        emissive: colors.green,
        emissiveIntensity: 0.08,
        metalness: 0.22,
        roughness: 0.28,
      },
    );
    addEdgeOutline(coreTerminal, colors.green, 0.76);

    addBox(
      coreGroup,
      [1.72, 0.07, 0.035],
      colors.green,
      new THREE.Vector3(0, 0.33, 0.12),
      { opacity: 0.86, emissiveIntensity: 0.25 },
    );

    for (let index = 0; index < 5; index += 1) {
      addBox(
        coreGroup,
        [0.72 + index * 0.14, 0.045, 0.035],
        index % 2 ? colors.indigo : colors.green,
        new THREE.Vector3(
          -0.38 + (index % 2) * 0.18,
          0.12 - index * 0.14,
          0.13,
        ),
        { opacity: 0.84, emissiveIntensity: 0.2 },
      );
    }

    const coreGem = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.72, 2),
      new THREE.MeshStandardMaterial({
        color: colors.green,
        roughness: 0.22,
        metalness: 0.24,
        emissive: colors.green,
        emissiveIntensity: 0.46,
        transparent: true,
        opacity: 0.82,
      }),
    );
    coreGem.position.set(0.03, 1.12, 0.1);
    coreGroup.add(coreGem);
    const coreWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreGem.geometry),
      new THREE.LineBasicMaterial({
        color: colors.white,
        transparent: true,
        opacity: 0.36,
      }),
    );
    coreGem.add(coreWire);

    const orbitOuter = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.018, 10, 120),
      new THREE.MeshBasicMaterial({
        color: colors.green,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
      }),
    );
    orbitOuter.rotation.set(Math.PI / 2.3, 0.14, Math.PI / 6);
    coreGroup.add(orbitOuter);

    const orbitInner = new THREE.Mesh(
      new THREE.TorusGeometry(1.72, 0.014, 10, 120),
      new THREE.MeshBasicMaterial({
        color: colors.indigo,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      }),
    );
    orbitInner.rotation.set(Math.PI / 2.6, -0.22, -Math.PI / 5);
    coreGroup.add(orbitInner);

    const panels = [
      addFloatingPanel({
        parent: signalRig,
        width: 2.7,
        height: 1.5,
        position: new THREE.Vector3(-1.42, 0.92, 0.72),
        rotation: new THREE.Euler(-0.04, 0.42, -0.04),
        variant: "terminal",
      }),
      addFloatingPanel({
        parent: signalRig,
        width: 2.26,
        height: 1.46,
        position: new THREE.Vector3(2.88, 0.34, -0.04),
        rotation: new THREE.Euler(0.04, -0.42, 0.04),
        variant: "dashboard",
      }),
      addFloatingPanel({
        parent: signalRig,
        width: 1.18,
        height: 2.32,
        position: new THREE.Vector3(-2.98, -0.76, -0.36),
        rotation: new THREE.Euler(0.03, 0.55, 0.02),
        variant: "mobile",
      }),
      addFloatingPanel({
        parent: signalRig,
        width: 2.0,
        height: 1.2,
        position: new THREE.Vector3(1.92, -1.08, 1.18),
        rotation: new THREE.Euler(-0.04, -0.25, -0.02),
        variant: "course",
      }),
    ];

    const nodes = [
      addSignalNode(
        signalRig,
        new THREE.Vector3(-2.4, -1.7, 1.18),
        colors.green,
      ),
      addSignalNode(
        signalRig,
        new THREE.Vector3(2.65, -1.62, 0.76),
        colors.indigo,
      ),
      addSignalNode(
        signalRig,
        new THREE.Vector3(-0.62, -1.76, -1.82),
        colors.green,
      ),
      addSignalNode(
        signalRig,
        new THREE.Vector3(1.08, -1.58, -2.08),
        colors.greenDeep,
      ),
    ];

    const streams = [
      addDataStream(
        signalRig,
        [
          new THREE.Vector3(-2.4, -1.48, 1.18),
          new THREE.Vector3(-1.1, -0.9, 0.64),
          new THREE.Vector3(0.2, -0.55, 0.78),
          new THREE.Vector3(1.2, -0.8, 0.6),
          new THREE.Vector3(2.65, -1.4, 0.76),
        ],
        colors.green,
        0.12,
      ),
      addDataStream(
        signalRig,
        [
          new THREE.Vector3(-0.62, -1.55, -1.82),
          new THREE.Vector3(-0.28, -0.8, -0.8),
          new THREE.Vector3(0.58, -0.3, 0.3),
          new THREE.Vector3(1.08, -1.36, -2.08),
        ],
        colors.indigo,
        0.44,
      ),
      addDataStream(
        signalRig,
        [
          new THREE.Vector3(-2.98, -0.45, -0.36),
          new THREE.Vector3(-1.6, 0.0, 0.14),
          new THREE.Vector3(0.45, 0.24, 0.72),
          new THREE.Vector3(2.88, 0.18, -0.04),
        ],
        colors.greenDeep,
        0.73,
      ),
    ];

    const mizoMarks = addMizoSignalMarks(signalRig);

    const particleCount = 130;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const angle = index * 2.39996323;
      const radius = 2.6 + ((index * 41) % 100) / 20;
      particlePositions[index * 3] = Math.cos(angle) * radius;
      particlePositions[index * 3 + 1] = ((index * 19) % 90) / 14 - 3.1;
      particlePositions[index * 3 + 2] = Math.sin(angle) * radius * 0.55 - 0.5;

      const isGreen = index % 3 !== 0;
      const color = new THREE.Color(isGreen ? colors.green : colors.indigo);
      particleColors[index * 3] = color.r;
      particleColors[index * 3 + 1] = color.g;
      particleColors[index * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3),
    );
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        size: 0.038,
        vertexColors: true,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      }),
    );
    signalRig.add(particles);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mediaQuery.matches;
    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let rigBaseX = 2.35;
    let rigBaseY = -0.2;
    let rigBaseZ = -0.1;
    const startTime = performance.now();

    function resize() {
      if (!host) {
        return;
      }

      const bounds = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(bounds.width));
      const height = Math.max(1, Math.floor(bounds.height));
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1180;

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, isMobile ? 1.15 : 1.35),
      );
      renderer.setSize(width, height, false);
      camera.fov = isMobile ? 43 : isTablet ? 40 : 38;
      camera.aspect = width / height;
      camera.position.set(
        isMobile ? 0.06 : 0.08,
        isMobile ? 0.75 : 0.54,
        isMobile ? 12.6 : isTablet ? 11.8 : 11.1,
      );
      rigBaseX = isMobile ? 0.05 : isTablet ? 1.24 : 2.58;
      rigBaseY = isMobile ? -1.2 : -0.22;
      rigBaseZ = isMobile ? -0.42 : -0.1;
      signalRig.position.set(rigBaseX, rigBaseY, rigBaseZ);
      signalRig.scale.setScalar(isMobile ? 0.64 : isTablet ? 0.84 : 1);
      world.position.set(isMobile ? 0 : 0.25, isMobile ? -1.05 : 0, 0);
      camera.updateProjectionMatrix();
      camera.lookAt(isMobile ? 0 : 1.28, isMobile ? -1.14 : -0.16, 0);
      renderer.render(scene, camera);
    }

    function renderFrame() {
      if (reduceMotion) {
        renderer.render(scene, camera);
        return;
      }

      const elapsed = (performance.now() - startTime) / 1000;
      smoothX += (targetX - smoothX) * 0.055;
      smoothY += (targetY - smoothY) * 0.055;

      world.rotation.y = smoothX * 0.09 + Math.sin(elapsed * 0.2) * 0.018;
      world.rotation.x = smoothY * 0.055;
      signalRig.position.set(
        rigBaseX + Math.sin(elapsed * 0.28) * 0.035,
        rigBaseY + Math.sin(elapsed * 0.62) * 0.055,
        rigBaseZ,
      );
      signalRig.rotation.y = -0.24 + smoothX * 0.18;
      signalRig.rotation.x = -0.04 + smoothY * 0.08;

      coreGroup.position.y =
        (coreGroup.userData.baseY ?? -0.2) + Math.sin(elapsed * 0.9) * 0.06;
      coreGem.rotation.x = elapsed * 0.34;
      coreGem.rotation.y = elapsed * 0.48;
      orbitOuter.rotation.z = elapsed * 0.28;
      orbitInner.rotation.z = -elapsed * 0.34;
      greenLight.intensity = 36 + Math.sin(elapsed * 1.2) * 7;
      indigoLight.intensity = 15 + Math.cos(elapsed * 1.05) * 4;

      panels.forEach((panel, index) => {
        panel.position.y =
          (panel.userData.baseY ?? panel.position.y) +
          Math.sin(elapsed * 0.72 + index) * 0.075;
        panel.rotation.z += Math.sin(elapsed + index) * 0.0007;
      });

      nodes.forEach((node, index) => {
        node.position.y =
          (node.userData.baseY ?? node.position.y) +
          Math.sin(elapsed * 1.12 + index * 0.74) * 0.06;
        node.rotation.y = elapsed * 0.44 + index;
        const scale = 1 + Math.sin(elapsed * 1.32 + index) * 0.08;
        node.scale.set(scale, scale, scale);
      });

      streams.forEach((stream) => {
        const progress = (elapsed * stream.speed + stream.offset) % 1;
        stream.pulse.position.copy(stream.curve.getPointAt(progress));
        const pulseScale =
          0.86 + Math.sin(elapsed * 2.4 + stream.offset) * 0.14;
        stream.pulse.scale.setScalar(pulseScale);
      });

      mizoMarks.forEach((mark, index) => {
        mark.position.y =
          (mark.userData.baseY ?? mark.position.y) +
          Math.sin(elapsed * 0.68 + index * 0.43) * 0.06;
        mark.rotation.z += (mark.userData.spin ?? 0.2) * 0.008;
      });

      particles.rotation.y = elapsed * 0.014;
      floorGrid.position.z = -0.4 + Math.sin(elapsed * 0.4) * 0.08;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderFrame);
    }

    function startAnimation() {
      window.cancelAnimationFrame(frameId);

      if (reduceMotion) {
        renderer.render(scene, camera);
        return;
      }

      frameId = window.requestAnimationFrame(renderFrame);
    }

    function handlePointerMove(event: PointerEvent) {
      if (reduceMotion || window.innerWidth < 768) {
        return;
      }

      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
    }

    function handleMotionPreference() {
      reduceMotion = mediaQuery.matches;
      startAnimation();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    mediaQuery.addEventListener("change", handleMotionPreference);
    resize();
    startAnimation();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      mediaQuery.removeEventListener("change", handleMotionPreference);
      resizeObserver.disconnect();
      renderer.dispose();
      disposeObject(world);
      scene.remove(world);
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="hero-three-scene" ref={containerRef} aria-hidden="true" />
  );
}
