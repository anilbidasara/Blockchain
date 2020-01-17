module.exports = function (app) {

    //crypto module to perform crytograohic operations
    var Crypto = require('./modules/crypto/crypto.js')
    var cryptoOperations =  new Crypto()

    //blochain operations adapter
    var BlockchainAdapter = require('./modules/blockchain_adapter/adapter.js')
    var blockchainOperations = new BlockchainAdapter();
    
    //Data Post/Get operations without Encryption logic

    var Monitoring = require('./modules/business_adapter/monitoring/monitoring.js')
    var monitoringOperations = new Monitoring(cryptoOperations,blockchainOperations);
    app.get('/getData/:key', monitoringOperations.getDataForKey.bind(monitoringOperations));
    app.post('/publishData', monitoringOperations.publishData.bind(monitoringOperations));
	app.get('/getAllData', monitoringOperations.getAllData.bind(monitoringOperations));

};
