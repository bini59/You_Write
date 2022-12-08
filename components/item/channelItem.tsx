import Image from "next/image";

import { channel } from "../../types/channel";

import styles from "../../styles/Channel.module.css";


const ChannelItem = (prop:any) => {
    
    let channel:channel = prop.channel;

    return (
        <div className={styles['ch-container']}>
            <Image className={styles['ch-img']} src={channel.thumbnail} alt="ch_image" width={30} height={30} />
            <span className={styles['ch-title']}>{channel.title}</span> 
        </div>
    );
}

export default ChannelItem;