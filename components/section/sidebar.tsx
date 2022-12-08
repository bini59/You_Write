import React, {useEffect} from "react";

import Image from "next/image";

import { useChannelStore, } from "../../lib/channelStore";
import { useVideoStore } from "../../lib/videoStore";
import shallow from "zustand/shallow";

import structChannel from "../../lib/structChannel";

import styles from "../../styles/Sidebar.module.css";
import ChannelItem from "../item/channelItem";

const Sidebar = () => {

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
        if (e.key != "Enter") return;

        console.log("temp");
        clearVideo();
        let url:string = urlInput.current?.value ? urlInput.current?.value : "";
        structChannel(e, url, setChannel, setVideos);
    }


    const [channelList, setChannelList] = React.useState<any>([]);
    useEffect(() => {
        let ch = (
            <ChannelItem props/>
        );
        
    }, [channel])


    return (
        <section className={styles.sidebar}>
            {/* <!-- logo section --> */}
            <div className={styles.logo}>
                <Image className={styles['sidebar-thumbnail']} src={channel != null ? channel.thumbnail : "/favicon.ico"} alt="logo" width={200} height={200} />
            </div>
            {/* <!-- logo section end -->
            <!-- search input -->
            <!-- 채널 검색 --> */}
            <div className={styles.search}>
                <input type="text" placeholder="Search..." onKeyUp={loadVideo} ref={urlInput} />
                <ion-icon name="search-outline" size="large" onClick={loadVideo}></ion-icon>
            </div>
            {/* <!-- search input end -->
            <!-- sidebar menu -->
            <!-- 즐겨찾기 리스트 --> */}
            <div className={styles['sidebar-menu']}>
                <ul>
                    <li>
                        <a href="#">
                            <span className={styles.icon}><i className="fas fa-home"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <span className={styles.icon}><i className="fas fa-user"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className={styles.icon}><i className="fas fa-users"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <span className={styles.icon}><i className="fas fa-shopping-cart"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <span className={styles.icon}><i className="fas fa-chart-line"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <span className={styles.icon}><i className="fas fa-cog"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
            {/* <!-- sidebar menu end --> */}

        </section>
    );

}


export default Sidebar;