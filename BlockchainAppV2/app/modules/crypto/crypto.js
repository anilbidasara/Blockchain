"use strict";
class Crypto {

	constructor () {
		
	}
	genSymKey(object){

		var hash = new keccak()
		hash.update(object);
		var objectHash = hash.digest('hex')
		return objectHash;
	}
	utf8ToHex(data){
		
		return new Buffer(data).toString('hex');
	}
	hextoUTF8(hexdata){

		return new Buffer(hexdata, 'hex').toString('ascii')
	}
	symmetricEncryption(data,symkey){

		var cipher = crypto.createCipher('aes192', symkey);
		var encrypteddata = cipher.update(data, 'utf8', 'hex');
		encrypteddata += cipher.final('hex');
		return encrypteddata;
	}
	symmetricDecryption(encDataHex,symkey){

		var decipher = crypto.createDecipher('aes192', symkey.trim());
		var decryptedData = decipher.update(encDataHex, 'hex', 'utf8');
		decryptedData += decipher.final('utf8');
		return decryptedData;
		
	}
	asymmetricEncryption(data,pubkey){

		var encryptedData = pubkey.encrypt(data, 'base64');
		var encryptedDataHex = new Buffer(encryptedData).toString('hex');
		return encryptedDataHex;

	}
	getPublicKeyFromHex(publicKeyHex){

		var publicKey = new Buffer(publicKeyHex, 'hex').toString('ascii')
		var public_key = new nodersa();
		public_key.importKey(publicKey, 'pkcs8-public-pem');
		return public_key;
	}
	getPrivateKeyFromHex(privateKeyHex){
		var privateKey = new Buffer(privateKeyHex, 'hex').toString('ascii')
		var private_key = new nodersa();
		private_key.importKey(privateKey, 'pkcs8-private-pem');
		return private_key;
	}

	asymmetricDecryption(encDataHex,privkey){

		var dataEncrypted = new Buffer(encDataHex, 'hex').toString('ascii')
		var decryptedData = privkey.decrypt(dataEncrypted, 'utf-8');
		return decryptedData;
	}


}
module.exports = Crypto;