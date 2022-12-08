import React, { useEffect } from 'react';
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
    
    const [videoList, setVideoList] = React.useState<JSX.Element[]>([]);
    useEffect(() => {
        let list: JSX.Element[] = videos.map((video: video) => {
            return <Video video={video} key={video.title} />
        })
        setVideoList(list);
    }, [videos])


    return (
        <section className={styles.container}>
            {videoList}
        </section>
    )
}

export default Container;