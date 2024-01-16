import { Link } from "react-router-dom";
import styled from "styled-components";

export const Sidebar = styled.div`
  position: fixed;
  top: 83px;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: white;
  transition: left 0.3s ease-in-out;
  z-index: 999;
  box-shadow: 0 1px 3px -2px black;
`;

export const SidebarItems = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  margin-top: 30px; */
`;

export const TypeIcon = styled.div`
  width: 40px;
  top: 25px;
  position: fixed;
`;

export const Center = styled.div`
  /* margin-top: 56px;
  display: flex;
  justify-content: center;
  top: 50px;
  position: fixed; */
`;

export const CenterUl = styled.ul`
  list-style: none;
  padding-left: 5%;
  padding-right: 5%;
`;

export const CenterLi = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;

  &:hover {
    background-color: #cfdeff;
    border-radius: 10px;
  }

  &:active {
    background-color: #b6b4bb;
  }
`;

export const SidebarIcon = styled.div`
  color: white;
  font-size: 22px;
`;

export const Logout = styled.div`
  position: fixed;
  bottom: 10px;
`;
export const SidebarLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 8px 12px;
  border-radius: 4px;
  gap: 3px;
  font-weight: 400;
  font-family: "Poppins";
  cursor: pointer;
`;
export const HoverIcon = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 35px;
  text-align: center;
  background-color: #30445b;
  color: white;
  position: absolute;
  left: 60px;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 12px;
  vertical-align: middle;
  z-index: 10;

  ${CenterLi}:hover & {
    display: flex;
  }
`;

export const SidebarSpan = styled.span`
  padding-left: 10px;
`;

// Media Query
export const MenuText = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const ProfileAdmin = styled.div`
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;
