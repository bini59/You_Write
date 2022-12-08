import Image from "next/image";

import { channel } from "../../types/channel";


const ChannelItem = (prop:any) => {
    
    let channel:channel = prop.channel;

    return (
        <div>
            <Image src={channel.thumbnail} alt="ch_image" width={30} height={30} />
            <span>{channel.title}</span> 
        </div>
    );
}

export default ChannelItem;