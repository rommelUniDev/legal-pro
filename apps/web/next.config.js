const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  webpack: (config) => {
    config.resolve.alias["@ui"] = path.resolve(
      __dirname,
      "../../configs/ui/src"
    );
    return config;
  },
};
