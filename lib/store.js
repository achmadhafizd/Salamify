// store.js
import { createStore } from "zustand";

const store = createStore((set) => ({
  countSubuh: 0,
  incrementSubuh: () => set((state) => ({ countSubuh: state.countSubuh + 1 })),
  decrementSubuh: () => set((state) => ({ countSubuh: state.countSubuh - 1 })),
  countDzuhur: 0,
  incrementDzuhur: () =>
    set((state) => ({ countDzuhur: state.countDzuhur + 1 })),
  decrementDzuhur: () =>
    set((state) => ({ countDzuhur: state.countDzuhur - 1 })),
  countAshar: 0,
  incrementAshar: () => set((state) => ({ countAshar: state.countAshar + 1 })),
  decrementAshar: () => set((state) => ({ countAshar: state.countAshar - 1 })),
  countMaghrib: 0,
  incrementMaghrib: () =>
    set((state) => ({ countMaghrib: state.countMaghrib + 1 })),
  decrementMaghrib: () =>
    set((state) => ({ countMaghrib: state.countMaghrib - 1 })),
  countIsya: 0,
  incrementIsya: () => set((state) => ({ countIsya: state.countIsya + 1 })),
  decrementIsya: () => set((state) => ({ countIsya: state.countIsya - 1 })),
}));

export default store;
