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
      findOrCreateDialog(modifiedImageData);
    }
  }
});


function findOrCreateDialog(imageData) {
  let dialog = document.getElementById("dogVisionDialog");

  if (!dialog) {
    // Create a new dialog if it doesn't exist
    dialog = document.createElement("div");
    dialog.id = "dogVisionDialog";
    dialog.style.position = "fixed";
    dialog.style.top = "0";
    dialog.style.left = "0";
    dialog.style.width = "100%";
    dialog.style.height = "100%";
    dialog.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    dialog.style.display = "flex";
    dialog.style.justifyContent = "center";
    dialog.style.alignItems = "center";
    dialog.style.zIndex = "9999";
    document.body.appendChild(dialog);
  } else {
    // Clear the existing content
    dialog.innerHTML = "";
  }

  const canvasInDialog = document.createElement("canvas");
  canvasInDialog.width = imageData.width;
  canvasInDialog.height = imageData.height;
  const ctxInDialog = canvasInDialog.getContext("2d");
  ctxInDialog.putImageData(imageData, 0, 0);

  dialog.appendChild(canvasInDialog);

  // Close the dialog when clicking anywhere on it
  dialog.addEventListener("click", function () {
    document.body.removeChild(dialog);
  });
}