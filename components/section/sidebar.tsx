import React, {useEffect} from "react";

import Image from "next/image";

import { useChannelStore, } from "../../lib/channelStore";
import { useVideoStore } from "../../lib/videoStore";
import shallow from "zustand/shallow";

import { searchChannel, searchChannelwithUrl } from "../../lib/searchChannel";



import styles from "../../styles/Sidebar.module.css";
import ChannelItem from "../item/channelItem";
import loadVideos from "../../lib/loadVideos";
import { channel } from "../../types/channel";
import { video } from "../../types/video";

const Sidebar = () => {

    const { setVideos, clearVideo } = useVideoStore(
        (state) => ({
            setVideos: state.setVideos,
            clearVideo: state.clearVideo,
        }),
        shallow
    )
    
    const { channel, channels, setChannel, setChannels, clearChannels } = useChannelStore(
        (state) => ({
            channel: state.channel,
            channels: state.channels,
            setChannel: state.setChannel,
            setChannels: state.setChannels,
            clearChannels: state.clearChannels,
        }),
        shallow
    )
    
    let urlInput = React.useRef<HTMLInputElement>(null);
    const loadChannels = (e:any) => {
        clearChannels();

        let urlRegex = new RegExp(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/);

        let input:string = urlInput.current?.value ? urlInput.current?.value : "";
        if (input == "") return;
        if (urlRegex.test(input)) {
            searchChannelwithUrl(input.split("https://www.youtube.com/")[1], (channels: channel[]) => {
                setChannel(channels[0]);
                setChannels(channels);
                clearVideo();
                loadVideos(channels[0].id, (videos: video[]) => { setVideos(videos); });
            })
        }
        else searchChannel(input, (channels: channel[]) => { setChannels(channels); });
    }

    const [channelList, setChannelList] = React.useState<JSX.Element[]>([]);
    useEffect(() => {
        let list:JSX.Element[] = channels.map((channel: any) => {
            return <li><ChannelItem channel={channel} key={channel.id} /></li>
        })
        setChannelList(list);
    }, [channels])


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
                <input type="text" placeholder="Search..." onKeyUp={(e) => { if (e.key != "Enter") return;  loadChannels(e)} } ref={urlInput} />
                <div onClick={loadChannels}><ion-icon name="search-outline" size="large" /></div>
                
            </div>
            {/* <!-- search input end -->
            <!-- sidebar menu -->
            <!-- 즐겨찾기 리스트 --> */}
            <div className={styles['sidebar-menu']}>
                <ul>{channelList}</ul>
            </div>
            {/* <!-- sidebar menu end --> */}

        </section>
    );

}


export default Sidebar;