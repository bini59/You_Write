import Sidebar from '../components/sidebar'
import Topmenu from '../components/topmenu'
import Container from '../components/container'

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
