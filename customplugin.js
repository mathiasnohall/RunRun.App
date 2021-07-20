const withMySDK = (config, { apiKey }) => {
  // Ensure the objects exist
  if (!config.ios) {
    config.ios = {};
  }
  if (!config.ios.infoPlist) {
    config.ios.infoPlist = {};
  }

  // Append the apiKey
  config.ios.infoPlist['NSBluetoothPeripheralUsageDescription'] = apiKey;

  return config;
};

/// Use the plugin
export default withMySDK(config, { apiKey: 'Used to control the run run bluetooth device' });