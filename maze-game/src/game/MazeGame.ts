import * as THREE from 'three';
import { LevelConfig, ExitConfig, CELL_SIZE, WALL_HEIGHT } from './levels';

const CS = CELL_SIZE;
const WH = WALL_HEIGHT;
const ROOM_WIDE_HALF = 2;
const ROOM_DEPTH_CELLS = 3;

interface ExitRoomBounds {
  minX: number; maxX: number;
  minZ: number; maxZ: number;
}

function getExitRoomBounds(exit: ExitConfig): ExitRoomBounds {
  const { direction, centerRow, centerCol } = exit;
  switch (direction) {
    case 'south':
      return {
        minX: (centerCol - ROOM_WIDE_HALF) * CS,
        maxX: (centerCol + ROOM_WIDE_HALF + 1) * CS,
        minZ: centerRow * CS + CS,
        maxZ: centerRow * CS + CS + ROOM_DEPTH_CELLS * CS,
      };
    case 'north':
      return {
        minX: (centerCol - ROOM_WIDE_HALF) * CS,
        maxX: (centerCol + ROOM_WIDE_HALF + 1) * CS,
        minZ: centerRow * CS - ROOM_DEPTH_CELLS * CS,
        maxZ: centerRow * CS,
      };
    case 'east':
      return {
        minX: centerCol * CS + CS,
        maxX: centerCol * CS + CS + ROOM_DEPTH_CELLS * CS,
        minZ: (centerRow - ROOM_WIDE_HALF) * CS,
        maxZ: (centerRow + ROOM_WIDE_HALF + 1) * CS,
      };
    case 'west':
      return {
        minX: centerCol * CS - ROOM_DEPTH_CELLS * CS,
        maxX: centerCol * CS,
        minZ: (centerRow - ROOM_WIDE_HALF) * CS,
        maxZ: (centerRow + ROOM_WIDE_HALF + 1) * CS,
      };
  }
}

export class MazeGame {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLElement;
  private animationId: number | null = null;

  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;

  private yaw = 0;
  private pitch = 0;

  private lastTime = 0;
  private time = 0;

  private mazeObjects: THREE.Object3D[] = [];
  private wallBoxes: THREE.Box3[] = [];
  private wallMeshes: THREE.Mesh[] = [];

  private currentLevel: LevelConfig | null = null;
  private exitBounds: ExitRoomBounds | null = null;
  private exitRoomFloor: THREE.Mesh | null = null;
  private exitLight: THREE.PointLight | null = null;
  private fireWalls: THREE.Mesh[] = [];

  private sprayCount = 0;
  private maxSprays = 0;
  private tagNumber = 0;
  private speedMultiplier = 1;

