import Image from "next/image";

import { useChannelStore } from "../../lib/channelStore";
import shallow from "zustand/shallow";

type channel = {
    id: string,
    title: string,
    thumbnail: string,
    description : string
}


const ChannelItem = (prop:any) => {
    
    let channel:channel = prop.channel;

    return (
        <div>
            <Image src={channel.thumbnail} alt="ch_image" />
            <span>{channel.title}</span> 
        </div>
    );
}

export default ChannelItem;