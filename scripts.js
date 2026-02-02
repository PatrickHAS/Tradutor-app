let inputTexto = document.querySelector(".input-texto");
let traducaoTexto = document.querySelector(".traducao");
let selectIdioma = document.querySelector(".idioma");

async function traduzir() {
  let idiomaDestino = selectIdioma.value;

  let url =
    "https://api.mymemory.translated.net/get?q=" +
    encodeURIComponent(inputTexto.value) +
    "&langpair=pt-BR|" +
    idiomaDestino;

  let resposta = await fetch(url);

  let dados = await resposta.json();

  traducaoTexto.innerText = dados.responseData.translatedText;
}

function ouvirVoz() {
  let voz = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Reconhecimento de voz não suportado neste navegador");
    return;
  }

  let reconhecimento = new voz();

  reconhecimento.lang = "pt-BR";

  reconhecimento.onresult = (evento) => {
    let texto = evento.results[0][0].transcript;
    inputTexto.value = texto;
    traduzir();
  };

  reconhecimento.onerror = (e) => {
    console.error("Erro no microfone:", e.error);
  };

  reconhecimento.start();
}
