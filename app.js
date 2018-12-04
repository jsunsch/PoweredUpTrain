const PoweredUP = require("node-poweredup");
const poweredUP = new PoweredUP.PoweredUP();

poweredUP.on("discover", async (hub) => { // Wait to discover a Hub
    await hub.connect(); // Connect to the Hub
    await hub.sleep(3000); // Sleep for 3 seconds before starting

    while (true) { // Repeat indefinitely
//        hub.setMotorSpeed("B", -50); // Start a motor attached to port B to run a 3/4 speed (75) indefinitely
        await hub.setMotorSpeed("A", 100,  2000); // Run a motor attached to port A for 2 seconds at maximum speed (100) then stop
        await hub.sleep(1000); // Do nothing for 1 second
        await hub.setMotorSpeed("A", -50,  1000); // Run a motor attached to port A for 1 second at 1/2 speed in reverse (-50) then stop
        await hub.sleep(1000); // Do nothing for 1 second
    }
});

poweredUP.scan(); // Start scanning for Hubs
