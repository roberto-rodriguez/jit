const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const INCLUDE_PATTERN = /<include src="(.+)"\s*\/?>(?:<\/include>)?/gi;

const processNestedHtml = (content, loaderContext, dir = null) =>
  !INCLUDE_PATTERN.test(content)
    ? content
    : content.replace(INCLUDE_PATTERN, (m, src) => {
        const filePath = path.resolve(dir || loaderContext.context, src);
        loaderContext.dependency(filePath);
        return processNestedHtml(
          loaderContext.fs.readFileSync(filePath, "utf8"),
          loaderContext,
          path.dirname(filePath),
        );
      });

// -------------------------------------------------
// HTML generation
// -------------------------------------------------
const generateHTMLPlugins = () =>
  glob.sync("./src/*.html").map((file) => {
    const filename = path.basename(file);

    return new HtmlWebpackPlugin({
      filename,                    // index.html, about.html, etc
      template: file,
      favicon: "./src/images/favicon.ico",
      inject: "body",
      scriptLoading: "defer",
    });
  });

module.exports = {
  mode: "production",

  entry: "./src/js/index.js",

  // -------------------------------------------------
  // Output directly to Spring/Tomcat web root
  // -------------------------------------------------
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../src/main/webapp"),
  clean: {
    keep: /META-INF/,
  },

    // Keep assets flat and predictable for Tomcat
    assetModuleFilename: "[path][name][ext]",
    publicPath: "/",   // VERY IMPORTANT for Tomcat
  },

  // -------------------------------------------------
  // Dev server (local frontend dev only)
  // -------------------------------------------------
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },

      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          preprocessor: processNestedHtml,
        },
      },
    ],
  },

  plugins: [
    ...generateHTMLPlugins(),

    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
