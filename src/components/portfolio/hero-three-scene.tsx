"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function addPanel(
  parent: THREE.Group,
  width: number,
  height: number,
  color: number,
  position: THREE.Vector3,
  rotation: THREE.Euler,
) {
  const panel = new THREE.Group();
  panel.position.copy(position);
  panel.rotation.copy(rotation);

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 0.08),
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.44,
      metalness: 0.28,
      transparent: true,
      opacity: 0.74,
      emissive: color,
      emissiveIntensity: 0.08,
    }),
  );

  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(body.geometry),
    new THREE.LineBasicMaterial({
      color: 0xb3cfe5,
      transparent: true,
      opacity: 0.36,
    }),
  );

  panel.add(body, outline);

  for (let index = 0; index < 4; index += 1) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(width * (0.18 + index * 0.06), 0.06, 0.04),
      new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? 0x7dd3c7 : 0xe8b86d,
        transparent: true,
        opacity: 0.74,
      }),
    );
    bar.position.set(
      -width * 0.28 + index * width * 0.17,
      -height * 0.2 + index * height * 0.12,
      0.08,
    );
    panel.add(bar);
  }

  parent.add(panel);
  return panel;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
      child.geometry.dispose();

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose());
      } else {
        child.material.dispose();
      }
    }

    if (child instanceof THREE.Points) {
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
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const host = container;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
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
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(0, 0.4, 11.5);

    const world = new THREE.Group();
    scene.add(world);

    const ambient = new THREE.AmbientLight(0xb3cfe5, 1.28);
    const key = new THREE.DirectionalLight(0x7dd3c7, 2.8);
    key.position.set(3.2, 4.4, 5.2);
    const rim = new THREE.PointLight(0xe8b86d, 42, 18);
    rim.position.set(-3.8, -1.2, 3.8);
    scene.add(ambient, key, rim);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.24, 1),
      new THREE.MeshStandardMaterial({
        color: 0x7dd3c7,
        roughness: 0.25,
        metalness: 0.42,
        emissive: 0x1a635b,
        emissiveIntensity: 0.36,
        transparent: true,
        opacity: 0.9,
      }),
    );
    core.position.set(2.2, 0.4, 0.4);
    world.add(core);

    const coreWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(core.geometry),
      new THREE.LineBasicMaterial({
        color: 0xf6fafd,
        transparent: true,
        opacity: 0.2,
      }),
    );
    core.add(coreWire);

    const orbitOne = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.012, 8, 96),
      new THREE.MeshBasicMaterial({
        color: 0x7dd3c7,
        transparent: true,
        opacity: 0.42,
      }),
    );
    orbitOne.rotation.set(Math.PI / 2.8, 0, Math.PI / 7);
    core.add(orbitOne);

    const orbitTwo = new THREE.Mesh(
      new THREE.TorusGeometry(2.75, 0.01, 8, 120),
      new THREE.MeshBasicMaterial({
        color: 0xe8b86d,
        transparent: true,
        opacity: 0.32,
      }),
    );
    orbitTwo.rotation.set(Math.PI / 2.15, Math.PI / 8, -Math.PI / 5);
    core.add(orbitTwo);

    const panels = [
      addPanel(
        world,
        2.7,
        1.5,
        0x102a44,
        new THREE.Vector3(-4.3, 1.25, -0.4),
        new THREE.Euler(-0.08, 0.28, -0.04),
      ),
      addPanel(
        world,
        2.25,
        2.95,
        0x0f3348,
        new THREE.Vector3(-1.65, -0.35, 0.8),
        new THREE.Euler(0.04, -0.18, 0.06),
      ),
      addPanel(
        world,
        2.55,
        1.28,
        0x12314f,
        new THREE.Vector3(4.2, -1.45, -0.2),
        new THREE.Euler(0.08, -0.34, 0.05),
      ),
      addPanel(
        world,
        1.35,
        2.72,
        0x143653,
        new THREE.Vector3(5.2, 1.18, -1.1),
        new THREE.Euler(-0.02, -0.5, 0.04),
      ),
    ];
    const panelBaseY = panels.map((panel) => panel.position.y);

    const grid = new THREE.GridHelper(16, 28, 0x7dd3c7, 0x1a3d63);
    grid.position.set(0.4, -3.1, -2.3);
    grid.rotation.z = -0.08;
    const gridMaterial = grid.material;
    if (!Array.isArray(gridMaterial)) {
      gridMaterial.transparent = true;
      gridMaterial.opacity = 0.24;
    }
    world.add(grid);

    const particleCount = 96;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const angle = index * 2.39996323;
      const radius = 3.1 + ((index * 37) % 100) / 22;
      particlePositions[index * 3] = Math.cos(angle) * radius;
      particlePositions[index * 3 + 1] = ((index * 19) % 80) / 12 - 3.3;
      particlePositions[index * 3 + 2] = Math.sin(angle) * radius - 1.2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xb3cfe5,
        size: 0.035,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
      }),
    );
    world.add(particles);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = mediaQuery.matches;
    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;
    const startTime = performance.now();

    function resize() {
      const bounds = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(bounds.width));
      const height = Math.max(1, Math.floor(bounds.height));

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
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

      world.rotation.y = smoothX * 0.18 + Math.sin(elapsed * 0.18) * 0.04;
      world.rotation.x = smoothY * 0.1 + Math.sin(elapsed * 0.22) * 0.018;
      core.rotation.x = elapsed * 0.24;
      core.rotation.y = elapsed * 0.34;
      orbitOne.rotation.z = elapsed * 0.38;
      orbitTwo.rotation.z = -elapsed * 0.29;
      particles.rotation.y = elapsed * 0.018;
      panels.forEach((panel, index) => {
        panel.position.y =
          panelBaseY[index] + Math.sin(elapsed * 0.8 + index) * 0.08;
      });

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
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
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
    <div
      className="hero-three-scene"
      ref={containerRef}
      aria-hidden="true"
    />
  );
}
