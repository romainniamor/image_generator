import { API_KEY } from "./config.js";
//3 RPM

const submitBtn = document.querySelector("#submit-btn");
const input = document.querySelector("input");
const imageList = document.querySelector(".image-list");

// requete auprès de l'api openai
async function getImages(event) {
  event.preventDefault();

  const url = "https://api.openai.com/v1/images/generations";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: input.value,
      n: 1,
      size: "256x256",
    }),
  };
  console.log("url:", url, "options:", options, "input:", input.value);
  try {
    const response = await fetch(url, options);
    console.log("response", response);
    const data = await response.json();
    console.log(data);

    if (data.data && data.data.length > 0) {
      data.data.forEach((element) => {
        const imgContainer = document.createElement("div"); // création d'un élément div pour contenir chaque image
        imgContainer.classList.add("image-container"); // ajout d'une classe "image-container" à chaque div
        const img = document.createElement("img"); // création d'un élément img pour chaque image
        img.setAttribute("src", element.url); // définition de l'attribut src de l'élément img pour l'URL de l'image
        imgContainer.append(img); // ajout de l'élément img à l'élément div
        imageList.append(imgContainer); // ajout de l'élément div à la liste d'images sur la page
      });
    } else {
      const errorMsg = document.querySelector(".error");
      errorMsg.textContent = "La génération d'images a échoué.";
      setTimeout(() => {
        errorMsg.textContent = "";
      }, "10000");
    }
  } catch (error) {
    console.error(error);
  }
}

submitBtn.addEventListener("click", getImages);
