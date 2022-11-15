import Sidebar from '../components/sidebar'
import Topmenu from '../components/topmenu'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Topmenu />
      <Sidebar />
    </div>
  )
}
