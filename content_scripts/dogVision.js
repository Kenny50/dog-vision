function imgprocess(pixels) {
    const width = pixels.width;
    const height = pixels.height;
  
    // Calculate the average brightness of the input image
    let sumRed = 0;
    let sumGreen = 0;
    let sumBlue = 0;
  
    for (let i = 0; i < pixels.data.length; i += 4) {
      sumRed += pixels.data[i];
      sumGreen += pixels.data[i + 1];
      sumBlue += pixels.data[i + 2];
    }
  
    const averageBrightness =
      (sumRed * 0.30 + sumGreen * 0.59 + sumBlue * 0.11) /
      (width * height);
  
    // Loop through each pixel in the image and apply the dog vision calculations
    for (let i = 0; i < pixels.data.length; i += 4) {
      const red = pixels.data[i];
      const green = pixels.data[i + 1];
      const blue = pixels.data[i + 2];
  
      // Calculate the dog vision values
      const dogBlue = blue;
      const dogRed = (green + red) / 2;
      const dogGreen = dogRed;
  
      // Apply the average brightness compensation
      pixels.data[i] = (dogRed + averageBrightness) / 2;
      pixels.data[i + 1] = (dogGreen + averageBrightness) / 2;
      pixels.data[i + 2] = (dogBlue + averageBrightness) / 2;
    }
  
    // Send back the modified pixel data to the calling script
    return pixels;
  }
  