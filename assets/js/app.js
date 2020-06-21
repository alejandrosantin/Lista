//Variables
const listaTweets = document.getElementById('lista-tweets');




//Event Listener (Los pongo en una funcion para que no queden de forma global)

eventListeners();

function eventListeners() {
    //Cuando se envia el formulario (el tweet)
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);
    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}



//Funciones

//Añadir Tweet al formulario
function agregarTweet(e) {
    e.preventDefault();
    //Leer el valor del Tweet agregado
    const tweet = document.getElementById('tweet').value;
    //Despues de clickear en 'AGREGAR' limpio el campo
    if (tweet != '') {
        tweet.splice;
        document.querySelector('#tweet').value = '';
    }
    //Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    //Añado la clase
    botonBorrar.classList = 'borrar-tweet';
    //Añado texto
    botonBorrar.innerText = 'X';


    //Crear elemento y agregar su contenido a la lista de Tweets
    const li = document.createElement('li');
    //Luego al li le agrego el tweet que ya lei anteriormente
    li.innerText = tweet;
    //Agrego el enlace a del boton para borrar al li
    li.appendChild(botonBorrar);
    //Agrego al DOM el li
    listaTweets.appendChild(li);

    //Agregar a Local Storage
    agregarTweetLocalStorage(tweet);
}
//Elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        //Aca es donde quiero eliminar el tweet del localStorage
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//Mostrar datos de Local Storage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        const botonBorrar = document.createElement('a');
        //Añado la clase
        botonBorrar.classList = 'borrar-tweet';
        //Añado texto
        botonBorrar.innerText = 'X';

        //Crear elemento y agregar su contenido a la lista de Tweets
        const li = document.createElement('li');
        //Luego al li le agrego el tweet que ya lei anteriormente
        li.innerText = tweet;
        //Agrego el enlace a del boton para borrar al li
        li.appendChild(botonBorrar);
        //Agrego al DOM el li
        listaTweets.appendChild(li);
    });
}

//Agrega tweet a Locas Storage
function agregarTweetLocalStorage(tweet) {
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet con push para agregarlo al arreglo
    tweets.push(tweet);
    //Convertir de string a arreglo para agregarlo al Local Storage
    //stringify convierte JSON a string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Comprobar que haya elementos en el Local Storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    //Revisamos los valores de Local Storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Borrar tweet de Local Storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    //Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });
    //Lo quito del local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}