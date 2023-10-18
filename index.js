import chalk from 'chalk';
import fs from 'fs';

function trataErro(erro) {
	throw new Error(chalk.red(erro.code, 'ARQUIVO INEXISTENTE'));
}

//async/await
//finally opcional, bloco de codigo que sempre será executado
async function pegaArquivo(path) {
	try {
		const encoding = 'utf-8';
		const texto = await fs.promises.readFile(path, encoding)
		console.log(chalk.green(texto));
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
pegaArquivo('./arquivos/tex.md');