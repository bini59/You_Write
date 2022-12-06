import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
    title: string,
    thumbnail: string,
    description: string,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    var id: string = req.query.id as string;
    axios.get(
        `https://www.googleapis.com/youtube/v3/channels?key=${process.env.APIKEY}&id=${id}&part=snippet,id&order=date&maxResults=20`
    ).then((response) => {
        var data = response.data.items[0];
        var channel = {
            title: data.snippet.title,
            thumbnail: data.snippet.thumbnails.medium.url,
            description: data.snippet.description,
        }
        res.json(channel);
    }).then((error) => {
        if (error != null) {
            res.json({ title: '', thumbnail: '', description: '' });
        }
    });
}