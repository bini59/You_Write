import create from "zustand";
import { video } from "../types/video";


interface VideoStore {
    video: video[],
    setVideo: (video: video) => void,
    clearVideo: () => void,
}

export const useVideoStore = create<VideoStore>((set) => ({
    video: [],
    setVideo: (video) => set((state) => ({ video: [...state.video, video] })),
    clearVideo: () => set(() => ({ video: [] })),
}));
