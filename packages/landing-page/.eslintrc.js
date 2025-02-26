const path = require("path");

module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    // your rules here
  },
  entry: "./src/pages/_app.tsx", // Adjust the entry point as needed
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
