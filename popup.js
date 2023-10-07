chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "showDogVisionImage") {
      const serializedImageData = request.imageData;
      // Convert the serialized image data back to ImageData
      const imageData = deserializeImageData(serializedImageData);
      console.log(`receive data length ${imageData.data.length}`)

      // Get the <img> element by its ID
      const imgElement = document.getElementById("dogVisionImage");

      // Create a new canvas to display the modified image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = imageData.width;
      canvas.height = imageData.height;

      ctx.putImageData(imageData, 0, 0);

      // Set the canvas as the source for the <img> element
      imgElement.src = canvas.toDataURL();
  }
});

// Function to deserialize the serialized image data
function deserializeImageData(serializedImageData) {
  const pixelData = new Uint8ClampedArray(serializedImageData.data);
  return new ImageData(pixelData, serializedImageData.width, serializedImageData.height);
}
