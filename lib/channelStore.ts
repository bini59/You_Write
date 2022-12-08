import create from "zustand";

type channel = {
    title: string,
    description: string,
    thumbnail : string

}

interface ChannelStore {
    channel: channel | null,
    channels: channel[],
    setChannel: (channel: channel) => void,
    clearChannel: () => void,
    setChannels: (channels: channel[]) => void,
    clearChannels: () => void,
}

export const useChannelStore = create<ChannelStore>((set) => ({
    channel: null,
    channels: [],
    setChannel: (channel) => set({ channel }),
    clearChannel: () => set({ channel: null }),
    setChannels: (channels) => set({ channels }),
    clearChannels: () => set({ channels: [] }),
}));
