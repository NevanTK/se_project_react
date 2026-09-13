import "./Sidebar.css";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function Sidebar({handleEditProfileClick}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{(currentUser && currentUser.name) || "User"}</p>
        <img src={(currentUser && currentUser.avatar) || avatar}
                          alt={(currentUser && currentUser.name) || "User"}  className="sidebar__avatar" />
      </div>
      <div className="editProfile">
        <button className="editProfile__button">Edit profile</button>
      </div>
    </aside>
  );
}
