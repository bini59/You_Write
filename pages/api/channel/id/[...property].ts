// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from "cheerio";
import axios from "axios";

type Data = {
  id: string | undefined,
}

const loadChannelId = (url: string, res: NextApiResponse<Data>) => {
    axios.get(url)
        .then((response) => {
            const $ = cheerio.load(response.data);
            const channelId = $('meta[itemprop="channelId"]').attr('content');
            res.json({ id: channelId });
        })
        .then((error) => {
            if (error != null) {
                res.json({ id: '' });
            }
        });
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    var property: string[] = req.query.property as string[];
    
    switch (property[0]) {
        case 'channel':
            res.json({ id: property[1] });
            break;
        case 'c':
            loadChannelId('https://www.youtube.com/c/' + property[1], res);
            break;
        case 'user':
            loadChannelId('https://www.youtube.com/user/' + property[1], res);
            break;
        case '@':
            loadChannelId('https://www.youtube.com/' + property[1], res);
            break;
        default:
            res.json({ id: '' });
            break;
    }
  
}
