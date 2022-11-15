import styles from "../styles/Topmenu.module.css";

const Topmenu = () => {
    return (
        <section className={styles['top-menu']}>
            <input type="text" id="youtuebeUrl" />
            <button id="loadVideos">load</button>
        </section>
    );
};

export default Topmenu;