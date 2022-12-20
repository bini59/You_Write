import Sidebar from '../components/section/sidebar'
import Topmenu from '../components/section/topmenu'
import Container from '../components/section/container'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Topmenu />
      <Sidebar />
      <Container />
    </div>
  )
}
