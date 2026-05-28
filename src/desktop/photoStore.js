// Tiny in-memory photo store. Photos disappear on page refresh — that's fine.
// Components subscribe via subscribe(); use getSnapshot() inside useSyncExternalStore.

let photos = [];
const listeners = new Set();
let nextId = 1;

function emit() {
    listeners.forEach((l) => l());
}

export const photoStore = {
    subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
    getSnapshot() {
        return photos;
    },
    add(dataUrl, approxBytes) {
        const id = nextId++;
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const modified = `${pad(now.getMonth() + 1)}/${pad(now.getDate())}/${now.getFullYear()} ${pad(((now.getHours() + 11) % 12) + 1)}:${pad(now.getMinutes())} ${now.getHours() < 12 ? 'AM' : 'PM'}`;
        const name = `IMG_${String(id).padStart(4, '0')}.png`;
        const size = `${Math.max(1, Math.round(approxBytes / 1024))} KB`;
        photos = [...photos, { id, name, dataUrl, modified, size }];
        emit();
        return id;
    },
    remove(id) {
        photos = photos.filter((p) => p.id !== id);
        emit();
    },
};

export function downloadPhoto(photo) {
    const a = document.createElement('a');
    a.href = photo.dataUrl;
    a.download = photo.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
}
