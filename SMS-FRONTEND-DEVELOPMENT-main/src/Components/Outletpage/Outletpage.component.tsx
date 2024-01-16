import { FC, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

//style
import { Page } from "App/style/App.style";

//components
import Navbar from "Components/Navbar/Navbar.component";
import OpeningPage from "Components/OpeningPage/OpeningPage.component";
import SideBar from "statics/sidebar/Sidebar.component";

const OutletPage: FC<{}> = () => {
  const location = useLocation();
  const showOpeningPage = location.pathname === "/";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Page>
      <Navbar toggleSidebar={toggleSidebar} />
      {showOpeningPage && <OpeningPage />}
      <SideBar isOpen={sidebarOpen} closeSidebar={toggleSidebar} />
      <Outlet />
    </Page>
  );
};

export default OutletPage;
