module.exports = function withCustomName(config, name) {
  // Modify the config
  config.ios.infoPlist['NSBluetoothPeripheralUsageDescription'] = "used to start and stop en run run device";
  // Return the results
  return config;
};