import latestVersion from "latest-version";

export const checkGitUrl = (url: string) => {
  return new Promise((resolve, reject) => {
    if (url.endsWith(".git")) {
      resolve(true);
    } else {
      reject("url error");
    }
  });
};

export const checkNpmUrl = (name: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const lastVersion = await latestVersion(name);
      resolve(lastVersion);
    } catch (error) {
      reject("packege not found!");
    }
  });
};
