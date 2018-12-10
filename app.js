const PoweredUP = require("node-poweredup");
const poweredUP = new PoweredUP.PoweredUP();

const yellowTrainUUID = "90842b082fca";
const switcherUUID = "90842b06f6c0";
const chrissyTrainUUID = "90842b071d0a";
const yellowSpeed = 45;

var yellowTrain = null;
var switcher = null;
var chrissyTrain = null;

console.log("This code should run only once");

poweredUP.on("discover", async (hub) => { // Wait to discover a Hub
	console.log("On Discover: " + hub.uuid);

	if(hub.uuid == switcherUUID)
	{
		console.log("Found switcher");
		await hub.connect();
		switcher = Object.assign({},hub);

/*		await switcher.setMotorSpeed("A", -100);
		await switcher.sleep(600);

		await switcher.setMotorSpeed("A", 100);
		await switcher.sleep(600);

		await switcher.setMotorSpeed("A", 0);*/
	}
	else if(hub.uuid == yellowTrainUUID)
	{
		console.log("Yellow Train!");
		hub.connect().then( async (hub1) => {
			yellowTrain = hub1;
console.log(hub1);

/*
		await yellowTrain.setMotorSpeed("A", yellowSpeed);

		yellowTrain.on("color", async (port, color) => {
			//console.log(color);

			if(color == 9)
			{
				await yellowTrain.setMotorSpeed("A", 0);

				if(switcher)
				{
					await switcher.setMotorSpeed("A", -100);
					await switcher.sleep(600);

					await switcher.setMotorSpeed("A", 100);
					await switcher.sleep(600);

					await switcher.setMotorSpeed("A", 0);
				}
				else
				{
					console.log("switcher not set");
				}

				await yellowTrain.sleep(3000);
				await yellowTrain.setMotorSpeed("A", yellowSpeed);
			}
      		});
*/
		});
	}
	else if(hub.uuid == chrissyTrainUUID)
	{
		console.log("Weeee, Christmas Train has been activated");
		await hub.connect();
		chrissyTrain = Object.assign({},hub);

/*		await chrissyTrain.setMotorSpeed("A", -25);
		await chrissyTrain.sleep(1000);
		await chrissyTrain.setMotorSpeed("A", 25);
		await chrissyTrain.sleep(1000);
		await chrissyTrain.setMotorSpeed("A", 0);*/
	}
	else
	{
		console.log("Unknown hub: " + hub.uuid);
	}

	//poweredUP.scan(); // Start scanning for hubs
});

poweredUP.scan(); // Start scanning for Hubs

setInterval(() => {

	let hubs = poweredUP.getConnectedHubs(); // Get an array of all connected hubs
	hubs.forEach((hub) => {
		console.log("Here's a hub: " + hub.uuid);
	});

	yellowTrain ? console.log("Yellow!") : console.log("No Yellow");

	switcher ? console.log("Switcher!") : console.log("No switcher"+switcher);

	chrissyTrain ? console.log("Santa's HERE!") : console.log("No santa :(");

}, 2000);
