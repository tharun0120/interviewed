const login = (body) => {
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
        if (res.hr) {
          localStorage.setItem("token", res.token);
          resolve(res.hr);
        } else reject(res.error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const register = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/register/hr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      await response.json().then((res) => {
        console.log(res);
        if (res.hr) {
          localStorage.setItem("token", res.token);
          resolve(res.hr);
        } else reject(res.error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const logout = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/logout/hr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });

      await response.json().then((res) => {
        if (res.message) {
          localStorage.removeItem("token");
          resolve(res.message);
        } else reject(res.error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const fetchCandidates = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/candidates", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      await response.json().then((res) => {
        if (res.candidates) {
          // console.log(res.candidates);
          resolve(res.candidates);
        } else reject(res.error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { login, register, logout, fetchCandidates };
