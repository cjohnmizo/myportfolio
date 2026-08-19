"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function createCGeometry() {
  const outer = 1.05;
  const inner = 0.62;
  const a0 = THREE.MathUtils.degToRad(42);
  const a1 = THREE.MathUtils.degToRad(318);
  const segs = 64;
  const shape = new THREE.Shape();
  shape.moveTo(Math.cos(a0) * outer, Math.sin(a0) * outer);
  for (let i = 1; i <= segs; i += 1) {
    const t = a0 + ((a1 - a0) * i) / segs;
    shape.lineTo(Math.cos(t) * outer, Math.sin(t) * outer);
  }
  for (let i = segs; i >= 0; i -= 1) {
    const t = a0 + ((a1 - a0) * i) / segs;
    shape.lineTo(Math.cos(t) * inner, Math.sin(t) * inner);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.55,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.055,
    bevelSegments: 4,
    curveSegments: 12,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

function makePanelTexture(
  title: string,
  accent: string,
  bars: number[],
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#0c0e12";
  ctx.fillRect(0, 0, 512, 320);

  ctx.strokeStyle = "rgba(232,224,210,0.18)";
  ctx.lineWidth = 3;
  ctx.strokeRect(8, 8, 496, 304);

  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.fillRect(8, 8, 496, 36);
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(28, 26, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.beginPath();
  ctx.arc(46, 26, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  ctx.arc(64, 26, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(232,224,210,0.75)";
  ctx.font = "600 18px system-ui, sans-serif";
  ctx.fillText(title, 88, 32);

  bars.forEach((w, i) => {
    const y = 64 + i * 42;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(28, y, 456, 28);
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.55 + (i % 3) * 0.12;
    ctx.fillRect(28, y, 456 * w, 28);
    ctx.globalAlpha = 1;
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
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
      const mat = child.material;
      if (Array.isArray(mat)) {
        mat.forEach((m) => {
          if ("map" in m && m.map) (m.map as THREE.Texture).dispose();
          m.dispose();
        });
      } else if (mat) {
        if ("map" in mat && mat.map) (mat.map as THREE.Texture).dispose();
        mat.dispose();
      }
    }
  });
}

export function HeroThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.className = "hero-three-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0.15, 0.85, 6.4);

    const world = new THREE.Group();
    scene.add(world);

    scene.add(new THREE.AmbientLight(0xf2e8d8, 0.35));
    const key = new THREE.DirectionalLight(0xfff1df, 2.6);
    key.position.set(4.2, 6.5, 5.5);
    scene.add(key);
    const fill = new THREE.PointLight(0x7aa8c8, 14, 18);
    fill.position.set(-4.0, 1.4, 3.2);
    scene.add(fill);
    const rim = new THREE.PointLight(0xc4a574, 10, 14);
    rim.position.set(2.2, -1.0, 4.0);
    scene.add(rim);
    const accent = new THREE.PointLight(0x5eead4, 6, 10);
    accent.position.set(0, 2.5, -1.5);
    scene.add(accent);

    const grid = new THREE.GridHelper(14, 28, 0x3a3a42, 0x1c1c22);
    grid.position.y = -1.65;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.45;
    world.add(grid);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(3.2, 48),
      new THREE.MeshBasicMaterial({
        color: 0x12141a,
        transparent: true,
        opacity: 0.72,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.64;
    world.add(ground);

    const mark = new THREE.Group();
    world.add(mark);

    const cMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5efe4,
      metalness: 0.88,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      reflectivity: 1,
      envMapIntensity: 1.4,
    });
    const cMesh = new THREE.Mesh(createCGeometry(), cMat);
    cMesh.position.set(0, 0.25, 0);
    mark.add(cMesh);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.28, 1),
      new THREE.MeshBasicMaterial({
        color: 0xc4a574,
        transparent: true,
        opacity: 0.55,
        wireframe: true,
      }),
    );
    core.position.set(0, 0.25, 0);
    mark.add(core);

    const loader = new THREE.TextureLoader();
    loader.load("/brand/cjohnmizo-logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(1.35, 1.35, 0.07),
        new THREE.MeshPhysicalMaterial({
          map: texture,
          color: 0xffffff,
          metalness: 0.4,
          roughness: 0.18,
          clearcoat: 0.9,
          clearcoatRoughness: 0.12,
        }),
      );
      plate.position.set(1.55, 0.15, 0.35);
      plate.rotation.y = -0.42;
      plate.rotation.x = 0.08;
      mark.add(plate);

      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(1.42, 1.42, 0.03),
        new THREE.MeshBasicMaterial({
          color: 0xc4a574,
          transparent: true,
          opacity: 0.35,
        }),
      );
      frame.position.copy(plate.position);
      frame.position.z -= 0.05;
      frame.rotation.copy(plate.rotation);
      mark.add(frame);
    });

    const ringMats = [
      new THREE.MeshBasicMaterial({
        color: 0xd9d0c2,
        transparent: true,
        opacity: 0.35,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x5eead4,
        transparent: true,
        opacity: 0.22,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xc4a574,
        transparent: true,
        opacity: 0.28,
      }),
    ];
    const rings: THREE.Mesh[] = [];
    [
      { r: 1.85, t: 0.012, rx: 1.15, ry: 0.2, rz: 0.35 },
      { r: 2.25, t: 0.01, rx: 0.9, ry: -0.4, rz: -0.2 },
      { r: 2.65, t: 0.008, rx: 1.4, ry: 0.55, rz: 0.1 },
    ].forEach((cfg, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.r, cfg.t, 8, 100),
        ringMats[i],
      );
      ring.rotation.set(cfg.rx, cfg.ry, cfg.rz);
      mark.add(ring);
      rings.push(ring);
    });

    const panels: THREE.Mesh[] = [];
    const panelSpecs = [
      {
        title: "LMS \u00b7 Live",
        accent: "#5eead4",
        bars: [0.82, 0.55, 0.7, 0.4],
        pos: [-2.1, 0.95, -0.4] as [number, number, number],
        rot: [0.12, 0.55, -0.05] as [number, number, number],
        scale: 0.85,
      },
      {
        title: "Dashboard",
        accent: "#c4a574",
        bars: [0.65, 0.9, 0.48, 0.72],
        pos: [2.35, 1.15, -0.6] as [number, number, number],
        rot: [0.08, -0.5, 0.06] as [number, number, number],
        scale: 0.78,
      },
      {
        title: "Mobile App",
        accent: "#a78bfa",
        bars: [0.5, 0.75, 0.6],
        pos: [-1.6, -0.35, 0.9] as [number, number, number],
        rot: [-0.1, 0.35, 0.08] as [number, number, number],
        scale: 0.7,
      },
      {
        title: "CMS \u00b7 Ops",
        accent: "#7dd3fc",
        bars: [0.88, 0.42, 0.66],
        pos: [1.9, -0.55, 0.7] as [number, number, number],
        rot: [0.15, -0.28, -0.04] as [number, number, number],
        scale: 0.72,
      },
    ];

    panelSpecs.forEach((spec) => {
      const tex = makePanelTexture(spec.title, spec.accent, spec.bars);
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1.0),
        new THREE.MeshPhysicalMaterial({
          map: tex,
          transparent: true,
          opacity: 0.92,
          roughness: 0.25,
          metalness: 0.15,
          side: THREE.DoubleSide,
        }),
      );
      mesh.position.set(...spec.pos);
      mesh.rotation.set(...spec.rot);
      mesh.scale.setScalar(spec.scale);
      mark.add(mesh);
      panels.push(mesh);
    });

    const pinGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x5eead4 });
    [
      [-0.9, -1.45, 0.6],
      [0.7, -1.45, 0.35],
      [0.1, -1.45, -0.5],
    ].forEach(([x, y, z]) => {
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(x, y, z);
      world.add(pin);
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.22, 6),
        new THREE.MeshBasicMaterial({
          color: 0x5eead4,
          transparent: true,
          opacity: 0.5,
        }),
      );
      stem.position.set(x, y + 0.12, z);
      world.add(stem);
    });

    const dustCount = 140;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      dustPos[i * 3] = (Math.random() - 0.5) * 12;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0xe8e2d6,
        size: 0.016,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      }),
    );
    world.add(dust);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(2.4, 48),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.42,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.62;
    world.add(shadow);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mediaQuery.matches;
    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;
    const start = performance.now();

    function resize() {
      if (!host) return;
      const bounds = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(bounds.width));
      const height = Math.max(1, Math.floor(bounds.height));
      const mobile = width < 768;
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75),
      );
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = mobile ? 7.4 : 6.4;
      camera.position.y = mobile ? 0.55 : 0.85;
      camera.updateProjectionMatrix();
      mark.scale.setScalar(mobile ? 0.72 : 1);
      renderer.render(scene, camera);
    }

    function renderFrame() {
      if (reduceMotion) {
        renderer.render(scene, camera);
        return;
      }
      const t = (performance.now() - start) / 1000;
      smoothX += (targetX - smoothX) * 0.055;
      smoothY += (targetY - smoothY) * 0.055;

      mark.rotation.y = 0.18 + smoothX * 0.65 + Math.sin(t * 0.28) * 0.05;
      mark.rotation.x = -0.08 + smoothY * 0.32;
      mark.position.y = Math.sin(t * 0.85) * 0.07;

      cMesh.rotation.y = Math.sin(t * 0.35) * 0.1;
      core.rotation.x = t * 0.4;
      core.rotation.y = t * 0.55;

      rings.forEach((ring, i) => {
        ring.rotation.z += 0.0025 * (i % 2 === 0 ? 1 : -1);
        ring.rotation.x += 0.0008 * (i + 1);
      });

      panels.forEach((panel, i) => {
        panel.position.y += Math.sin(t * 0.9 + i * 1.3) * 0.0009;
        panel.rotation.z = Math.sin(t * 0.5 + i) * 0.03;
      });

      dust.rotation.y = t * 0.025;
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

    function onPointer(event: PointerEvent) {
      if (reduceMotion || window.innerWidth < 768) return;
      const rect = host.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    host.addEventListener("pointermove", onPointer, { passive: true });
    mediaQuery.addEventListener("change", () => {
      reduceMotion = mediaQuery.matches;
      startAnimation();
    });
    resize();
    startAnimation();

    return () => {
      window.cancelAnimationFrame(frameId);
      host.removeEventListener("pointermove", onPointer);
      resizeObserver.disconnect();
      renderer.dispose();
      disposeObject(world);
      scene.remove(world);
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="hero-three-scene" ref={containerRef} aria-hidden="true" />
  );
}
