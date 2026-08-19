"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function createCGeometry() {
  const outer = 1.16;
  const inner = 0.7;
  const a0 = THREE.MathUtils.degToRad(48);
  const a1 = THREE.MathUtils.degToRad(312);
  const segs = 52;
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
    depth: 0.42,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.045,
    bevelSegments: 3,
    curveSegments: 8,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.className = "hero-three-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0.12, 5.2);

    const world = new THREE.Group();
    scene.add(world);

    scene.add(new THREE.AmbientLight(0xf0e6d4, 0.55));
    const key = new THREE.DirectionalLight(0xfff4e4, 2.4);
    key.position.set(3.4, 5.2, 4.8);
    scene.add(key);
    const fill = new THREE.PointLight(0x8ea4c4, 12, 16);
    fill.position.set(-3.2, 1.1, 2.4);
    scene.add(fill);
    const rim = new THREE.PointLight(0xffe8c8, 8, 12);
    rim.position.set(1.4, -0.6, 3.2);
    scene.add(rim);

    const mark = new THREE.Group();
    world.add(mark);

    const cMesh = new THREE.Mesh(
      createCGeometry(),
      new THREE.MeshPhysicalMaterial({
        color: 0xf3ece0,
        metalness: 0.92,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        reflectivity: 1,
        envMapIntensity: 1.2,
      }),
    );
    cMesh.position.set(-0.55, 0.12, 0);
    mark.add(cMesh);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.62, 0.01, 8, 80),
      new THREE.MeshBasicMaterial({
        color: 0xd9d0c2,
        transparent: true,
        opacity: 0.4,
      }),
    );
    halo.rotation.set(Math.PI / 2.15, 0.15, 0.4);
    mark.add(halo);

    const loader = new THREE.TextureLoader();
    loader.load("/brand/cjohnmizo-logo.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(1.55, 1.55, 0.08),
        new THREE.MeshPhysicalMaterial({
          map: texture,
          color: 0xffffff,
          metalness: 0.35,
          roughness: 0.22,
          clearcoat: 0.85,
          clearcoatRoughness: 0.18,
        }),
      );
      slab.position.set(1.15, 0.08, 0.15);
      slab.rotation.y = -0.28;
      mark.add(slab);
    });

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(2.1, 40),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.38,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.45;
    world.add(shadow);

    const dustCount = 90;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      dustPos[i * 3] = (Math.random() - 0.5) * 8;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0xe8e2d6,
        size: 0.018,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      }),
    );
    world.add(dust);

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.2 : 1.6));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = mobile ? 6.1 : 5.2;
      camera.updateProjectionMatrix();
      mark.scale.setScalar(mobile ? 0.82 : 1);
      renderer.render(scene, camera);
    }

    function renderFrame() {
      if (reduceMotion) {
        renderer.render(scene, camera);
        return;
      }
      const t = (performance.now() - start) / 1000;
      smoothX += (targetX - smoothX) * 0.06;
      smoothY += (targetY - smoothY) * 0.06;
      mark.rotation.y = 0.28 + smoothX * 0.7 + Math.sin(t * 0.35) * 0.04;
      mark.rotation.x = -0.06 + smoothY * 0.35;
      mark.position.y = Math.sin(t * 0.9) * 0.08;
      halo.rotation.z = t * 0.18;
      cMesh.rotation.y = Math.sin(t * 0.4) * 0.08;
      dust.rotation.y = t * 0.03;
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

  return <div className="hero-three-scene" ref={containerRef} aria-hidden="true" />;
}
