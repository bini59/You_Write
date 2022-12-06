import create from "zustand";

type channel = {
    title: string,
    description: string,
    thumbnail : string

}

interface ChannelStore {
    channel : channel | null,
    setChannel: (channel: channel) => void,
    clearChannel: () => void,
}

export const useChannelStore = create<ChannelStore>((set) => ({
    channel: null,
    setChannel: (channel) => set({ channel }),
    clearChannel: () => set({ channel: null }),
}));
