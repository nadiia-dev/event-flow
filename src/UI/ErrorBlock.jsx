import classes from "./ErrorBlock.module.css";

const ErrorBlock = ({ title, message }) => {
  return (
    <div className={classes.error_block}>
      <div className={classes.error_block_icon}>!</div>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorBlock;
