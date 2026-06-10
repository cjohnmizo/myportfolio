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

function addBlock(
  parent: THREE.Group,
  size: [number, number, number],
  color: number,
  position: THREE.Vector3,
) {
  const block = new THREE.Mesh(
    new THREE.BoxGeometry(...size),
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.38,
      metalness: 0.26,
      emissive: color,
      emissiveIntensity: 0.04,
    }),
  );
  block.position.copy(position);

  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(block.geometry),
    new THREE.LineBasicMaterial({
      color: 0xb3cfe5,
      transparent: true,
      opacity: 0.22,
    }),
  );

  block.add(outline);
  parent.add(block);

  return block;
}

function addBeacon(
  parent: THREE.Group,
  position: THREE.Vector3,
  color: number,
) {
  const beacon = new THREE.Group();
  beacon.position.copy(position);

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.32, 0.16, 8),
    new THREE.MeshStandardMaterial({
      color: 0x10243a,
      roughness: 0.34,
      metalness: 0.42,
      emissive: color,
      emissiveIntensity: 0.12,
    }),
  );

  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 16),
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.18,
      metalness: 0.28,
      emissive: color,
      emissiveIntensity: 0.7,
    }),
  );
  orb.position.y = 0.38;

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.012, 8, 48),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.45,
    }),
  );
  ring.position.y = 0.42;
  ring.rotation.x = Math.PI / 2;

  beacon.add(base, orb, ring);
  parent.add(beacon);

  return beacon;
}

