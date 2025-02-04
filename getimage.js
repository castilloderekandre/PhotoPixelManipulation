function setImage() {
  const file = MyApp.imageUpload.files[0]; //Gets element where image was uploaded duh. Gets first file because we're not uploading multiple images, just one.
  if (!file) { console.log("File from imageUpload is null! Aborting! ", file); return; }
  
  const image = MyApp.sharedImage;
  if (!image) { console.log("Shared Image is null! Aborting! ", image); return; }

  readDataIntoImage(file, image);
}

function readDataIntoImage(file, image) {
  const reader = new FileReader(); //FileReader to transform data into Data URL
  reader.addEventListener(
    'load', 
    () => { 
      console.log("I EXECTUED UPON \'FileReader\' \'load\' EVENT!");
      
      image.src = reader.result;
      const previewImage = document.getElementById('imagePreview');
      previewImage.src = reader.result;
    },
  ); //Adds event to execute upon finishing the ".readAsDataURL(file)". Sets image source as reader result

  reader.onerror = (error) => {
    console.error("Failed to read file! ", error);
  }

  reader.readAsDataURL(file);
}

function handleImageUploadChange() {
  setImage();
}