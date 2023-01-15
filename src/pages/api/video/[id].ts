import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { video } from "../../../types/video";


/**
 * make video object from api data
 * @param data data from api
 * @returns video 
 */
const mVideo = (data:any) => {
    let v: video = {
        id: data.id.videoId,
        title: data.snippet.title,
        description: data.snippet.description,
        thumbnail: {
            url: data.snippet.thumbnails.medium.url,
            width: data.snippet.thumbnails.medium.width,
            height: data.snippet.thumbnails.medium.height,
        },
        channelId: data.snippet.channelId,
    }
    return v;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<video[]>
) {
    var id: string = req.query.id as string;
    const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.APIKEY}&part=snippet,id&order=date&maxResults=100&type=video&channelId=${id}`;
    axios.get(url)
        .then((response) => {
            let videos: video[] = [];
            response.data.items.forEach((item: any) => {
                if (item.id.kind == 'youtube#video') {
                    videos.push(mVideo(item));
                }
            });
            res.json(videos);
        })
        .then((error) => {
            if (error != null) {
                res.json([{ id: '', title: '', description: '', thumbnail: { url: '', width: 0, height: 0 }, channelId: '' }]);
            }
        });
}