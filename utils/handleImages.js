const { Octokit } = require("@octokit/rest");
const { TOKEN_ACCESS } = require("../config/config.js");
const fs = require("fs");
const path = require("path");

const octokit = new Octokit({
  auth: TOKEN_ACCESS,
});

const owner = "SanteriaChacabuco";
const repo = "imagesSanteria";
const PATH = path.resolve(".");

const saveImage = (fileName) => {
  const pathImglocal = path.join(PATH, "storage", fileName);
  const pathImg = fileName;
  console.log(pathImglocal)
  console.log(pathImg)
  const message = "Agregar imagen";
  const content = fs.readFileSync(pathImglocal).toString("base64");
  octokit.repos
    .createOrUpdateFileContents({
      owner,
      repo,
      pathImg,
      message,
      content,
      "Content-Type": "application/json"
    })
    .then((response) => {
      console.log(
        "Archivo subido exitosamente:",
        response.data.content.html_url
      );
    })
    .catch((error) => {
      console.error("Error al subir el archivo:", error);
    });
};

const deleteImage = (fileName) => {
  const pathImg = fileName
  const message = "Eliminar imagen";
  let sha = "";

  octokit.repos
    .getContent({
      owner,
      repo,
      pathImg,
    })
    .then((response) => {
      sha = response.data.sha;

      return octokit.repos.deleteFile({
        owner,
        repo,
        path,
        message,
        sha,
      });
    })
    .then((response) => {
      console.log(
        "Archivo eliminado exitosamente:",
        response.data.content.html_url
      );
    })
    .catch((error) => {
      console.error("Error al eliminar el archivo:", error);
    });
};

module.exports = {saveImage, deleteImage};
