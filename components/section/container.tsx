import shallow from 'zustand/shallow';

import styles from '../../styles/Container.module.css'

import { useVideoStore } from '../../lib/videoStore';
import Video from '../item/video';

const Container = (props: any) => {
    const { videos } = useVideoStore(
        state => ({ videos: state.video }),
        shallow
    );

    const videoList = videos.map((video: any) => {
        return <Video video={video} key={video.id} />
    });


    return (
        <section className={styles.container}>
            {videoList}
        </section>
    )
}

export default Container;