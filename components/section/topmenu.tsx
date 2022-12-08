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

    const loadVideo = (e:any) => {
        clearVideo();
        let url:string = urlInput.current?.value ? urlInput.current?.value : "";
        structChannel(e, url, setChannel, setVideos);
    }


    return (
        <section className={styles['top-menu']}>
            <input ref={urlInput} type="text" id="youtuebeUrl" />
            <button id="loadVideos" onClick={loadVideo}>load</button>
            <div>
                <div>{channel == null ? "Channel name" : channel.title}</div>
            </div>

        </section>
    );
};

export default Topmenu;