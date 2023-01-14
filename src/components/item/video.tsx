import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'

import styles from '../../styles/Video.module.css'
import scrollbar from '../../styles/Scrollbar.module.css'
import Editor from './editor'

import { video } from '../../types/video'

type landScape = {
    section: string,
    video: string,
    write: string,
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

    const [landScaped, setLandScaped] = useState<landScape>({
        section: '',
        video: '',
        write: '',
    });
    useEffect(() => {
        let width = window.innerWidth;
        let height = window.innerHeight;
        if (window.matchMedia('(orientation: landscape)').matches
            && (width > height)
        ) {
            console.log("bb")
            setLandScaped({
                section: styles['wrap-section-row'],
                video: styles['video-youtube-row'],
                write: styles['video-write-row'],
            });
        }
        
    }, []);

    let video = (
        <iframe
        className={styles['video-youtube'] + ' ' + landScaped.video} 
        width="560"
        height="315"
        src={'https://www.youtube-nocookie.com/embed/' + video_data.id}
        title="YouTube video player"
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
        ref={iframe}
        />
    )
    let editor = <Editor videoId={video_data.id} class={landScaped.write} zindex={props.zindex} />

    const [front, setFront] = useState(video);
    const [back, setBack] = useState(editor);

    const change_order = () => {
        let temp = front;
        setFront(back);
        setBack(temp);
    }


    return (
        <div className={styles['video-container']} ref={md}>
            <div className={styles['video-preview']}>
                <Image className={styles['video-thumbnail']} src={video_data.thumbnail.url} alt={video_data.title} width={video_data.thumbnail.width} height={video_data.thumbnail.height} />
                <div className={styles['video-info']} onClick={toggleVideo}>
                    <div className={styles['video-title']}>{video_data.title}</div>
                    <div className={styles['video-detail'] + ' ' + scrollbar['soft-scrollbar']}>
                        <span className={styles['video-description']}>{video_data.description}</span>
                    </div>
                </div>
                <div className={styles["video-toggle-md"]}>
                    <div className={styles["video-toggle-btn"]} onClick={toggleWrite}>
                        에디터
                    </div>
                    <div className={styles["video-toggle-btn"]} onClick={change_order}>
                        변경
                    </div>
                </div>
            </div>
            <div className={styles['wrap-section'] + ' ' + landScaped.section}>
                {front}
                {back}
            </div>
        </div>
    );

}

export default Video;