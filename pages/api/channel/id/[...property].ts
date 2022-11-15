// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from "cheerio";
import Request from '../../../../lib/request';

type Data = {
  id: string,
}

const loadChannelId = (url: string, res : NextApiResponse<Data>) => {
    Request(url, function (body) {
        const $ = cheerio.load(body);
        const id = $('meta[itemprop="channelId"]').attr('content');
        res.json({ id: id == null ? '' :id });
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
        default:
            res.json({ id: '' });
            break;
    }
  
}
