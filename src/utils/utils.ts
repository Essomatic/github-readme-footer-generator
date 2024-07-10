import { Repository } from "../types/types";

/**
 * Checks if an array of repository objects is valid.
 * 
 * @param repositoriesOBJ - The array of repository objects to validate.
 * @returns Returns true if all repository objects are valid, otherwise false.
 */
export function isValidRepositories(repositoriesOBJ: Repository[]): boolean {
  if (repositoriesOBJ.length === 0) {
    return false;
  }
  // Check if every repository is valid
  return repositoriesOBJ.every(repositoryOBJ => isValidRepository(repositoryOBJ));
}

/**
 * Checks if a single repository object is valid.
 * 
 * @param repositoryOBJ - The repository object to validate.
 * @returns Returns true if the repository object is valid, otherwise false.
 */
function isValidRepository(repositoryOBJ: Repository): boolean {
  return !!repositoryOBJ && !!repositoryOBJ.owner && !!repositoryOBJ.repository;
}

/**
 * Encodes a string to Base64 format.
 * 
 * @param content - The string content to encode.
 * @returns The Base64 encoded string.
 */
export const encodeToBase64 = (content: string): string => {
  return Buffer.from(content).toString("base64");
};

/**
 * Decodes a Base64 encoded string.
 * 
 * @param base64Content - The Base64 encoded string to decode.
 * @returns The decoded string.
 */
export const decodeBase64Content = (base64Content: string): string => {
  return Buffer.from(base64Content, "base64").toString("utf-8");
};

/**
 * wraps a string in purple color.
 * 
 * @param text - The text to color.
 * @returns The text wrapped in purple color codes.
 */
export const logPurple = (text: string): string => {
  return `\x1b[35m${text}\x1b[0m`;
};

/**
 * wraps a string in cyan color.
 * 
 * @param text - The text to color.
 * @returns The text wrapped in cyan color codes.
 */
export const logCyan = (text: string): string => {
  return `\x1b[36m${text}\x1b[0m`;
};

/**
 * wraps a string in red color.
 * 
 * @param text - The text to color.
 * @returns The text wrapped in red color codes.
 */
export const logRed = (text: string): string => {
  return `\x1b[31m${text}\x1b[0m`;
};

/**
 * Wraps a string in green color.
 * 
 * @param text - The text to color.
 * @returns The text wrapped in green color codes.
 */
export const logGreen = (text: string): string => {
  return `\x1b[32m${text}\x1b[0m`;
};

/**
 * Wraps a string in orange color.
 * 
 * @param text - The text to color.
 * @returns The text wrapped in orange color codes.
 */
export const logOrange = (text: string): string => {
  return `\x1b[38;5;214m${text}\x1b[0m`;
};
