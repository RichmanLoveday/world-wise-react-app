import styles from "./Button.module.css";
import PropTypes from "prop-types";

function Button({ children, onClick, type }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired, // Assuming city is an object, adjust the type accordingly
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default Button;
