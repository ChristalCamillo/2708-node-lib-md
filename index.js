import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  //o ... spread opeator abre os objetos retornados pelo matchAll
  const capturas = [...texto.matchAll(regex)];
  //o map percorre o array e retorna outro
  const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
  return resultados;
}


function trataErro(erro) {
	throw new Error(chalk.red(erro.code, 'ARQUIVO INEXISTENTE'));
}

//acessar um texto fora do arquivo e mostrar no terminal
//async/await
//finally opcional, bloco de codigo que sempre será executado
async function pegaArquivo(path) {
	try {
		const encoding = 'utf-8';
		const texto = await fs.promises.readFile(path, encoding)
		console.log(extraiLinks(texto));
	} catch (erro) {
		trataErro(erro);
	} finally {
		console.log(chalk.yellow('operação concluída'));
	}
}

// promessas com then
// function pegaArquivo(path){
// 	const encoding = 'utf-8';
// 	funçoes encadeadas após o promise
// 	fs.promises
// 	.readFile(path, encoding)
// 	.then((texto) => console.log(chalk.green(texto)))
// 	.catch(trataErro)
// }

pegaArquivo('./arquivos/texto.md');