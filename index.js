import os from "os";

/**
 * @param {"http" | "https"} prefix URL prefix based on in-app SSL usage
 * @param {number} port Server port number
 * @returns {string[]} Array of pretty-printed network addresses
 */
export function getNetworkAddressesList(prefix, port) {
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
          addresses.push(`- ${interfaceName}: ${prefix}://${address}:${port}`);
        }
      }
    }
  }
  return addresses;
}
