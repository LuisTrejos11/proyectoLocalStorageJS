//variables 


const listaTweets = document.getElementById('lista-tweets');



//eventlisteners 
eventlisteners();

function eventlisteners(){
    // cuando se envia el formulario

    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}



// funciones 

// añadir tweet del formulario

function agregarTweet(e){
    e.preventDefault();

    //leer el valor del tweet 
     const tweet = document.getElementById('tweet').value;
    
     //crear boton de borrar
     const botonBorrar = document.createElement('a');
     botonBorrar.classList = 'borrar-tweet';
     botonBorrar.innerText= 'X';


     //crear elemento
     const li = document.createElement('li');
     li.innerText = tweet;
     // añade el boton de borrar al tweet
     li.appendChild(botonBorrar);
     //añade el li a la lista 
     listaTweets.appendChild(li);

     //agregar tweet localStorage 

     agregarTweetLocalStorage(tweet);

    
}
// elimina tweet del DOM
function borrarTweet(e){
    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
   

}
// agrega tweet al local storage
function agregarTweetLocalStorage(tweet){
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    console.log(tweets);
    // añadir tweet
    tweets.push(tweet);

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// comprobar que haya elementos en localstorage 
function obtenerTweetsLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

// cargar local storage en la lista 

function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

     tweets.forEach(function(tweet) {
         //crear boton de borrar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText= 'X';


        //crear elemento
        const li = document.createElement('li');
        li.innerText = tweet;
        // añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        //añade el li a la lista 
        listaTweets.appendChild(li);
     });
}
// eleminar tweet localstorage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    // elemina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    

    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });


    localStorage.setItem('tweets', JSON.stringify(tweets));
}