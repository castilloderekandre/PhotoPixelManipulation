function setImage() {
  const file = MyApp.imageUpload.files[0]; //Not uploading multiple images.
  if (!file) { console.log("File from imageUpload is null! Aborting! ", file); return; }
  
  const image = MyApp.sharedImage;
  if (!image) { console.log("Shared Image is null! Aborting! ", image); return; }

  readDataIntoImage(file, image);
}

function readDataIntoImage(file, image) {
  const reader = new FileReader();
  reader.addEventListener(
    'load', 
    () => { 
      console.log("I EXECTUED UPON \'FileReader\' \'load\' EVENT!");
      
      image.src = reader.result;
      const previewImage = document.getElementById('imagePreview');
      previewImage.src = reader.result;
    },
  );

  reader.onerror = (error) => {
    console.error("Failed to read file! ", error);
  }

  reader.readAsDataURL(file);
}

function handleImageUploadChange() {
  setImage();
}