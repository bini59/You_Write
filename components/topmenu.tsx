type video = {
    id: string,
    title: string,
    description: string,
    thumbnail: {
        url: string,
        width: number,
        height: number,
    },
    channelId: string,
    channelTitle: string,
}

import React, { useState } from "react";
import shallow from "zustand/shallow";


import loadChannel from "../lib/loadChannel";
import loadVideo from "../lib/loadVideo";
import loadVideos from "../lib/loadVideos";

import { useVideoStore } from "../lib/videoStore";

import styles from "../styles/Topmenu.module.css";

const Topmenu = () => {
    const [channelName, setChannelName]= useState<string>('Channel Name');


    const { setVideos } = useVideoStore(
        (state) => ({ setVideos: state.setVideo }),
        shallow
    );


    let urlInput = React.useRef<HTMLInputElement>(null);

    const saveVideos = () => {
        let url: string = urlInput.current?.value == undefined ? "" : urlInput.current?.value;
        let url_parts = url.split("/");
        let id = url_parts[url_parts.length - 1];
        let type = url_parts[url_parts.length - 2];
        
        loadChannel(type, id, (res: string) => {
            
            loadVideos(res, (ids:string[]) => {
                for (let videoID in ids){
                    loadVideo(ids[videoID], (video: video) => {
                        setChannelName(video.channelTitle);
                        setVideos(video);
                    });
                }
            })
        })

    }



    return (
        <section className={styles['top-menu']}>
            <input ref={urlInput} type="text" id="youtuebeUrl" />
            <button id="loadVideos" onClick={saveVideos}>load</button>

            <div>
                <div>{channelName}</div>
            </div>

        </section>
    );
};

export default Topmenu;