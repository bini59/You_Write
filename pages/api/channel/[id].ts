import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
    videoIds: string[],
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    var id: string = req.query.id as string;
    axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.APIKEY}&channelId=${id}&part=snippet,id&order=date&maxResults=20`
    )
        .then((response) => {
            var videoIds: string[] = [];
            response.data.items.forEach((item: any) => {
                if(item.id.kind == 'youtube#video') {
                    videoIds.push(item.id.videoId);
                }
            });
            res.json({ videoIds: videoIds });
        })
        .then((error) => {
            if(error != null){
                res.json({ videoIds: [] });
            }
        });
}