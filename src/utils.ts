import { timingSafeEqual } from "crypto";
import fs from 'fs';
import { MODE_DIR, MODE_FILE } from "./constants";

/**
 * Compares two value for authentication
 *
 * @param input
 * @param allowed
 * @returns
 */
export function checkValue(input, allowed) {
  const autoReject = input.length !== allowed.length;
  if (autoReject) {
    // Prevent leaking length information by always making a comparison with the
    // same input when lengths don't match what we expect ...
    allowed = input;
  }
  const isMatch = timingSafeEqual(input, allowed);
  console.log(`autoReject: ${autoReject}`);
  console.log(` isMatch: ${isMatch}`);
  return !autoReject && isMatch;
}

/**
 * Create a string representation of a long directory listing entry (ls -l).  This is composed of file name, is it a directory, size of the file and padding.
 *
 * @param name
 * @param isDirectory
 * @param size
 * @param padding
 * @param created
 * @returns
 */
export function fileLongEntry(
  name: string,
  isDirectory: boolean,
  size: number,
  padding: number,
  created: any
) {
  if (isDirectory) {
    size = 0;
  }
  return `${isDirectory ? "d" : "-"}rw-rw-rw- 1 none none ${String(
    size
  ).padStart(padding)} ${created} ${name}`;
}


/**
 * Create the attrs object for STAT operations
 * 
 * @param stats 
 * @param attributesOnly 
 * @returns 
 */
export function createAttributes(stats: fs.Stats, attributesOnly: boolean) {
    const mode = stats.isDirectory() ? MODE_DIR : MODE_FILE;
    return {
      mode,
      uid: stats.uid,
      gid: stats.gid,
      size: stats.size,
      atime: stats.atime.getUTCMilliseconds(),
      mtime: stats.mtime.getUTCMilliseconds(),
      ...(!attributesOnly && {
        isDirectory: () => stats.isDirectory(),
        isFile: () => stats.isFile(),
        isBlockDevice: () => stats.isBlockDevice(),
        isCharacterDevice: () => stats.isCharacterDevice(),
        isSymbolicLink: () => stats.isSymbolicLink(),
        isFIFO: () => stats.isFIFO(),
        isSocket: () => stats.isSocket(),
      }),
    };
  }