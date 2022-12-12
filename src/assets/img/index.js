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
  questionMark: require("./questionMark.png"),
  modalLogin_bgbox:
    tryRequire("./modalLogin_bgbox.png") || require("./questionMark.png"),
  modalLogin_Mask:
    tryRequire("./modalLogin_Mask.png") || require("./questionMark.png"),
  logo: tryRequire("./logo.png") || require("./logo.png"),
  return: tryRequire("./return.png") || require("./return.png"),
  modalLogin_IMAGE1:
    tryRequire("./modalLogin_IMAGE1.png") || require("./questionMark.png"),
};
