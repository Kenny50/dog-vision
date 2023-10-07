chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "simulateDogVision") {
    const imageUrl = message.imageUrl;
    // Perform the dog vision simulation logic here
    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable CORS for the image
    img.src = imageUrl;

    // Once the image is loaded, perform the dog vision simulation
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Apply the dog vision simulation using your imgprocess function
      const modifiedImageData = imgprocess(
        imageData,
        /* Pass your simulation parameters here: deuter, decbright, decac */
        true,  // Example: Apply deuteranopia effect
        true,  // Example: Apply decreased brightness discrimination effect
        true      // Example: Set the factor to reduce visual acuity
      );

      // Convert the modified image data to a format that can be serialized
      const serializedImageData = serializeImageData(modifiedImageData);
        // Send the serialized image data back to the extension popup
      chrome.runtime.sendMessage({ action: "showDogVisionImage", imageData: serializedImageData });
    }
  }
});

// Function to serialize ImageData to an array of pixel values
function serializeImageData(imageData) {
  return {
    width: imageData.width,
    height: imageData.height,
    data: Array.from(imageData.data),
  };
}