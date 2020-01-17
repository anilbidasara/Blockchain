"use strict";
class BlockchainAdapter {

	constructor () {

	}

    getDataFromStream(organization,streamname,key){
		
		return new Promise((resolve,reject)=>{

			var postparams  = {
					"method":"liststreamkeyitems",
					"params":[streamname,key]
			}
			var options = {
				method:"POST",
				url:organization.url,
				body:JSON.stringify(postparams),
				headers: {
					'apikey': organization.key,
					'content-type' : 'application/json'
				}
			};
			request(options, (error, response, body)=>{
				if(error){
					reject("Error retrieving data from stream : "+streamname+" : "+JSON.stringify(body.error))
				}else{

					body = JSON.parse(body);
					if(body.error!=null){
						reject("Error retrieving data from stream : "+streamname+" : "+JSON.stringify(body.error))
					}else{
						resolve(body.result)
					}
					
				}
			});
		});
	}


	getAllStreams(organization){

		return new Promise((resolve,reject)=>{

			var postparams  = {
					"method":"liststreams",
					"params":[]
			}
			var options = {
				method:"POST",
				url:organization.url,
				body:JSON.stringify(postparams),
				headers: {
					'apikey': organization.key,
					'content-type' : 'application/json'
					
				}
			};
			request(options, (error, response, body)=>{
				if(error){
					reject("Error getting all streams : "+error)
				}else{

					body = JSON.parse(body);
					if(body.error!=null){
						reject("Error getting all streams : "+streamname+" : "+body.error)
					}else{
						resolve(body.result)
					}
					
				}
			});

		});
	}
	publishDataToStream(organization,streamname,key,value){
	
		return new Promise((resolve,reject)=>{

			var postparams  = {
				"method":"publishfrom",
				"params":[organization.address,streamname,key,value]
			}
			var options = {
				method:"POST",
				url:organization.url,
				body:JSON.stringify(postparams),
				headers: {
					'apikey': organization.key,
					'content-type' : 'application/json'
				}
			};
			request(options, (error, response, body)=>{
				if(error){
					reject("Error publishing data to stream : "+streamname+" : "+error)
				}else{

					body = JSON.parse(body);
					if(body.error!=null){
						reject("Error publishing data to stream :  "+streamname+" : "+body.error)
					}else{
						resolve(true)
					}
				}
			});

		});

	}

	getAllStreamItems(organization,streamname){
	    console.log(organization);
		return new Promise((resolve,reject)=>{

			var postparams  = {
				"method":"liststreamkeys",
				"params":[streamname,"*",true,10000]
			}
			var options = {
				method:"POST",
				url:organization.url,
				body:JSON.stringify(postparams),
				headers: {
					'apikey': organization.key,
					'content-type' : 'application/json'
				}
			};
			request(options, (error, response, body)=>{
				if(error){
					reject("Error getting items from stream : "+streamname+" : "+error)
				}else{

					body = JSON.parse(body);
					if(body.error!=null){
						reject("Error getting items from stream :  "+streamname+" : "+body.error)
					}else{
						resolve(body.result)
					}
				}
			});

		});

	}
}
module.exports = BlockchainAdapter;
