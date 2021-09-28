/*
* 2C = Two of clubs 
* 2D = Two of diamonds
* 2H = Two of hearts 
* 2S = Two of spades 
*/



const miModulo = (() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];


    //referencias del HTML
    const btnPedir   = document.querySelector ('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');


    //console.log(puntosHTML);
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        //   divCartasJugador     = document.querySelector('#jugador-cartas'),
        //   divCartasComputadora = document.querySelector('#computadora-cartas'),
          puntosHTML = document.querySelectorAll ('small');


    //Esta funcion permite iniciar el juego
    const inicializarJuego = ( numeroJugadores = 2) => {
        deck = crearDeck();
        // console.log({numeroJugadores});
        puntosJugadores = [];
        for (let i = 0; i < numeroJugadores; i++){
            puntosJugadores.push(0);            
        }
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;

        // deck = [];
        // crearDeck();

        // puntosJugador = 0;
        // puntosComputadora = 0;

        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;

        // divCartasJugador.innerHTML = '';
        // divCartasComputadora.innerHTML = '';
        
        puntosHTML.forEach (elem =>  elem.innerText = 0);
        divCartasJugadores.forEach (elem  => elem.innerHTML = '');

    }

    //Esta función crea un nuevo deck
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i<=10; i++){        
            for (let tipo of tipos){
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos){
            for (let esp of especiales){
                deck.push(esp + tipo);
            }
        }

        //console.log(deck);
        // deck = _.shuffle(deck); //barajea con funcion suffle que viene en libreria underscore
        //console.log(deck);
        // return deck;

        //Código optimizado
        return _.shuffle(deck);

    }    

    //Esta funcion me permite tomar una carta
    const pedirCarta = ()=> {


        if(deck.length === 0){
            throw 'No hay cartas en el deck'
        }
        
        // const carta = deck.pop();
        // console.log({carta});
        // console.log(deck);
        // return carta;

        //Código optimizado
        return deck.pop();
    }


    // pedirCarta();

    const valorCarta = (carta)=>{

        const valor = carta.substring(0, carta.length-1);

        //Codigo optimizado
        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10
                : valor * 1 ;


        // let puntos = 0;
        // console.log({valor});
        // 1 =1 , 10=10, 3 =3
        // if(isNaN(valor)){
        //     puntos = (valor === 'A') ? 11 : 10;
        // } else {        
        //     puntos=valor*1;
        // }

        // console.log(puntos +5 );
    }

    // const valor = valorCarta(pedirCarta());
    // console.log({valor});


    //Acumular Puntos, turno: 0 = primer jugar y ultimo será la computadora 
    const acumularPuntos = ( carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append (imgCarta);
    }

    const determinarGanador = () =>{

        const [puntosMinimos,puntosComputadora] = puntosJugadores;

        setTimeout(()=>{
        
            if ( (puntosMinimos < puntosComputadora) && (puntosComputadora <=21 )){
                alert('Perdiste');
            } else if( (puntosMinimos < puntosComputadora) && (puntosMinimos <= 21 )){
                alert('Ganaste');
            } else if ( (puntosMinimos> 21 )){
                alert('Perdiste');
            } else if ( puntosMinimos === puntosComputadora){
                alert ('Empate');
            }

        },100)
    }

    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) =>{

        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
            crearCarta(carta, puntosJugadores.length -1);    

            if (puntosMinimos > 21){
                break;
            }
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    //Eventos

    btnPedir.addEventListener( 'click', () => { 

        const carta = pedirCarta();
        //console.log(carta);
        // puntosJugador = puntosJugador + valorCarta( carta );
        // console.log(puntosJugador);
        // puntosHTML[0].innerText = puntosJugador;

        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta (carta, 0);

        //  <img class="carta" src="assets/cartas/2C.png">
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // divCartasJugador.append (imgCarta);

        if (puntosJugador > 21){
            console.warn('PERDISTE');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if (puntosJugador === 21 ){
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    //Detener turno del jugador
    btnDetener.addEventListener( 'click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })


    //Resetear el juego
    btnNuevo.addEventListener('click', () => {

        console.clear();
        inicializarJuego();        
    });


    //TODO:borrar;
    // turnoComputadora(20);

    return {
        nuevoJuego: inicializarJuego
    }

}) ();