function addPlayerPawn(parent: THREE.Group) {
  const pawn = new THREE.Group();
  pawn.position.set(-0.95, -1.78, 0.72);

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.32, 0.56, 10),
    new THREE.MeshStandardMaterial({
      color: 0x173d5a,
      roughness: 0.34,
      metalness: 0.32,
      emissive: 0x0f3348,
      emissiveIntensity: 0.28,
    }),
  );
  body.position.y = 0.34;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 20, 16),
    new THREE.MeshStandardMaterial({
      color: 0xb3cfe5,
      roughness: 0.2,
      metalness: 0.12,
      emissive: 0x7dd3c7,
      emissiveIntensity: 0.16,
    }),
  );
  head.position.y = 0.76;

  const laptop = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.36, 0.06),
    new THREE.MeshStandardMaterial({
      color: 0x0a1931,
      roughness: 0.32,
      metalness: 0.36,
      emissive: 0x7dd3c7,
      emissiveIntensity: 0.26,
    }),
  );
  laptop.position.set(0.08, 0.36, 0.35);
  laptop.rotation.x = -0.35;

  pawn.add(body, head, laptop);
  parent.add(pawn);

  return pawn;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (
      child instanceof THREE.Mesh ||
      child instanceof THREE.Line ||
      child instanceof THREE.LineSegments
    ) {
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
    const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 90);
    camera.position.set(0, 0.8, 12.8);

    const world = new THREE.Group();
    scene.add(world);

    const gameRig = new THREE.Group();
    gameRig.position.set(2.2, -0.2, -0.2);
    gameRig.rotation.set(-0.03, -0.32, 0.02);
    world.add(gameRig);

    const ambient = new THREE.AmbientLight(0xb3cfe5, 1.42);
    const key = new THREE.DirectionalLight(0x7dd3c7, 2.8);
    key.position.set(3.2, 4.4, 5.2);
    const rim = new THREE.PointLight(0xe8b86d, 58, 20);
    rim.position.set(-2.8, -1.2, 4.8);
    const coreLight = new THREE.PointLight(0x7dd3c7, 34, 12);
    coreLight.position.set(2.6, 0.4, 2.4);
    scene.add(ambient, key, rim, coreLight);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(4.1, 4.8, 0.52, 6),
      new THREE.MeshStandardMaterial({
        color: 0x10243a,
        roughness: 0.34,
        metalness: 0.36,
        emissive: 0x07111f,
        emissiveIntensity: 0.28,
      }),
    );
    platform.position.set(0, -2.25, 0);
    platform.rotation.y = Math.PI / 6;
    gameRig.add(platform);

    const platformEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(platform.geometry),
      new THREE.LineBasicMaterial({
        color: 0x7dd3c7,
        transparent: true,
        opacity: 0.32,
      }),
    );
    platform.add(platformEdges);

    const platformGlow = new THREE.Mesh(
      new THREE.CylinderGeometry(4.28, 5.02, 0.06, 6),
      new THREE.MeshBasicMaterial({
        color: 0x7dd3c7,
        transparent: true,
        opacity: 0.13,
        depthWrite: false,
      }),
    );
    platformGlow.position.set(0, -1.94, 0);
    platformGlow.rotation.y = Math.PI / 6;
    gameRig.add(platformGlow);

    const gameLanes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>[] =
      [];
    const laneMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3c7,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });

    for (let index = 0; index < 6; index += 1) {
      const angle = (Math.PI * 2 * index) / 6;
      const lane = new THREE.Mesh(
        new THREE.BoxGeometry(2.9, 0.035, 0.055),
        laneMaterial,
      );
      lane.position.set(Math.cos(angle) * 0.76, -1.92, Math.sin(angle) * 0.54);
      lane.rotation.y = -angle;
      gameRig.add(lane);
      gameLanes.push(lane);
    }

    const blocks = [
      addBlock(
        gameRig,
        [0.75, 1.25, 0.75],
        0x173d5a,
        new THREE.Vector3(-2.7, -1.35, 0.9),
      ),
      addBlock(
        gameRig,
        [0.9, 0.75, 0.9],
        0x0f3348,
        new THREE.Vector3(-1.8, -1.6, -1.1),
      ),
      addBlock(
        gameRig,
        [0.62, 1.7, 0.62],
        0x1a4f58,
        new THREE.Vector3(2.95, -1.1, 0.4),
      ),
      addBlock(
        gameRig,
        [1.2, 0.5, 1.2],
        0x263f54,
        new THREE.Vector3(1.7, -1.72, -1.4),
      ),
      addBlock(
        gameRig,
        [0.54, 2.25, 0.54],
        0x1a3d63,
        new THREE.Vector3(0.25, -0.82, -2.08),
      ),
      addBlock(
        gameRig,
        [1.05, 0.62, 0.7],
        0x234861,
        new THREE.Vector3(-3.1, -1.62, -1.85),
      ),
    ];

    const beacons = [
      addBeacon(gameRig, new THREE.Vector3(-2.1, -1.86, 1.55), 0x7dd3c7),
      addBeacon(gameRig, new THREE.Vector3(2.35, -1.86, 1.28), 0xe8b86d),
      addBeacon(gameRig, new THREE.Vector3(2.0, -1.86, -1.72), 0x7dd3c7),
    ];

    const playerPawn = addPlayerPawn(gameRig);

    const routeGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.1, -1.73, 1.55),
      new THREE.Vector3(-0.95, -1.73, 0.72),
      new THREE.Vector3(1.05, -1.73, 0.55),
      new THREE.Vector3(2.35, -1.73, 1.28),
    ]);
    const routeLine = new THREE.Line(
      routeGeometry,
      new THREE.LineBasicMaterial({
        color: 0xb3cfe5,
        transparent: true,
        opacity: 0.42,
      }),
    );
    gameRig.add(routeLine);

    const portal = new THREE.Group();
    portal.position.set(1.06, 0.18, 0.36);
    portal.rotation.y = -0.16;
    gameRig.add(portal);

    const portalVeil = new THREE.Mesh(
      new THREE.CircleGeometry(1.78, 64),
      new THREE.MeshBasicMaterial({
        color: 0x7dd3c7,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      }),
    );

    const portalOuter = new THREE.Mesh(
      new THREE.TorusGeometry(1.84, 0.025, 12, 128),
      new THREE.MeshBasicMaterial({
        color: 0x7dd3c7,
        transparent: true,
        opacity: 0.64,
      }),
    );
    const portalInner = new THREE.Mesh(
      new THREE.TorusGeometry(1.36, 0.018, 12, 108),
      new THREE.MeshBasicMaterial({
        color: 0xe8b86d,
        transparent: true,
        opacity: 0.5,
      }),
    );
    portal.add(portalVeil, portalOuter, portalInner);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.38, 2),
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
    core.position.set(1.05, 0.28, 0.58);
    gameRig.add(core);

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
        gameRig,
        3.15,
        1.78,
        0x102a44,
        new THREE.Vector3(-2.2, 0.45, 0.8),
        new THREE.Euler(-0.05, 0.34, -0.04),
      ),
      addPanel(
        gameRig,
        1.55,
        3.05,
        0x0f3348,
        new THREE.Vector3(-3.55, -0.48, -0.7),
        new THREE.Euler(0.02, 0.42, 0.05),
      ),
      addPanel(
        gameRig,
        2.6,
        1.32,
        0x12314f,
        new THREE.Vector3(3.15, -0.6, 0.15),
        new THREE.Euler(0.08, -0.46, 0.05),
      ),
      addPanel(
        gameRig,
        1.38,
        2.8,
        0x143653,
        new THREE.Vector3(3.9, 0.82, -1.08),
        new THREE.Euler(-0.02, -0.56, 0.04),
      ),
    ];
    const panelBaseY = panels.map((panel) => panel.position.y);

    const loadedTextures: THREE.Texture[] = [];
    const avatarFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.72, 2.18, 0.1),
      new THREE.MeshStandardMaterial({
        color: 0x07111f,
        roughness: 0.28,
        metalness: 0.42,
        emissive: 0x173d5a,
        emissiveIntensity: 0.2,
      }),
    );
    avatarFrame.position.set(-0.78, -0.24, 1.24);
    avatarFrame.rotation.set(0.02, 0.12, 0.01);
    gameRig.add(avatarFrame);

    const avatarGlow = new THREE.LineSegments(
      new THREE.EdgesGeometry(avatarFrame.geometry),
      new THREE.LineBasicMaterial({
        color: 0x7dd3c7,
        transparent: true,
        opacity: 0.5,
      }),
    );
    avatarFrame.add(avatarGlow);

    const avatarPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.48, 1.92),
      new THREE.MeshStandardMaterial({
        color: 0xb3cfe5,
        roughness: 0.46,
        metalness: 0.04,
        transparent: true,
        opacity: 0.92,
      }),
    );
    avatarPlane.position.set(0, 0, 0.065);
    avatarFrame.add(avatarPlane);

    let isActive = true;
    new THREE.TextureLoader().load("/profile.jpg", (texture) => {
      if (!isActive) {
        texture.dispose();
        return;
      }

      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        renderer.capabilities.getMaxAnisotropy(),
        4,
      );
      loadedTextures.push(texture);

      if (avatarPlane.material instanceof THREE.MeshStandardMaterial) {
        avatarPlane.material.map = texture;
        avatarPlane.material.needsUpdate = true;
      }
    });

    const grid = new THREE.GridHelper(16, 28, 0x7dd3c7, 0x1a3d63);
    grid.position.set(1.9, -3.2, -2.3);
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
    let rigBaseX = 2.2;
    let rigBaseY = -0.2;
    let rigBaseZ = -0.2;
    const startTime = performance.now();

    function resize() {
      const bounds = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(bounds.width));
      const height = Math.max(1, Math.floor(bounds.height));
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1180;

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, isMobile ? 1.15 : 1.35),
      );
      renderer.setSize(width, height, false);
      camera.fov = isMobile ? 45 : isTablet ? 41 : 39;
      camera.aspect = width / height;
      camera.position.set(
        isMobile ? 0.08 : 0.1,
        isMobile ? 0.9 : 0.78,
        isMobile ? 14.8 : isTablet ? 13.5 : 12.6,
      );
      rigBaseX = isMobile ? 0.12 : isTablet ? 1.25 : 2.75;
      rigBaseY = isMobile ? -0.5 : -0.22;
      rigBaseZ = isMobile ? -0.65 : -0.22;
      gameRig.position.set(rigBaseX, rigBaseY, rigBaseZ);
      gameRig.scale.setScalar(isMobile ? 0.72 : isTablet ? 0.88 : 1);
      world.position.set(isMobile ? 0 : 0.45, isMobile ? -0.75 : 0, 0);
      camera.updateProjectionMatrix();
      camera.lookAt(isMobile ? 0 : 1.55, isMobile ? -0.52 : -0.22, 0);
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

      world.rotation.y = smoothX * 0.12 + Math.sin(elapsed * 0.18) * 0.025;
      world.rotation.x = smoothY * 0.08 + Math.sin(elapsed * 0.22) * 0.012;
      gameRig.position.set(
        rigBaseX + Math.sin(elapsed * 0.3) * 0.025,
        rigBaseY + Math.sin(elapsed * 0.72) * 0.055,
        rigBaseZ,
      );
      gameRig.rotation.y =
        -0.32 + smoothX * 0.2 + Math.sin(elapsed * 0.22) * 0.05;
      gameRig.rotation.x = -0.03 + smoothY * 0.08;
      core.rotation.x = elapsed * 0.34;
      core.rotation.y = elapsed * 0.52;
      orbitOne.rotation.z = elapsed * 0.38;
      orbitTwo.rotation.z = -elapsed * 0.29;
      portalOuter.rotation.z = elapsed * 0.36;
      portalInner.rotation.z = -elapsed * 0.48;
      portalVeil.scale.setScalar(1 + Math.sin(elapsed * 1.1) * 0.035);
      playerPawn.position.y = -1.78 + Math.sin(elapsed * 1.4) * 0.055;
      particles.rotation.y = elapsed * 0.018;
      gameLanes.forEach((lane, index) => {
        lane.material.opacity = 0.24 + Math.sin(elapsed * 1.4 + index) * 0.08;
      });
      beacons.forEach((beacon, index) => {
        const scale = 1 + Math.sin(elapsed * 1.18 + index * 0.7) * 0.08;
        beacon.scale.set(scale, 1, scale);
        beacon.rotation.y = elapsed * 0.45 + index;
      });
      panels.forEach((panel, index) => {
        panel.position.y =
          panelBaseY[index] + Math.sin(elapsed * 0.8 + index) * 0.08;
      });
      blocks.forEach((block, index) => {
        block.rotation.y = Math.sin(elapsed * 0.42 + index) * 0.035;
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
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    mediaQuery.addEventListener("change", handleMotionPreference);
    resize();
    startAnimation();

    return () => {
      isActive = false;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      mediaQuery.removeEventListener("change", handleMotionPreference);
      resizeObserver.disconnect();
      renderer.dispose();
      loadedTextures.forEach((texture) => texture.dispose());
      disposeObject(world);
      scene.remove(world);
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="hero-three-scene" ref={containerRef} aria-hidden="true" />
  );
}
