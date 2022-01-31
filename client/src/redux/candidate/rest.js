const login = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/login/candidate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      await response.json().then((res) => {
        localStorage.setItem("candidateToken", res.token);
        if (res.candidate) resolve(res.candidate);
        else reject(res.error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const register = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/register/candidate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      await response.json().then((res) => {
        if (res.candidate) resolve(res.candidate);
        else reject(res.error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const update = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/candidate/updateCompletionStatus", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("candidateToken"),
        },
        body: JSON.stringify(body),
      });

      await response.json().then((res) => {
        if (res.candidate) {
          localStorage.removeItem("candidateToken");
          resolve(res.candidate);
        } else reject(res.error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { login, register, update };
