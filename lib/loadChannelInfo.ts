import axios from "axios";


type channel = {
    title: string,
    thumbnail: string,
    description: string,
}

/**
 * get youtube channel id with channel name, channel thumbnail, channel description
 * @param id value
 * @param callback callback function with channel id
 * 
 */

const loadChannelInfo = (id: string, callback: (res: channel) => void) => {
    axios.get('/api/channel/info/' + id)
        .then((res) => {
            callback(res.data);
        }
    );
}

export default loadChannelInfo