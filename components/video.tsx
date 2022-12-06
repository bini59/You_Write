import Image from 'next/image'
import { MouseEventHandler, Ref, useRef } from 'react'

import styles from '../styles/Video.module.css'
import Editor from './editor'

type video = {
    id: string,
    title: string,
    description: string,
    thumbnail: {
        url: string,
        width: number,
        height: number,
    },
    channelId : string
}

const Video = (props:any) => {
    let video_data = props.video as video;
    
    let iframe = useRef<HTMLIFrameElement>(null);
    const toggleVideo = (e: any) => {
        (iframe.current as HTMLIFrameElement).classList.toggle(styles['video-active']);
    }

    let md = useRef<HTMLDivElement>(null);
    const toggleWrite = (e: any) => {
        (md.current as HTMLDivElement).classList.toggle(styles['editor-active']);
    }

    return (
        <div className={styles['video-container']} ref={md}>
            <div className={styles['video-preview']}>
                {/* <Image src={video_data.thumbnail.url} alt={video_data.title} width={video_data.thumbnail.width} height={video_data.thumbnail.height} /> */}
                <div className={styles['video-info']} onClick={toggleVideo}>
                    <div className={styles['video-title']}>{video_data.title}</div>
                    <div className={styles['video-detail']}>
                        <span className={styles['video-description']}>{video_data.description}</span>
                        <span className={styles['video-data']}>{video_data.description}</span>
                    </div>
                </div>
                <div className={styles["video-toggle-md"]}>
                    <div className={styles["video-toggle-btn"]} onClick={toggleWrite}>
                        🔽
                    </div>
                </div>
            </div>
            <iframe
            className={styles['video-youtube']} 
            width="560"
            height="315"
            src={'https://www.youtube-nocookie.com/embed/' + video_data.id}
            title="YouTube video player"
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            ref={iframe}
            />
            <Editor />
        </div>
    );

}

export default Video;