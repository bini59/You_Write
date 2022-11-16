import axios from "axios";


/**
 * get youtube channel id with channel name, channel id, username
 * @param type channel name(c), channel id(channel), username(user)
 * @param id value
 * @param callback callback function with channel id
 */
const loadChannel = (type: string, id: string, callback: (id: string) => void) => {
    switch (type) {
        case 'channel':
            callback(id);
            break;
        case 'c':
            axios.get('/api/channel/id/c/' + id)
                .then((res) => {
                    callback(res.data.id);
                }
            );
            break;
        case 'user':
            axios.get('/api/channel/id/user/' + id)
                .then((res) => {
                    callback(res.data.id);
                }
            );
            break;
        default:
            callback('');
    }
}

export default loadChannel