import { useRef, useEffect } from "react"
import { marked } from 'marked'


import styles from '../../styles/Video.module.css'



const Editor = (props: any) => {
    
    let videoId = props.videoId as string;
    let landScape = props.class as string;

    let write = useRef<HTMLDivElement>(null);
    let view = useRef<HTMLDivElement>(null);

    let writeWrapper = useRef<HTMLDivElement>(null);
    let viewWrapper = useRef<HTMLDivElement>(null);

    const sizeup = (e: any) => {
        (writeWrapper.current as HTMLDivElement).classList.toggle(styles["video-write-up"]);
        (viewWrapper.current as HTMLDivElement).classList.toggle(styles["video-view-up"]);
        
        e.target.innerText == "확장" ? e.target.innerText = "축소" : e.target.innerText = "확장"
    }

    const full = (e: any) => {
        (writeWrapper.current as HTMLDivElement).classList.toggle(styles["video-write-full"]);
        (viewWrapper.current as HTMLDivElement).classList.toggle(styles["video-view-full"]);
        
        e.target.innerText == "전체화면" ? e.target.innerText = "축소" : e.target.innerText = "전체화면"
    }

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

    
    useEffect(() => {
        let loadedmd = localStorage.getItem(videoId);
        if (loadedmd) {
            (write.current as HTMLDivElement).innerText = loadedmd;
            update();
        }
    }, [])

    return (
        <div className={styles['video-write'] + ' ' + landScape}  >
            <div className={styles["video-write-wrapper"]} ref={writeWrapper}>
                <div className={styles["video-write-md"]} contentEditable ref={write} onKeyUp={update} />
                <div className={styles["video-write-btns"]}>
                    <button className={styles["video-write-btn write-save"]} onClick={save}>저장</button>
                    <button className={styles["video-write-btn write-download"]} onClick={download}>다운로드</button>
                </div>
            </div>
            <div className={styles["video-view-wrapper"]} ref={viewWrapper}>
                <div className={styles["video-write-view"]} ref={view} />
                <div className={styles["video-write-btns"] + " " + styles["video-view-btns"]}>
                    <button className={styles["video-write-btn view-up"]} onClick={sizeup}>확장</button>
                    <button className={styles["video-write-btn view-full"]} onClick={full}>전체화면</button>
                </div>  
            </div>
            
        </div>
    )
}

export default Editor;