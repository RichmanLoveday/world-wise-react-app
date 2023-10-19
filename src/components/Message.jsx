import styles from "./Message.module.css";
import PropTypes from "prop-types";

function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired, // Assuming city is an object, adjust the type accordingly
};

export default Message;
