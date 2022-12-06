import axios from 'axios';

/**
 * get video ids with channel id
 * @param id channel id
 * @param callback callback function with video ids
 */
const loadVideos = (id:string, callback:(res:string[])=>void) => {
    axios.get('/api/video/list/' + id)
    .then((res) => {
        callback(res.data.videoIds);
    });
}


export default loadVideos;