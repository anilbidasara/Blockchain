"use strict";
class Monitoring {

	constructor (crypto,adapter) {
		this.crypto = crypto ;
		this.blockchainadapter = adapter;
	}

	//publishes the Data to the specified stream 
	publishData(req, res, next){    

		var self = this;
		
		// get body params 
		var key = req.body.key;              
		var data = req.body.data;
		var callerOrg = req.body.config;  
		var stream = req.body.stream;     //Name of stream where data is to be posted

		//convert the data to hex format
		var dataHex = this.crypto.utf8ToHex(JSON.stringify(data));

		//post the data to the specified stream
		self.blockchainadapter.publishDataToStream(callerOrg,stream,key,dataHex).then((result)=>{				
			res.status(200).json("Data posted successfully for "+key+" in the blockchain");
		}).catch((error)=>{
			res.status(500).json(error);
		})
	}

	//get all orders shared with caller
	getDataForKey(req, res, next){     

		var self = this;
		var key = req.body.key;                  
		var callerOrg = req.body.config;  
		var stream = req.body.stream;     //Name of stream where data is to be fetched
		
		self.blockchainadapter.getDataFromStream(callerOrg,stream,key).then((data)=>{

				for(var i=0;i<data.length; i++){
						data[i].data = this.crypto.hextoUTF8(data[i].data);
				}
				res.status(200).json(data);

		}).catch((error)=>{
			console.error("Error: ",error)
			res.status(500).json(error);
		})
	}
	
	//get all data from a specified stream
	getAllData(req, res, next){

		var self = this;      
        console.log("Request: " + req);
		console.log("config: " + req.body.config);
		var callerOrg = req.body.config;  
		var stream = req.body.stream;     //Name of stream where data is to be fetched	
	    console.log("Stream: " + stream);		
		
		//get all keys from stream, will cause performance issue hence get data by id should used where database of the caller org maintains list of keys in db
		self.blockchainadapter.getAllStreamItems(callerOrg,stream).then((data)=>{
			for(var i=0;i<data.length; i++){
						data[i].data = this.crypto.hextoUTF8(data[i].data);
				}
			res.status(200).json(data);

		}).catch((error)=>{		
			console.error("Error: ",error)
			res.status(500).json(error);
		})
	}

}
module.exports = Monitoring;