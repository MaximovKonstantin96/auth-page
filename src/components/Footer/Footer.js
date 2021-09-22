import styles from "./Footer.module.css";

export const Footer = ({ year }) => {
  return (
    <footer>
      <span>© Echo-test-task - {year}</span>
    </footer>
  );
};
