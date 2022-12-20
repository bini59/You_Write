import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { channel } from "../../../types/channel";

/**
 * make channel object from api data
 * @param data data from api
 * @returns channel
 */
const mChannel = (data: any) => {
    let c: channel = {
        id: data.id.channelId,
        title: data.snippet.title,
        description: data.snippet.description,
        thumbnail: data.snippet.thumbnails.medium.url,
    }
    return c;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<channel[]>
) {
    var query: string = req.query.query as string;
    axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.APIKEY}&part=snippet,id&order=date&maxResults=10&type=channel&q=${query}`
    ).then((response) => {
        let channels: channel[] = [];
        response.data.items.forEach((item: any) => {
            if (item.id.kind == 'youtube#channel') {
                channels.push(mChannel(item));
            }
        });
        res.json(channels);
    }).then((error) => {
        if (error != null) {
            res.json([{ id: '', title: '', thumbnail: '', description: '' }]);
        }
    });
}