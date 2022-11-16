import create from "zustand";

type video = {
    id: string,
    title: string,
    description: string,
    thumbnail: {
        url: string,
        width: number,
        height: number,
    },
    channelId : string
}

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
