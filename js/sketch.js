/***********************************************
 * 
 * Sneaky, sneaky. 
 * 
 ************************************************/ 

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(hl.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

const suitColors = {
  spades: "#1A1919",
  clubs: "#1A1919",
  hearts: "#F24822",
  diamonds: "#F24822",
};

function getColorForsuit(suit) {
  return suitColors[suit] || "#F24822";
}

function createSvgPath(attributes) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  Object.keys(attributes).forEach((key) => {
    path.setAttribute(key, attributes[key]);
  });
  return path;
}

function getIconForsuit(suit) {
  const svgAttributes = {
    spades: { width: "21", height: "24", viewBox: "0 0 21 24" },
    hearts: { width: "20", height: "23", viewBox: "0 0 20 23" },
    diamonds: { width: "20", height: "21", viewBox: "0 0 20 21" },
    clubs: { width: "20", height: "22", viewBox: "0 0 20 22" },
  };

  const paths = {
    spades: {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M15.1987 18.4534C19.0674 18.5033 21.4473 15.6566 20.1382 12.6601C18.8292 9.66359 17.5241 8.98941 15.4692 6.81696C13.4133 4.64451 10.4238 0.886434 10.4379 9.8632e-08C10.453 0.886434 7.58663 4.64451 5.53069 6.81696C3.47577 8.98941 2.17176 9.66359 0.861691 12.6601C-0.447365 15.6566 1.93356 18.5033 5.80118 18.4534C8.45664 18.419 9.65164 16.667 10.1391 15.5716L10.1391 17.0052C10.1391 17.0052 9.29133 22.1765 3.30822 22.7426L2.35444 22.7426L2.35444 23.5484L18.6465 23.5484L18.6465 22.7426L17.6917 22.7426C11.7096 22.1765 10.8608 17.0052 10.8608 17.0052L10.8608 15.7598C11.4351 16.8564 12.6906 18.4209 15.1987 18.4534Z",
      fill: "#1A1919",
    },
    hearts: {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M14.6989 0.75236C10.8308 0.811816 10.0618 5.21556 10.0618 5.21556C10.0618 5.21556 9.16923 0.811816 5.30116 0.75236C1.43299 0.692809 -0.947437 4.08485 0.361833 7.65545C1.67101 11.226 2.97547 12.0294 5.03096 14.618C7.08637 17.2067 10.0767 21.6848 10.0618 22.7411C10.047 21.6848 12.9136 17.2067 14.9691 14.618C17.0246 12.0294 18.329 11.226 19.6382 7.65545C20.9474 4.08485 18.567 0.692809 14.6989 0.75236Z",
      fill: "#F24822",
    },
    diamonds: {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M0 10.3174L10 20.6349L20 10.3174L10 0L0 10.3174Z",
      fill: "#F24822",
    },
    clubs: {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M15.4219 7.42603C14.7988 7.42603 14.2051 7.56203 13.6637 7.80741C14.1721 7.00462 14.4704 6.03207 14.4704 4.98322C14.4704 2.23109 12.4206 0 9.89225 0C7.36385 0 5.31413 2.23109 5.31413 4.98322C5.31413 5.98181 5.58502 6.91096 6.04962 7.6906C5.58768 7.51997 5.09304 7.42603 4.57811 7.42603C2.04962 7.42603 0 9.65711 0 12.4092C0 15.1614 2.04962 17.3925 4.57811 17.3925C5.14914 17.3925 5.69535 17.2777 6.19947 17.0697C6.19938 17.0709 8.33008 16.4446 9.7307 13.6697V15.3405C9.7307 15.3405 9.01258 20.6071 3.94976 21.1836H3.14178V22.0043H16.93V21.1836H16.1221C11.0593 20.6071 10.3411 15.3405 10.3411 15.3405V13.7822C10.6019 14.4075 12.0443 17.4649 15.2859 17.389C15.3311 17.3902 15.3763 17.3925 15.4219 17.3925C17.9504 17.3925 20 15.1614 20 12.4092C20 9.65711 17.9504 7.42603 15.4219 7.42603Z",
      fill: "#1A1919",
    },
  };

  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = createSvgPath(paths[suit]);

  Object.entries(svgAttributes[suit]).forEach(([key, value]) => {
    svgElement.setAttribute(key, value);
  });
  svgElement.appendChild(path);
  return svgElement;
}

window.onload = function () {
  const { personalityDeck, rigidDeck } = deckOfCards;

  const adjective = document.querySelector("#adjective");
  const noun = document.querySelector("#noun");
  const rankAdjective = document.querySelectorAll(".rank-adjective");
  const rankNoun = document.querySelectorAll(".rank-noun");
  const suitAdjective = document.querySelectorAll(".suit-adjective");
  const suitNoun = document.querySelectorAll(".suit-noun");

  const updateCardContent = (element, deck, suitElement, rankElement) => {
    const randomCard = shuffle(deck)[0];

    element.innerHTML = randomCard.text;
    suitElement.forEach((item) => item.replaceChildren(getIconForsuit(randomCard.suit)));
    rankElement.forEach((item) => {
      item.innerHTML = randomCard.rank;
      item.style.color = getColorForsuit(randomCard.suit);
    });
  };

  const shuffleAdjectives = () => updateCardContent(adjective, personalityDeck, suitAdjective, rankAdjective);
  const shuffleNouns = () => updateCardContent(noun, rigidDeck, suitNoun, rankNoun);

  shuffleAdjectives();
  shuffleNouns();

  const cards = document.querySelectorAll(".card");

  setTimeout(() => {
    cards[0].classList.toggle("flip");
  }, 1000);

  setTimeout(() => {
    cards[1].classList.toggle("flip");
  }, 1500);

  setTimeout(() => {
    hl.token.capturePreview();
  }, 2000);
};




              
/***********************************************
 * 
 * I appreciate that you looked,
 * but I'm equally kinda horrified? 
 *  
 * I think we should make this a fair exchange, no?
 * 
 * Send me a book recommendation
 * Send me a fun lil secret
 * Send me a photo you've taken recently
 * Send me an essay on.. anything?
 * 
 * Go crazy. Or don't. We're friends now.
 *
 * Subject: Misunderstood Machines
 * sofia@artxcode.io
 * 
 *
 ************************************************/ 



/**
   * 
   * 
   *           _
      /b_,dM\__,_
    _/MMMMMMMMMMMm,
   _YMMMMMMMMMMMM(
  `MMMMMM/   /   \   _   ,    
   MMM|  __  / __/  ( |_|
   YMM/_/# \__/# \    | |_)arry
   (.   \__/  \__/     ___  
     )       _,  |    '_|_)
_____/\     _   /       | otter
    \  `._____,'
     `..___(__
              ``-.
                  \
              gnv  )



   HP was here */

  