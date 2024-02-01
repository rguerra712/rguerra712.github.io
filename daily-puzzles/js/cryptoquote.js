var exports = exports || {};
var cryptoquote = cryptoquote || {};

(function (cryptoquote) {

	'use strict';
	cryptoquote.formatQuote = function (data) {
		let key = getKey();
		let quote = encrypt(data.quote, key);
		let author = encrypt(data.author, key);
		return `<p>${quote}</p><p><b>  -${author}</b></p>`;
	};

	function encrypt(text, key) {
		let oldChars = text.split('');
		let newChars = text.split('');
		for (let i = 0; i < 26; i++) {
			let oldCharIndex = 97 + i;
			let newCharIndex = 97 + key[i];
			let oldChar = String.fromCharCode(oldCharIndex);
			let newChar = String.fromCharCode(newCharIndex);
			for (let j = 0; j < oldChars.length; j++) {
				if (oldChars[j] === oldChar) {
					newChars[j] = newChar;
				}
				if (oldChars[j] === oldChar.toUpperCase()) {
					newChars[j] = newChar.toUpperCase();
				}
			}
		}
		return newChars.join('');
	}

	const lettersInAlphabet = 26;
	function getKey() {
		let a = [];
		for (let i = 0; i < lettersInAlphabet; ++i) a[i] = i;
		a = shuffle(a);
		while (verifyKeyValuesAreShifted(a) !== true) {
			a = shuffle(a);
		}
		return a;
	}

	function verifyKeyValuesAreShifted(keyCandidate) {
		for (let i = 0; i < lettersInAlphabet; i++) {
			if (keyCandidate[i] === i) {
				return false;
			}
		}
		return true;
	}


	// http://stackoverflow.com/questions/962802#962890
	function shuffle(array) {
		let tmp, current, top = array.length;
		if (top)
			while (--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}
		return array;
	}

	exports.getKey = getKey;
	exports.encrypt = encrypt;
})(cryptoquote);