const privateKey = 'f644dbad9a747ac0991e86e229b66a824aa1a778';
const publicKey = 'e252af329b37a9d3ea7eb95f68aff71d';
const maxCharacters = 1500;




function createHash(timeStamp) {

    const toBeHashed = timeStamp + privateKey + publicKey;
    const hashedMessage = md5(toBeHashed);
    return hashedMessage;

}

function getCharacterList() {
    const timeStamp = Date.now().toString();
    const offset = Math.floor((Math.random() * maxCharacters) + 1);
    const hash = createHash(timeStamp);

    
    const urlAPI = "http://gateway.marvel.com/v1/public/characters?limit=9&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            getImages(data);
        }
    };
    xhttp.open("GET", urlAPI, true);
    xhttp.send();
}


function showHistorys(elemento) {

    const codigo = elemento.parentNode.getElementsByTagName("h5")[1].textContent.substring(4, 11);
    console.log(codigo);
    const timeStamp = Date.now().toString();
    const hash = createHash(timeStamp);

    const urlAPI = "https://gateway.marvel.com/v1/public/characters/"+codigo+"/stories?ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
    console.log(urlAPI);
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            getHistorys(data);
        }
    };
    xhttp.open("GET", urlAPI, true);
    xhttp.send();

}
