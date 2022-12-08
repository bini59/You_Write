import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from "cheerio";
import axios from "axios";


import { channel } from '../../../types/channel';


const loadChannelId = async (url: string, callback:(id:string)=>void) => {
    let id = await axios.get(url)
        .then((response) => {
            const $ = cheerio.load(response.data);
            const channelId = $('meta[itemprop="channelId"]').attr('content');
            return channelId;
        })
        .then((error) => {
            if (error != null) {
                return '';
            }
        });
    
    callback(id ? id : '');
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<channel>
) {
    let url: string = req.query.id as string;
    loadChannelId(url, (id) => {
        axios.get(
            `https://www.googleapis.com/youtube/v3/channels?key=${process.env.APIKEY}&part=snippet,id&id=${id}`
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