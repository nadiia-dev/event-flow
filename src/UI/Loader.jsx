import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.container}>
      <ClipLoader color="#f6ad1b" size={60} />
    </div>
  );
};

export default Loader;
