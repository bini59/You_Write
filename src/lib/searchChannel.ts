import axios from "axios";

import { channel } from "../types/channel";

/**
 * search channel by query
 * @param q search channel with query
 * @param callback callback function, param : channel array
 */
const searchChannel = (q: string, callback: (c: channel[]) => void) => {
    axios.get('/api/channels/' + q)
    .then((response) => {
        callback(response.data);
    })
    .then((error) => {
        if (error != null) {
            callback([{ id: '', title: '', thumbnail: '', description: '' }]);
        }
    });
}

/**
 * search channel by url
 * @param url search channel with url
 * @param callback callback function, param : channel array
 */
const searchChannelwithUrl = (url: string, callback: (c: channel[]) => void) => {
    
    axios.get('/api/channel/' + url)
    .then((response) => {
        console.log(url);
        callback([response.data]);
    })
    .then((error) => {
        if (error != null) {
            callback([{ id: '', title: '', thumbnail: '', description: '' }]);
        }
    });
}


export {searchChannel, searchChannelwithUrl};