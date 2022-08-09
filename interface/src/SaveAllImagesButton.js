import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button } from "@material-ui/core";
import { saveAs } from 'file-saver';

// require it
const JSZip = require("jszip");

// button styles
const useStyles = () => ({
  button: {
    marginTop: "20px",
  },
});


const SaveAllImagesButton = ({ classes,  generatedImages, generatedImagesFormat, promptText }) => {

    let zip = new JSZip();

    function handleButtonClick(event) {

        // 1 - loop through all the generatedImages     
        generatedImages.forEach(function (imageBinary, index) {
            zip.file(`${promptText}_${++index}.${generatedImagesFormat}`, imageBinary, { base64: true});
        })

        console.log("Generating an zip package")

        // 2 - form the zip file
        zip.generateAsync({type:"blob"})
        .then(content => saveAs(content, `${promptText}.zip`));
            
    }

  return (
    <Button className={classes.button} variant="contained" color="primary" onClick={handleButtonClick}>
      Save All Images (zip)
    </Button>
  );
};

export default withStyles(useStyles)(SaveAllImagesButton);
