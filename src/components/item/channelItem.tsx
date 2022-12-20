import Image from "next/image";

import { useChannelStore } from "../../lib/channelStore";
import shallow from "zustand/shallow";

import { channel } from "../../types/channel";

import styles from "../../styles/Channel.module.css";
import loadVideos from "../../lib/loadVideos";
import { useVideoStore } from "../../lib/videoStore";




const ChannelItem = (prop:any) => {
    
    let channel: channel = prop.channel;
    
    const { setChannel } = useChannelStore(
        (state) => ({
            setChannel: state.setChannel,
        }),
        shallow
    );

    const { setVideos, clearVideo } = useVideoStore(
        (state) => ({
            setVideos: state.setVideos,
            clearVideo: state.clearVideo,
        }),
        shallow
    )

    const loadChannel = (e:any) => {
        clearVideo();
        setChannel(channel);
        loadVideos(channel.id, (videos: any) => { setVideos(videos); });
    }


    return (
        <div className={styles['ch-container']} onClick={loadChannel}>
            <Image className={styles['ch-img']} src={channel.thumbnail} alt="ch_image" width={30} height={30} />
            <span className={styles['ch-title']}>{channel.title}</span> 
        </div>
    );
}

export default ChannelItem;