  public onLevelComplete: (() => void) | null = null;
  public onDistanceUpdate: ((dist: number) => void) | null = null;
  public onSprayUpdate: ((remaining: number, max: number) => void) | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 300);
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = false;
    container.appendChild(this.renderer.domElement);
    this.setupEventListeners();
    this.animate();
  }

  private setupEventListeners() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.renderer.domElement.addEventListener('click', this.requestPointerLock);
    document.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'KeyW': case 'ArrowUp': this.moveForward = true; break;
      case 'KeyS': case 'ArrowDown': this.moveBackward = true; break;
      case 'KeyA': case 'ArrowLeft': this.moveLeft = true; break;
      case 'KeyD': case 'ArrowRight': this.moveRight = true; break;
      case 'KeyT': this.sprayTag(); break;
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'KeyW': case 'ArrowUp': this.moveForward = false; break;
      case 'KeyS': case 'ArrowDown': this.moveBackward = false; break;
      case 'KeyA': case 'ArrowLeft': this.moveLeft = false; break;
      case 'KeyD': case 'ArrowRight': this.moveRight = false; break;
    }
  };

  private requestPointerLock = () => { this.renderer.domElement.requestPointerLock(); };

  private onMouseMove = (e: MouseEvent) => {
    if (document.pointerLockElement !== this.renderer.domElement) return;
    this.yaw -= e.movementX * 0.002;
    this.pitch -= e.movementY * 0.002;
    this.pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, this.pitch));
  };

  private onResize = () => {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  };

  setSprayCount(max: number) {
    this.maxSprays = max;
    this.sprayCount = max;
    this.tagNumber = 0;
    if (this.onSprayUpdate) this.onSprayUpdate(this.sprayCount, this.maxSprays);
  }

  setSpeed(mult: number) {
    this.speedMultiplier = Math.max(0.5, Math.min(5, mult));
  }

  private static readonly SPRAY_COLORS = [
    '#ff3366', '#ffcc00', '#00ffdd', '#ff7700', '#cc44ff', '#44ff88',
  ];

  private sprayTag() {
    if (document.pointerLockElement !== this.renderer.domElement) return;
    if (this.sprayCount <= 0) return;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    raycaster.far = 6;

    const intersects = raycaster.intersectObjects(this.wallMeshes, false);
    if (intersects.length === 0) return;

    const hit = intersects[0];
    if (!hit.face) return;

    this.tagNumber++;
    const tagNum = this.tagNumber;
    const tagColor = MazeGame.SPRAY_COLORS[(tagNum - 1) % MazeGame.SPRAY_COLORS.length];
    const tagText = `Buradan Geçtin (${tagNum})`;

    // Build canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 512, 128);

    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = 'rgba(0,0,0,0.9)';
    ctx.lineWidth = 8;
    ctx.strokeText(tagText, 256, 64);
    ctx.fillStyle = tagColor;
    ctx.fillText(tagText, 256, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const geo = new THREE.PlaneGeometry(2.8, 0.7);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.05,
      depthWrite: false,
    });
    const tag = new THREE.Mesh(geo, mat);

    // World-space face normal
    const faceNormal = hit.face.normal.clone()
      .transformDirection(hit.object.matrixWorld)
      .normalize();

    // Place tag on wall face with slight offset to avoid z-fighting
    tag.position.copy(hit.point).addScaledVector(faceNormal, 0.06);

    // Orient tag to lie flat against the wall face, text upright
    const worldUp = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(worldUp, faceNormal).normalize();
    const up = new THREE.Vector3().crossVectors(faceNormal, right).normalize();
    const rotMatrix = new THREE.Matrix4().makeBasis(right, up, faceNormal);
    tag.quaternion.setFromRotationMatrix(rotMatrix);

    this.scene.add(tag);
    this.mazeObjects.push(tag);

    this.sprayCount--;
    if (this.onSprayUpdate) this.onSprayUpdate(this.sprayCount, this.maxSprays);
  }

  loadLevel(level: LevelConfig) {
    this.currentLevel = level;
    this.tagNumber = 0;
    this.clearScene();
    this.wallBoxes = [];
    this.wallMeshes = [];
    this.fireWalls = [];

    this.exitBounds = getExitRoomBounds(level.exit);
    this.buildScene(level);

    this.camera.position.set(CS * 1.5, WH * 0.6, CS * 1.5);
    // Face southeast — into the maze interior, away from corner walls
    this.yaw = Math.PI * 1.25;
    this.pitch = 0;
  }

  private clearScene() {
    for (const obj of this.mazeObjects) {
      this.scene.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else (obj.material as THREE.Material).dispose();
      }
    }
    this.mazeObjects = [];
    this.wallMeshes = [];
    this.exitRoomFloor = null;
    this.exitLight = null;
    while (this.scene.children.length > 0) this.scene.remove(this.scene.children[0]);
  }

  private add(obj: THREE.Object3D) { this.scene.add(obj); this.mazeObjects.push(obj); return obj; }

  private buildScene(level: LevelConfig) {
    switch (level.theme) {
      case 'grass': this.buildGrass(level); break;
      case 'office': this.buildOffice(level); break;
      case 'wood': this.buildWood(level); break;
      case 'ice': this.buildIce(level); break;
      case 'fire': this.buildFire(level); break;
      case 'space': this.buildSpace(level); break;
    }
    this.buildExitRoom(level);
  }

  private skipSet(exit: ExitConfig): Set<string> {
    return new Set(exit.openCells.map(([r, c]) => `${r},${c}`));
  }

  private buildMazeWalls(maze: number[][], skip: Set<string>, wallColor: number, topColor: number) {
    const rows = maze.length;
    const cols = maze[0].length;
    const wallMat = new THREE.MeshBasicMaterial({ color: wallColor });
    const topMat = new THREE.MeshBasicMaterial({ color: topColor });

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (maze[r][c] === 1 && !skip.has(`${r},${c}`)) {
          const mats = [wallMat, wallMat, topMat, wallMat, wallMat, wallMat];
          const geo = new THREE.BoxGeometry(CS, WH, CS);
          const wall = new THREE.Mesh(geo, mats);
          wall.position.set(c * CS + CS / 2, WH / 2, r * CS + CS / 2);
          this.add(wall);
          this.wallBoxes.push(new THREE.Box3().setFromObject(wall));
          this.wallMeshes.push(wall);
        }
      }
    }
  }

  private buildFireMazeWalls(maze: number[][], skip: Set<string>) {
    const rows = maze.length;
    const cols = maze[0].length;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (maze[r][c] === 1 && !skip.has(`${r},${c}`)) {
          const geo = new THREE.BoxGeometry(CS, WH, CS);
          const mat = new THREE.MeshBasicMaterial({ color: 0x5c1a00 });
          const wall = new THREE.Mesh(geo, mat);
          wall.position.set(c * CS + CS / 2, WH / 2, r * CS + CS / 2);
          this.add(wall);
          this.fireWalls.push(wall);
          this.wallBoxes.push(new THREE.Box3().setFromObject(wall));
          this.wallMeshes.push(wall);
        }
      }
    }
  }

  private buildFloor(maze: number[][], color: number) {
    const rows = maze.length;
    const cols = maze[0].length;
    const geo = new THREE.PlaneGeometry(cols * CS, rows * CS);
    const floor = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.set((cols * CS) / 2, 0, (rows * CS) / 2);
    this.add(floor);
  }

  private buildGrass(level: LevelConfig) {
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 25, 70);
    this.add(new THREE.AmbientLight(0xffffff, 1.0));
    this.buildFloor(level.maze, 0x3a6b1f);
    this.buildMazeWalls(level.maze, this.skipSet(level.exit), 0x2d5a1b, 0x4caf50);
  }

  private buildOffice(level: LevelConfig) {
    this.scene.background = new THREE.Color(0x1a1a2e);
    this.scene.fog = new THREE.Fog(0x1a1a2e, 15, 45);
    this.add(new THREE.AmbientLight(0xfff5cc, 0.95));
    const rows = level.maze.length;
    const cols = level.maze[0].length;
    this.buildFloor(level.maze, 0x404040);
    const ceilGeo = new THREE.PlaneGeometry(cols * CS, rows * CS);
    const ceil = new THREE.Mesh(ceilGeo, new THREE.MeshBasicMaterial({ color: 0x555555 }));
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set((cols * CS) / 2, WH, (rows * CS) / 2);
    this.add(ceil);
    this.buildMazeWalls(level.maze, this.skipSet(level.exit), 0x8b8b8b, 0x666666);
  }

  private buildWood(level: LevelConfig) {
    this.scene.background = new THREE.Color(0x7a5c3c);
    this.scene.fog = new THREE.Fog(0x7a5c3c, 25, 60);
    this.add(new THREE.AmbientLight(0xffe8cc, 1.0));
    this.buildFloor(level.maze, 0x8b5e3c);
    this.buildMazeWalls(level.maze, this.skipSet(level.exit), 0x6b3a18, 0x4a2810);
  }

  private buildIce(level: LevelConfig) {
    this.scene.background = new THREE.Color(0xc0e8f0);
    this.scene.fog = new THREE.Fog(0xc0e8f0, 20, 55);
    this.add(new THREE.AmbientLight(0xddf4ff, 1.0));
    this.buildFloor(level.maze, 0xb0dce8);
    this.buildMazeWalls(level.maze, this.skipSet(level.exit), 0x7ab8cc, 0xa0d4e4);
  }

  private buildFire(level: LevelConfig) {
    this.scene.background = new THREE.Color(0x0d0300);
    this.scene.fog = new THREE.FogExp2(0x1a0500, 0.03);
    this.add(new THREE.AmbientLight(0xff5500, 0.6));
    this.add(new THREE.AmbientLight(0xff2200, 0.3));
    this.buildFloor(level.maze, 0x1a0800);
    this.buildFireMazeWalls(level.maze, this.skipSet(level.exit));
  }

  private buildSpace(level: LevelConfig) {
    this.scene.background = new THREE.Color(0x000008);
    this.scene.fog = new THREE.FogExp2(0x000008, 0.022);

    this.add(new THREE.AmbientLight(0x6633cc, 0.6));
    this.add(new THREE.AmbientLight(0x2244aa, 0.4));

    const rows = level.maze.length;
    const cols = level.maze[0].length;

    // Floor — dark void
    this.buildFloor(level.maze, 0x04001a);

    // Ceiling
    const ceilGeo = new THREE.PlaneGeometry(cols * CS, rows * CS);
    const ceil = new THREE.Mesh(ceilGeo, new THREE.MeshBasicMaterial({ color: 0x02000f }));
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set((cols * CS) / 2, WH, (rows * CS) / 2);
    this.add(ceil);

    // Stars scattered on ceiling
    const starGeo = new THREE.BufferGeometry();
    const starCount = 400;
    const pos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      pos[i * 3]     = Math.random() * cols * CS;
      pos[i * 3 + 1] = WH - 0.05;
      pos[i * 3 + 2] = Math.random() * rows * CS;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    this.add(stars);

    // Walls — deep violet with neon purple tops
    this.buildMazeWalls(level.maze, this.skipSet(level.exit), 0x1a0044, 0x9b00ff);
  }

  private buildExitRoom(level: LevelConfig) {
    const { exit, theme } = level;
    const { direction, centerRow, centerCol } = exit;
    const bounds = getExitRoomBounds(exit);

    const themeColors: Record<string, { floor: number; wall: number; glow: number; light: number }> = {
      grass: { floor: 0x00cc44, wall: 0x008822, glow: 0x00ff66, light: 0x44ff88 },
      office: { floor: 0x2255cc, wall: 0x1133aa, glow: 0x4499ff, light: 0x88ccff },
      wood: { floor: 0xcc8800, wall: 0xaa6600, glow: 0xffcc00, light: 0xffdd66 },
      ice: { floor: 0x00bbdd, wall: 0x0088aa, glow: 0x44eeff, light: 0x88ffff },
      fire: { floor: 0xdd2200, wall: 0xaa1100, glow: 0xff8800, light: 0xffcc00 },
      space: { floor: 0x220066, wall: 0x110044, glow: 0xcc00ff, light: 0xdd88ff },
    };
    const tc = themeColors[theme] || themeColors.grass;

    let fMinX = bounds.minX, fMaxX = bounds.maxX, fMinZ = bounds.minZ, fMaxZ = bounds.maxZ;
    switch (direction) {
      case 'south': fMinZ = centerRow * CS; break;
      case 'north': fMaxZ = (centerRow + 1) * CS; break;
      case 'east':  fMinX = centerCol * CS; break;
      case 'west':  fMaxX = (centerCol + 1) * CS; break;
    }
    const roomW = bounds.maxX - bounds.minX;
    const roomD = bounds.maxZ - bounds.minZ;
    const roomCX = (bounds.minX + bounds.maxX) / 2;
    const roomCZ = (bounds.minZ + bounds.maxZ) / 2;

    const floorGeo = new THREE.PlaneGeometry(fMaxX - fMinX, fMaxZ - fMinZ);
    const floorMat = new THREE.MeshBasicMaterial({ color: tc.floor });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set((fMinX + fMaxX) / 2, 0.01, (fMinZ + fMaxZ) / 2);
    this.add(floorMesh);
    this.exitRoomFloor = floorMesh;

    const wallMat = new THREE.MeshBasicMaterial({ color: tc.wall });
    const wallMatTop = new THREE.MeshBasicMaterial({ color: tc.glow });

    const wallThickness = 0.5;
    const buildRoomWall = (wx: number, wy: number, wz: number, sx: number, sz: number) => {
      const geo = new THREE.BoxGeometry(sx, WH, sz);
      const mats = [wallMat, wallMat, wallMatTop, wallMat, wallMat, wallMat];
      const w = new THREE.Mesh(geo, mats);
      w.position.set(wx, WH / 2, wz);
      this.add(w);
      this.wallBoxes.push(new THREE.Box3().setFromObject(w));
    };

    switch (direction) {
      case 'south': {
        buildRoomWall(roomCX, 0, bounds.maxZ - wallThickness / 2, roomW, wallThickness);
        buildRoomWall(bounds.minX + wallThickness / 2, 0, roomCZ, wallThickness, roomD);
        buildRoomWall(bounds.maxX - wallThickness / 2, 0, roomCZ, wallThickness, roomD);
        break;
      }
      case 'north': {
        buildRoomWall(roomCX, 0, bounds.minZ + wallThickness / 2, roomW, wallThickness);
        buildRoomWall(bounds.minX + wallThickness / 2, 0, roomCZ, wallThickness, roomD);
        buildRoomWall(bounds.maxX - wallThickness / 2, 0, roomCZ, wallThickness, roomD);
        break;
      }
      case 'east': {
        buildRoomWall(bounds.maxX - wallThickness / 2, 0, roomCZ, wallThickness, roomD);
        buildRoomWall(roomCX, 0, bounds.minZ + wallThickness / 2, roomW, wallThickness);
        buildRoomWall(roomCX, 0, bounds.maxZ - wallThickness / 2, roomW, wallThickness);
        break;
      }
      case 'west': {
        buildRoomWall(bounds.minX + wallThickness / 2, 0, roomCZ, wallThickness, roomD);
        buildRoomWall(roomCX, 0, bounds.minZ + wallThickness / 2, roomW, wallThickness);
        buildRoomWall(roomCX, 0, bounds.maxZ - wallThickness / 2, roomW, wallThickness);
        break;
      }
    }

    const beaconGeo = new THREE.CylinderGeometry(0.3, 0.3, WH, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: tc.glow });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(roomCX, WH / 2, roomCZ);
    this.add(beacon);

    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(1.2 + i * 0.3, 0.08, 6, 24);
      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: tc.glow }));
      ring.position.set(roomCX, 0.5 + i * 0.8, roomCZ);
      ring.rotation.x = Math.PI / 4 * i;
      this.add(ring);
    }

    const discGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 24);
    const discMat = new THREE.MeshBasicMaterial({ color: tc.glow });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.set(roomCX, 0.05, roomCZ);
    this.add(disc);

    const light = new THREE.PointLight(tc.light, 8, 20);
    light.position.set(roomCX, WH - 0.2, roomCZ);
    this.add(light);
    this.exitLight = light;

    this.buildArrow(exit, roomCX, roomCZ, tc.glow);

    const starGeo = new THREE.SphereGeometry(0.35, 8, 8);
    const star = new THREE.Mesh(starGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    star.position.set(roomCX, WH + 0.2, roomCZ);
    this.add(star);
  }

  private buildArrow(exit: ExitConfig, roomCX: number, roomCZ: number, color: number) {
    const { direction, centerRow, centerCol } = exit;
    const bodyGeo = new THREE.BoxGeometry(0.3, 0.08, 1.5);
    const tipGeo = new THREE.ConeGeometry(0.4, 0.8, 6);
    const mat = new THREE.MeshBasicMaterial({ color });

    const body = new THREE.Mesh(bodyGeo, mat);
    const tip = new THREE.Mesh(tipGeo, mat);

    let arrowX = roomCX;
    let arrowZ = roomCZ;
    let arrowRotY = 0;

    switch (direction) {
      case 'south':
        arrowZ = (centerRow + 1) * CS + CS * 0.8;
        arrowRotY = 0;
        break;
      case 'north':
        arrowZ = centerRow * CS - CS * 0.8;
        arrowRotY = Math.PI;
        break;
      case 'east':
        arrowX = (centerCol + 1) * CS + CS * 0.8;
        arrowRotY = Math.PI / 2;
        break;
      case 'west':
        arrowX = centerCol * CS - CS * 0.8;
        arrowRotY = -Math.PI / 2;
        break;
    }

    const group = new THREE.Group();
    body.position.set(0, 0.06, 0);
    tip.rotation.z = Math.PI / 2;
    tip.position.set(0, 0.1, -0.9);
    tip.rotation.x = -Math.PI / 2;
    tip.position.set(0, 0.06, -1.0);
    group.add(body);
    group.add(tip);
    group.position.set(arrowX, 0.05, arrowZ);
    group.rotation.y = arrowRotY;
    this.add(group);
  }

  private getDistanceToExitRoom(): number {
    if (!this.exitBounds) return 999;
    const { minX, maxX, minZ, maxZ } = this.exitBounds;
    const px = this.camera.position.x;
    const pz = this.camera.position.z;
    const cx = (minX + maxX) / 2;
    const cz = (minZ + maxZ) / 2;
    const dx = px - cx;
    const dz = pz - cz;
    return Math.sqrt(dx * dx + dz * dz);
  }

  private isInExitRoom(): boolean {
    if (!this.exitBounds) return false;
    const { minX, maxX, minZ, maxZ } = this.exitBounds;
    const px = this.camera.position.x;
    const pz = this.camera.position.z;
    const margin = 0.8;
    return px > minX + margin && px < maxX - margin &&
      pz > minZ + margin && pz < maxZ - margin;
  }

  private updateMovement(delta: number) {
    const speed = 8.0 * this.speedMultiplier;
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const moveDir = new THREE.Vector3();

    if (this.moveForward) moveDir.addScaledVector(forward, 1);
    if (this.moveBackward) moveDir.addScaledVector(forward, -1);
    if (this.moveLeft) moveDir.addScaledVector(right, -1);
    if (this.moveRight) moveDir.addScaledVector(right, 1);

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize();
      const step = moveDir.clone().multiplyScalar(speed * delta);
      const pos = this.camera.position;

      pos.x += step.x;
      if (this.checkCollision(pos)) pos.x -= step.x;

      pos.z += step.z;
      if (this.checkCollision(pos)) pos.z -= step.z;
    }
  }

  private checkCollision(pos: THREE.Vector3): boolean {
    const r = 0.35;
    const box = new THREE.Box3(
      new THREE.Vector3(pos.x - r, 0.1, pos.z - r),
      new THREE.Vector3(pos.x + r, WH - 0.1, pos.z + r),
    );
    for (const wb of this.wallBoxes) {
      if (box.intersectsBox(wb)) return true;
    }
    return false;
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    const now = performance.now();
    const delta = this.lastTime ? Math.min((now - this.lastTime) / 1000, 0.05) : 0.016;
    this.lastTime = now;
    this.time += delta;

    this.updateMovement(delta);

    const euler = new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(euler);

    if (this.fireWalls.length > 0) {
      const s = this.time * 3;
      for (let i = 0; i < this.fireWalls.length; i++) {
        const offset = i * 0.37;
        const r = 0.35 + Math.sin(s + offset) * 0.18;
        const g = 0.1 + Math.sin(s * 0.7 + offset) * 0.06;
        (this.fireWalls[i].material as THREE.MeshBasicMaterial).color.setRGB(r, g, 0);
      }
    }

    if (this.exitLight) {
      this.exitLight.intensity = 6 + Math.sin(this.time * 4) * 2;
    }
    if (this.exitRoomFloor) {
      const pulse = 0.85 + Math.sin(this.time * 3) * 0.15;
      this.exitRoomFloor.scale.set(pulse, 1, pulse);
    }

    const dist = this.getDistanceToExitRoom();
    if (this.onDistanceUpdate) this.onDistanceUpdate(dist);

    if (this.isInExitRoom() && this.onLevelComplete) {
      this.onLevelComplete();
      this.onLevelComplete = null;
    }

    this.renderer.render(this.scene, this.camera);
  };

  unlockPointer() {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  destroy() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
    this.clearScene();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
