/* eslint-disable import/no-anonymous-default-export */
const tryRequire = (path) => {
  try {
    const image = require(`${path}`);
    return image;
  } catch (err) {
    return false;
  }
};

export default {
  delete: tryRequire("./modalLogin_bgbox.png") || require("./delete.png"),
};
