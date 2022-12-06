import Image from "next/image";
import { useChannelStore, } from "../lib/channelStore";
import shallow from "zustand/shallow";

import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {

    const { channel } = useChannelStore(
        (state) => ({
            channel: state.channel,
        }),
        shallow
    )

    return (
        <section className={styles.sidebar}>
            {/* <!-- logo section --> */}
            <div className={styles.logo}>
                <Image className={styles['sidebar-thumbnail']} src={channel != null ? channel.thumbnail : "/logo.png"} alt="logo" width={200} height={200} />
            </div>
            {/* <!-- logo section end -->
            <!-- search input -->
            <!-- 채널 검색 --> */}
            <div className={styles.search}>
                <input type="text" placeholder="Search..." />
                <i className="fas fa-search"></i>
            </div>
            {/* <!-- search input end -->
            <!-- sidebar menu -->
            <!-- 즐겨찾기 리스트 --> */}
            <div className={styles['sidebar-menu']}>
                <ul>
                    <li>
                        <a href="#">
                            <span className={styles.icon}><i className="fas fa-home"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <span className={styles.icon}><i className="fas fa-user"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className={styles.icon}><i className="fas fa-users"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <span className={styles.icon}><i className="fas fa-shopping-cart"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <span className={styles.icon}><i className="fas fa-chart-line"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <span className={styles.icon}><i className="fas fa-cog"></i></span>
                            <span className={styles.title}>Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
            {/* <!-- sidebar menu end --> */}

        </section>
    );

}


export default Sidebar;