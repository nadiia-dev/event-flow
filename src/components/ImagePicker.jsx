import { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";

const ImagePicker = ({ label, name, image }) => {
  const [pickedImage, setPickedImage] = useState("");

  const imageInput = useRef(null);
  const handlePickClick = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPickedImage("");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result !== null) {
        setPickedImage(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage !== "" ? (
            <img src={pickedImage} alt="The image selected by the user." />
          ) : image !== "" ? (
            <img src={image} alt="The image selected by the user." />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
