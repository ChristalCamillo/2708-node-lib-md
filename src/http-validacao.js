function extraiLinks(arrLinks) {
	return arrLinks.map((objetoLink => Object.values(objetoLink).join()))
}

//essa função/ objetido do arquivo, é validar(ou seja, ver se está no ar de acordo com o retorno dos protocolos https)
async function checaStatus(listaURLs) {
	// o promise.all recebe uma lista de promessas e as resolve cuspindo uma lista lidável pelo fetch
	const arrStatus = await Promise.all(
		listaURLs.map(async (url) => {
			//fetch só consegue lidar com um link por vez, então passar uma lista inteira n funciona
			const response = await fetch(url)
			return response.status;
		})
	)
	return arrStatus;
}


export default async function listaValidada(listaDeLinks) {
	const links = extraiLinks(listaDeLinks);
	const status = await checaStatus(links);
	console.log(status);
	return status;
}

//[gatinho salsicha](http://gatinhosalsicha.com.br/)