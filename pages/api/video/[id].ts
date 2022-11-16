import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
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

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    var id: string = req.query.id as string;
    const url = 'https://www.googleapis.com/youtube/v3/videos?key=' + process.env.APIKEY + '&id=' + id + '&part=snippet,id&maxResults=20';
    axios.get(url)
        .then((response) => {
            var data = response.data.items[0];
            var video = {
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
            res.json(video);
            
        })
        .then((error) => {
            if (error != null) {
                res.json({ id: '', title: '', description: '', thumbnail: { url: '', width: 0, height: 0 }, channelId: '' });
            }
        });
}