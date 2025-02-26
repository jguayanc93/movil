const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();


// recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "es-ES";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

/////////////////buscar producto segun audio
document.getElementById("voz-cliente").addEventListener('mouseover',()=>{
    console.log("escuchando");
    recognition.start();
})

document.getElementById("voz-cliente").addEventListener('mouseleave',()=>{
    console.log("finalisando la escucha");
    recognition.onspeechend =()=>{
        recognition.stop();
    }
})

recognition.onresult=(event)=>{
    const escuchado = event.results[0][0].transcript;
    document.getElementById("busqueda").value=escuchado;
    console.log(`transcrito ${escuchado}`)
    console.log(`confiansa de ecucha ${event.results[0][0].confidence}`)
}

recognition.onerror = (event)=>{
    console.log("error con la reconocimiento de voz")
    console.log(event.error)
}