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
      const response = await fetch("/api/login/hr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      await response.json().then((res) => {
        if (res.status(200)) resolve(res.message);
        else reject(res.message);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { login, register, update };
