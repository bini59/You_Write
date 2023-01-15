import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';

import styles from '../../styles/Container.module.css'

import { useVideoStore } from '../../lib/videoStore';
import Video from '../item/video';

import { video } from '../../types/video';


const Container = (props: any) => {
    const { videos } = useVideoStore(
        state => ({ videos: state.video }),
        shallow
    );

    const [zindex, setZindex] = useState(1);

    const index = () => {
        var temp = zindex;
        setZindex(zindex + 1);

        return temp;
    }
    
    const [videoList, setVideoList] = React.useState<JSX.Element[]>([]);
    useEffect(() => {
        console.log(videos)
        let list: JSX.Element[] = videos.slice(0, 20).map((video: video) => {
            return <Video video={video} key={video.title} zindex={index} />
        })
        setVideoList(list);
    }, [videos])

    const moreVideos = () => {
        var start = videoList.length;
        var end = start + 20 > videos.length ? videos.length : start + 20;
        let list: JSX.Element[] = videos.slice(start, end).map((video: video) => {
            return <Video video={video} key={video.title} zindex={index} />
        });
        setVideoList([...videoList, ...list]);
    }


    return (
        <section className={styles.container}>
            {videoList}
            {videoList.length > 0 && videoList.length != videos.length ? <button onClick={moreVideos} className={styles.more_btn}>불러오기</button> : null}
        </section>
    )
}

export default Container;