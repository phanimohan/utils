/**
{
  "api": 1,
  "name": "Gunzip & Format Payload",
  "description": "Unzip dynamogolia payload",
  "author": "Phani Mohan. Y",
  "icon": "broom",
  "tags": "payload,unzip",
}
**/

const pako = require('pako');
const { atob } = require('@boop/base64')

function gunzipString(str) {
  if (str === "") {
    throw new Error("Invalid text :(");
  } else {
    // Decode base64 (convert ascii to binary)
    var strData = atob(str);

    // Convert binary string to character-number array
    var charData = strData.split('').map(function(x){return x.charCodeAt(0);});

    // Turn number array into byte-array
    var binData = new Uint8Array(charData);

    // Pako magic
    var data = pako.inflate(binData);

    // Convert gunzipped byteArray back to ascii string:
    var strData = String.fromCharCode.apply(null, new Uint16Array(data));

    return strData;
  }
}

function main(input) {
  try {
    const payload = gunzipString(input.text);
    input.text = JSON.stringify(JSON.parse(payload), null, 2);
    input.postInfo("Done!");
  } catch (e) {
    input.postError(e.message);
  }
}
