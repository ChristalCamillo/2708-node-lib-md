// NAO ESQUECER DE BOTAR .JS NO NODE
//O que é CLI? De uma forma simples, a sigla significa Interface de Linha de Comando. 
//Ele é um programa que permite que os usuários digitem comandos de texto dando instruções a um computador para fazer funções específicas.

import pegaArquivo from './index.js';
import chalk from 'chalk';
import fs from 'fs';
import listaValidada from './http-validacao.js';

const caminho = process.argv;

// o identificador é uma propriedade criada para nomear os arquivos que são links
//iniciamos a var vazia para, em situ de leitura de arquivo, não aparecer "undefined"
function imprimeLista(valida, resultado, identificador = '') {
	if(valida){
		  console.log(
    chalk.yellow('lista validada'),
    chalk.black.bgGreen(identificador),
    listaValidada(resultado));
	} else {
		  console.log(
    chalk.yellow('lista de links'),
    chalk.black.bgGreen(identificador),
    resultado);
	}
}

async function processaTexto(argumentos) {
	const caminho = argumentos[2];
	//dessa forma, valida será sempre true or false
	const valida = argumentos[3] === '--valida';

	try {
		//qualquer caminho incorreto que for recebido vai gerar erro
		fs.lstatSync(caminho);
	} catch (erro) {
		if (erro.code === 'ENOENT') {
			console.log('arquivo ou diretório não existe');
			// esse return sozinho serve pro usuario não ter q ver o objeto inteiro
			return
		}
	}

	if (fs.lstatSync(caminho).isFile()) {
		const resultado = await pegaArquivo(argumentos[2]);
		imprimeLista(valida, resultado);
	} else if (fs.lstatSync(caminho).isDirectory()) {
		const arquivos = await fs.promises.readdir(caminho)
		arquivos.forEach(async (nomeDeArquivo) => {
			const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
			imprimeLista(valida, lista, nomeDeArquivo)
		})
	}
}

processaTexto(caminho);

// NO TERMINAL: node src/cli.js ./arquivos/texto.md
// após o script: npm run cli ./arquivos/