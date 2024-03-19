/**
 * @typedef Network
 * @type {object}
 * @property {string} address Network address
 * @property {string} interface Network interface
 */

import os from "os";

/**
 * @returns {Network[]} Array of network objects
 */
export function getNetworks() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const [interfaceName, interfaceData] of Object.entries(interfaces)) {
    if (interfaceData != null) {
      for (const addressData of interfaceData) {
        if (addressData.family === "IPv4") {
          const address =
            addressData.address === "127.0.0.1"
              ? "localhost"
              : addressData.address;
          addresses.push({ address, interface: interfaceName });
        }
      }
    }
  }
  return addresses;
}

/**
 * @param {string} packageName App name
 * @param {string} version App version
 * @param {boolean} isProduction Whether server is launched in production environment
 * @param {"http" | "https"} prefix URL prefix based on in-app SSL usage
 * @param {number} port Server port number
 * @param {string | null | undefined} extraText Text to display instead of 'is running at'
 * @returns {string} Text to output on a server startup
 */
export function getStartupWelcomeText(
  packageName,
  version,
  isProduction,
  prefix,
  port,
  extraText,
) {
  const networks = getNetworks();
  const texts = [
    `\n${packageName}@${version} (${isProduction ? "production" : "development"}) ${extraText ?? "is running at"}:`,
  ];

  for (const network of networks) {
    texts.push(
      `- ${network.interface}: ${prefix}://${network.address}:${port}`,
    );
  }

  return texts.join("\n");
}
