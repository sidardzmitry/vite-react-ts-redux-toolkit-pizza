import { useEffect, useState } from "react";
import styles from "./Switcher.module.scss";

import { Github, Linkedin, Moon, Sun } from "lucide-react";

const gitLink = 'https://github.com/sidardzmitry';
const linkLink = 'https://www.linkedin.com/in/dmitriy-sidortsov-419701228/';

interface SwitcherProps {}

export const Switcher = ({}: SwitcherProps) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className={`${styles["author"]}`}>
        <a href={linkLink} className={`${styles['author__link']}`}><Linkedin size={14} strokeWidth={1.5} /></a>
        <a href={gitLink} className={`${styles['author__link']}`}><Github size={14} strokeWidth={1.5} /></a>
      </div>
      <div className={`${styles["switcher"]}`}>
        <div
          className={`${styles["switcher__icons"]} ${
            theme === "light" ? "" : styles["checked"]
          }`}
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Sun
              size={14}
              strokeWidth={2}
              className={`${styles["icon-sun"]}`}
            />
          ) : (
            <Moon
              size={14}
              strokeWidth={2}
              className={`${styles["icon-moon"]}`}
            />
          )}
        </div>
        <h5 className={`${styles["switcher__title"]}`}>Light Theme</h5>
      </div>
    </>
  );
};
