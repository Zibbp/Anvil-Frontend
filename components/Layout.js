import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className={`min-h-screen dark:bg-ytd-900`}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
