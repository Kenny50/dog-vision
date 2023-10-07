// Handle file input
document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    const canvas = document.getElementById('originalCanvas');
                    const ctx = canvas.getContext('2d',{ willReadFrequently: true });
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0);

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    ctx.putImageData(imgprocess(imageData, true, true, true), 0, 0);
                    console.log(imageData == imgprocess(imageData, true, true, true))
                };
            };
            reader.readAsDataURL(file);
        }
    });
})