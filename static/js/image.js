var loadImage = function (event) {
    var reader = new FileReader();
    reader.onload = function () {
        var userImage = document.getElementById("user-image");
        userImage.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}