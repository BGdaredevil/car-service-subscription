const user = localStorage.getItem(process.env.REACT_APP_TOKEN_LOCAL_STORAGE) || null;

const fetchWrap = async (url, options) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      let msg = await res.json();
      throw msg;
    }

    try {
      return await res.json();
    } catch (error) {
      return res;
    }
  } catch (err) {
    throw err;
  }
};

const getOptions = (method = "get", payload) => {
  const options = { method: method.toLowerCase(), headers: {}, credentials: "include" };
  if (user) {
    console.log(user);
    options.headers["X-Authorization"] = user;
  }

  if (payload) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(payload);
  }

  return options;
};

export const get = async (url) => fetchWrap(url, getOptions());
export const post = async (url, data) => fetchWrap(url, getOptions("post", data));
export const put = async (url, data) => fetchWrap(url, getOptions("put", data));
export const del = async (url) => fetchWrap(url, getOptions("delete"));
export const patch = async (url, data) => fetchWrap(url, getOptions("patch", data));

// console.log(user);
