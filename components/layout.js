import Nav from "./nav";
import Footer from "../components/footer";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Nav />
    {children}
    <Footer />
  </div>
);

export default Layout;