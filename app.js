let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
    }
})

const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina <1000 ) {
    pagina += 1;
    cargarPeliculas();
    }
})

const cargarPeliculas = async() => {

    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=49016d3c6437b51b028ca05de71d9902&=es-PE&page=${pagina}`);

        console.log(respuesta);

        if(respuesta.status == 200){
            const datos = await respuesta.json();
            
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class='poster' src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 id="title">${pelicula.title}</h3>
                </div>
                ` ;
/*                 <div class="row">
                <div class="col-md-12">
                    <h2>Películas</h2>
                    <div class="col-md-3 mt-3">
                        <img class='card-img-top mt-2' width='100' height='250' src="img/2.png" alt="">
                        <h3 id="title"></h3>
                    </div>
                    
                </div> */
            });

            document.getElementById('container').innerHTML = peliculas

        }else if(respuesta.status == 401){
                console.log('Error en la llave');
            }else if(respuesta.status == 404){
                console.log('La pelicula no existe');
            }else{
                console.log('Hubo un error desconocido');
            }

    }catch(error){
        console.log(error)
    }

}

cargarPeliculas();
