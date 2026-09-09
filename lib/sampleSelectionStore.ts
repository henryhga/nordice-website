"use client";

// Selección de productos para "Solicitar muestra", compartida entre el
// header, la sección de experiencia, las fichas de producto y el propio
// formulario — y persistida en sessionStorage para que sobreviva a
// cerrar/reabrir el modal o desplazarse por la página. Implementado como
// store externo (useSyncExternalStore) en vez de useState+useEffect: leer
// sessionStorage solo existe en el cliente, y el patrón store-externo es
// el que ya usa este proyecto (ver lib/useMediaQuery.ts) para evitar el
// lint de "setState dentro de un efecto" y el parpadeo de hidratación.
const STORAGE_KEY = "nordice-sample-selection";
const listeners = new Set<() => void>();
let cached: string[] | null = null;

function readFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((p) => typeof p === "string") : [];
  } catch {
    return [];
  }
}

function writeToStorage(next: string[]) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // sessionStorage puede no estar disponible (modo privado); la
    // selección sigue funcionando en memoria durante esta sesión.
  }
}

function setSelection(next: string[]) {
  cached = next;
  writeToStorage(next);
  listeners.forEach((listener) => listener());
}

export function subscribeSampleSelection(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSampleSelectionSnapshot(): string[] {
  if (cached === null) cached = readFromStorage();
  return cached;
}

// Debe devolver siempre la MISMA referencia — un array nuevo en cada
// llamada (p. ej. `return []`) dispara el warning/loop de
// useSyncExternalStore de "getServerSnapshot should be cached".
const EMPTY_SELECTION: string[] = [];

export function getSampleSelectionServerSnapshot(): string[] {
  return EMPTY_SELECTION;
}

export function addSampleProduct(product: string) {
  const current = getSampleSelectionSnapshot();
  if (!current.includes(product)) setSelection([...current, product]);
}

export function toggleSampleProduct(product: string) {
  const current = getSampleSelectionSnapshot();
  setSelection(current.includes(product) ? current.filter((p) => p !== product) : [...current, product]);
}

export function removeSampleProduct(product: string) {
  const current = getSampleSelectionSnapshot();
  setSelection(current.filter((p) => p !== product));
}

export function clearSampleSelection() {
  setSelection([]);
}
