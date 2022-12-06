import { useRef, useEffect } from "react"
import { marked } from 'marked'


import styles from '../styles/Video.module.css'



const Editor = (props: any) => {
    
    let videoId = props.videoId as string;

    let write = useRef<HTMLDivElement>(null);
    let view = useRef<HTMLDivElement>(null);

    const update = () => {
        (view.current as HTMLDivElement).innerHTML = marked.parse((write.current as HTMLDivElement).innerText);
    }

    const save = () => {
        var md = (write.current as HTMLDivElement).innerText;
        // save local storage
        localStorage.setItem(videoId, md);
    }

    const download = () => {
        var md = (write.current as HTMLDivElement).innerText;
        // download md file
        const blob = new Blob([md], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = "markdown.md";
        a.href = url;
        a.click();
        a.remove();
    }

    return (
        <div className={styles['video-write']}  >
            <div className={styles["video-write-wrapper"]}>
                <div className={styles["video-write-md"]} contentEditable ref={write} onKeyUp={update} />
                <div className={styles["video-write-btns"]}>
                    <button className={styles["video-write-btn write-save"]} onClick={save}>저장</button>
                    <button className={styles["video-write-btn write-download"]} onClick={download}>다운로드</button>
                </div>
            </div>
            <div className={styles["video-write-view"]} ref={view} />
        </div>
    )
}

export default Editor;