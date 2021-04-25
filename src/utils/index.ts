export const checkUrl = (url: string) => {
  return new Promise((resolve, reject) => {
    if (url.endsWith(".git")) {
      resolve(true);
    } else {
      reject("url error");
    }
  });
};
