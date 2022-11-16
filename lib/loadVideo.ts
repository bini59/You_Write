import axios from 'axios';

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
/**
 * get video data with video id
 * @param videoId video id
 * @param callback callback function with video data
 */
const loadVideo = (videoId : string, callback : (res : video)=>void) => {
    axios('/api/video/' + videoId)
        .then((res) => {
            callback(res.data);
        })
}

export default loadVideo;