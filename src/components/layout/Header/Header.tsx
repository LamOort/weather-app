import "./Header.scss";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="header">
      <div className="header-inner">{children}</div>
    </header>
  );
};

export default Header;
