// NAO ESQUECER DE BOTAR .JS NO NODE

import pegaArquivo from './index.js';
import chalk from 'chalk';

const path = process.argv;

//serve pra exibir os resultados
async function processaTexto(path){
	const resultado = await pegaArquivo(path[2]);
	console.log(chalk.yellow('lista de links'), resultado);

}

processaTexto(path);

// NO TERMINAL: node src/cli.js ./arquivos/texto.md