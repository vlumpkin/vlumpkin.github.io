// Lazy-loaded MediaPipe Hand Landmarker — shared by the Camera app and the
// desktop gesture controller so we only download the wasm/model once.

const TASKS_VISION_CDN = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';
const HAND_MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

export const HAND_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [17, 18], [18, 19], [19, 20],
    [0, 17],
];

let landmarkerPromise = null;

export function getHandLandmarker() {
    if (!landmarkerPromise) {
        landmarkerPromise = (async () => {
            const vision = await import(/* webpackIgnore: true */ `${TASKS_VISION_CDN}/+esm`);
            const fileset = await vision.FilesetResolver.forVisionTasks(`${TASKS_VISION_CDN}/wasm`);
            return vision.HandLandmarker.createFromOptions(fileset, {
                baseOptions: { modelAssetPath: HAND_MODEL_URL, delegate: 'GPU' },
                runningMode: 'VIDEO',
                numHands: 2,
            });
        })();
    }
    return landmarkerPromise;
}
