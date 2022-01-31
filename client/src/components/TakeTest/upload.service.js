// const blobToBase64 = (blob) => {
//   const reader = new FileReader();

//   reader.addEventListener("load", () => {
//     const dataUrl = reader.result;
//     const base64EncodedData = dataUrl.split(",")[2];
//     // console.log(dataUrl);
//     console.log(base64EncodedData);
//     uploadBlob(base64EncodedData);
//   });

//   reader.readAsDataURL(blob);
// };

const uploadBlob = async (base64EncodedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = JSON.stringify({
        data: base64EncodedData,
      });
      //   console.log(body);
      const response = await fetch("/api/uploadToAzureBlob", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("candidateToken"),
        },
        body,
      });

      await response.json().then((res) => {
        if (res.message) resolve(res.message);
        else reject(res.error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { uploadBlob };
