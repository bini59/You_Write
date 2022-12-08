import axios from 'axios';

import { video } from "../types/video";
import { channel } from "../types/channel";

const loadVideos = (channelId: string, callback: (v: video[]) => void) => {
    axios('/api/video/' + channelId)
        .then((response) => {
            callback(response.data);
        })
        .then((error) => {
            if (error != null) {
                callback([{ id: '', title: '', description: '', thumbnail: { url: '', width: 0, height: 0 }, channelId: '' }]);
            }
        });
}

export default loadVideos;