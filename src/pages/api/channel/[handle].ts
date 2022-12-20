import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from "cheerio";
import axios from "axios";


import { channel } from '../../../types/channel';


const loadChannelId = (url: string, callback: (id: string) => void) => {
    axios.get(url)
        .then((response) => {
            const $ = cheerio.load(response.data);
            const channelId = $('meta[itemprop="channelId"]').attr('content');
            callback(channelId ? channelId : '');
        })
        .then((error) => {
            if (error != null) {
                callback('');
            }
        });
    
    
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<channel>
) {
    let handle: string = req.query.handle as string;
    let url = 'https://www.youtube.com/' + handle;
    loadChannelId(url, (id) => {
        console.log("id" + id);
        axios.get(
            `https://www.googleapis.com/youtube/v3/channels?key=${process.env.APIKEY}&part=snippet&id=${id}`
        ).then((response) => {
            let c: channel = {
                id: response.data.items[0].id,
                title: response.data.items[0].snippet.title,
                description: response.data.items[0].snippet.description,
                thumbnail: response.data.items[0].snippet.thumbnails.medium.url,
            }
            res.json(c);
        }).then((error) => {
            if (error != null) {
                res.json({ id: '', title: '', thumbnail: '', description: '' });
            }
        });
    });
}