import styles from '../styles/Video.module.css'


const Editor = (props: any)=>{
    

    return (
        <div className={styles['video-write']}  >
            <div className={styles["video-write-wrapper"]}>
                <div className={styles["video-write-md"]} contentEditable></div>
                <div className={styles["video-write-btns"]}>
                    <button className={styles["video-write-btn write-save"]}>저장</button>
                    <button className={styles["video-write-btn write-download"]}>다운로드</button>
                </div>
            </div>
            <div className={styles["video-write-view markdown-body"]}></div>
        </div>
    )
}

export default Editor;