import { Outlet, Link } from "react-router-dom";
import '../App.css';

const Layout = () => {
  return (
    <div>
      <nav>
        <div className="home-link" key="home-button">
            <Link style={{ color: "white" }} to="/brew-hub/">
                Home
            </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;