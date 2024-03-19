/**
 * @returns {Network[]} Array of network objects
 */
export function getNetworks(): Network[];
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
  packageName: string,
  version: string,
  isProduction: boolean,
  prefix: "http" | "https",
  port: number,
  extraText: string | null | undefined,
): string;
export type Network = {
  /**
   * Network address
   */
  address: string;
  /**
   * Network interface
   */
  interface: string;
};
