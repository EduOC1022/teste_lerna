const path = require("path");
const glob = require("glob");

// Lista todos os arquivos JavaScript dentro de src/utilitarios e seus subdiretórios
const jsFiles = glob.sync("./**/*.js", { 
  cwd: __dirname,
  ignore: "**/webpack.config.js"
});

// Cria um objeto de entradas com base nos arquivos encontrados
const entries = {};
jsFiles.forEach((file) => {
  const relativePath = path.relative(__dirname, file); // Caminho relativo dentro de utilitarios
  const fileName = relativePath.replace(/\.js$/, ""); // Remove a extensão.js do nome do arquivo
  entries[fileName] = `./${file}`;
});

module.exports = {
    mode: "development",
    entry: entries,
    output: {
      filename: (pathData) => {
        // Usa a estrutura original dos diretórios
        return `${pathData.chunk.name}.js`;
      },
      libraryTarget: "commonjs2", // Exporta como CommonJS
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      preferRelative: true, // This should help with resolving issues
    },
    module: {
      rules: [
        {
          test: /\.m?js$/, // Expressões regulares para arquivos JS
          exclude: /(node_modules)/, // Exclui node_modules
          use: {
            loader: "babel-loader", // Usa o babel-loader
            options: {
              presets: ["@babel/preset-env"], // Preset para transpilar para CommonJS
            },
          },
        },
      ],
    },
  };

/// Anotação = fazer um bundler para o utilitarios