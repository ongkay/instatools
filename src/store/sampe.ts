import { create } from 'zustand'
import { combine, createJSONStorage } from 'zustand/middleware'
import { devtools, persist } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface BearState {
    bears: number
    increase: (by: number) => void
}

const useBearStore3 = create<BearState>()(
    devtools(
        persist(
            (set) => ({
                bears: 0,
                increase: (by) => set((state) => ({ bears: state.bears + by })),
            }),
            {
                name: 'save-localstorage',
                // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used,
                // getStorage: () => localStorage,
            }
        )
    )
)

interface BearState {
    bears: number
    increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
}))





// About Inspect your zustand store in React DevTools
if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store1', useBearStore3);

    mountStoreDevtool('Store2', useBearStore);
}
