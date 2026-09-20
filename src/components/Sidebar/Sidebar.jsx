import "./Sidebar.css";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function Sidebar({handleEditProfileClick, onSignOut}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
              <img src={(currentUser && currentUser.avatar) || avatar}
              alt={(currentUser && currentUser.name) || "User"}  className="sidebar__avatar" />
        <p className="sidebar__username">{(currentUser && currentUser.name) || "User"}</p>
      </div>
      <div className="editProfile">
        <button type="button" className="editProfile__btn" onClick={handleEditProfileClick}>
          Change profile data
        </button>
                    <button className="sidebar__signout-btn" onClick={onSignOut}>
              Sign out
            </button>
      </div>
    </aside>
  );
}
