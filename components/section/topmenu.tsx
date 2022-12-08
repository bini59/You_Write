import React, { useState } from "react";
import shallow from "zustand/shallow";
import { useVideoStore } from "../../lib/videoStore";


import styles from "../../styles/Topmenu.module.css";
import { useChannelStore } from "../../lib/channelStore";

const Topmenu = () => {


    const { setVideos, clearVideo } = useVideoStore(
        (state) => ({
            setVideos: state.setVideo,
            clearVideo: state.clearVideo,
        }),
        shallow
    );
    
    const { channel, setChannel } = useChannelStore(
        (state) => ({
            channel: state.channel,
            setChannel: state.setChannel,
        }),
        shallow
    )

    let urlInput = React.useRef<HTMLInputElement>(null);


    return (
        <section className={styles['top-menu']}>
            <div>
                <div><a href={channel ? `https://www.youtube.com/channel/${channel?.id}` : '#'}>{channel == null ? "Channel name" : channel.title}</a></div>
            </div>

        </section>
    );
};

export default Topmenu;