const { default: axios } = require("axios");
const { readFile } = require("fs");

const baseURL = "http://na1.blackforthosting.com:25010/api/v1";

function testUpload() {
  try {
    // Assuming createReadStream comes from somewhere like fs module
    readFile("resturant.png", async (err, data) => {
      if (err) throw err;

      const formData = new FormData();

      formData.append("file", new Blob([data]), "resturant.png");
      const response = await axios.post(`${baseURL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Response:", response.data);
    });
  } catch (error) {
    console.error("Upload Error:", error.response.data);
  }
}

testUpload();
