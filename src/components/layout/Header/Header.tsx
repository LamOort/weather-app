import styles from "./Header.module.scss";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>{children}</div>
    </header>
  );
};

export default Header;
