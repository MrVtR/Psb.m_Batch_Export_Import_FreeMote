require('dotenv').config();
const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });
const exec = require('child_process').execFile;
const chalk = require('chalk');

console.log(
  chalk.yellow(
    'Bem vindo a interface de uso do app FreeMote, para extrair e importar todos os arquivos Psb.m de uma determinada pasta.\nTemos as seguintes opções de uso:\n1: Extrair arquivos Psb.m\n2: Importar arquivos Psb.m\n',
  ),
);
const option = prompt('Digite a seguir qual opção quer utilizar no programa: ');

const directoryPath =
  prompt('Insira o path raiz de onde quer rodar o script: ') ||
  process.env.DIRECTORY_PATH;

const filesPath =
  prompt('Insira o path raiz de onde estão os arquivos:  ') ||
  process.env.FILES_PATH;

switch (option) {
  case '1':
    fs.readdir(filesPath, function (err, files) {
      if (err) {
        return console.log('Não foi possível verificar o diretório ' + err);
      }
      console.log();
      files.forEach(function (file) {
        exportPsbFiles(directoryPath, filesPath, file);
      });
      console.log(
        chalk.green(
          'Extração concluída, espere o programa finalizar, criando novos arquivos!',
        ),
      );
    });
    break;
  case '2':
    fs.readdir(filesPath, function (err, files) {
      if (err) {
        return console.log('Não foi possível verificar o diretório ' + err);
      }
      console.log();
      const outputFolder = filesPath + '\\out';
      fs.mkdirSync(outputFolder, { recursive: true });
      process.chdir(outputFolder);

      files.forEach(function (file) {
        if (!file.includes('.resx') && file.endsWith('.json'))
          importPsbFiles(directoryPath, filesPath, file);
      });
      console.log(
        chalk.green(
          'Importação concluída,espere o programa finalizar agora, criando novos arquivos!',
        ),
      );
      exec('explorer.exe', [outputFolder]);
    });
    break;
  default:
    console.error('Opção inválida!');
}

function exportPsbFiles(directoryPath, filesPath, fileName) {
  exec(directoryPath + '\\PsbDecompile.exe ', [filesPath + '\\' + fileName]);
  console.log('Arquivo: ' + fileName + ' extraído com sucesso.');
}
function importPsbFiles(directoryPath, filesPath, fileName) {
  exec(directoryPath + '\\PsBuild.exe ', [filesPath + '\\' + fileName]);
  console.log('Arquivo: ' + fileName + ' importado com sucesso.');
}
