import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import type { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/authSlice";
import { supabase } from "../../libs/supabaseClient";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const {isLoggedIn} = useSelector((state: RootState) => state.auth);
   const dispatch = useDispatch();
   
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault(); 

    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(clearUser());
        navigate('/');
    };

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        {
          isLoggedIn ? (
                <button 
                className={styles.logoutButton}
                onClick={handleLogout}>Logout</button>
          ) : (
            <a href="#home" onClick={(e) => handleNavClick(e, "home")}>My Portfolio</a>
          )
        }
      </h2>
        <ul className={styles.nav}>
          <li className={styles.navActive}><a href="#about" onClick={(e) => handleNavClick(e, "about")}>about me</a></li>
          <li><a href="#skills" onClick={(e) => handleNavClick(e, "skills")}>skills</a></li>
          <li><a href="#portfolio" onClick={(e) => handleNavClick(e, "projects")}>projects</a></li>
          <li><a href="#timeline" onClick={(e) => handleNavClick(e, "timeline")}>time line</a></li>
        </ul>
    </div>
  );
}