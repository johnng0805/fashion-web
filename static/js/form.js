window.onload = function () {
    var form = document.getElementById("user-form");

    form.onsubmit = function (event) {
        event.preventDefault();

        var formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            var imgPaths = data.img_paths;
            var imgContainer = document.getElementById("result-image-container");

            imgPaths.forEach(function (imgPath) {
                var img = document.createElement("img");
                img.src = imgPath;
                imgContainer.appendChild(img);
            });
        }).catch(function (error) {
            console.error(error);
        });
    }
}