module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./"],
          "alias": {
            "@app": "./src",
            "@assets": "./assets",
            "@components": "./src/components",
            "@containers": "./src/containers",
            "@constants": "./src/constants",
            "@styles": "./src/styles",
            "@utils": "./src/utils"
          }
        }
      ]
    ]
  };
};
