import chalk from 'chalk';
import fs from 'fs';

function trataErro(erro){
	throw new Error(chalk.red(erro.code, 'ARQUIVO INEXISTENTE'));
}

function pegaArquivo(path) {
	const encoding = 'utf-8';
	fs.readFile(path, encoding, (erro, texto) => {
		if(erro) {
			trataErro(erro);
		}
		console.log(chalk.green(texto));
	})
}

pegaArquivo('./arquivos/texto.md');