require('dotenv').config();
const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });
const exec = require('child_process').execFile;

const directoryPath =
  prompt('Insira o path raiz de onde quer rodar o script: ') ||
  process.env.DIRECTORY_PATH;

const filesPath =
  prompt('Insira o path raiz de onde estão os arquivos:  ') ||
  process.env.FILES_PATH;

fs.readdir(filesPath, function (err, files) {
  if (err) {
    return console.log('Não foi possível verificar o diretório ' + err);
  }
  console.log();
  files.forEach(function (file) {
    executarScript(directoryPath, filesPath, file);
  });
});

function executarScript(directoryPath, filesPath, fileName) {
  exec(directoryPath + '\\PsbDecompile.exe ', [filesPath + '\\' + fileName]);
  console.log('Arquivo: ' + fileName + ' extraído com sucesso.');
}
