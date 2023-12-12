import fs from "fs";

/**
 * SFTP Status Codes
 */
export const STATUS_CODE = {
  OK: 0,
  EOF: 1,
  NO_SUCH_FILE: 2,
  PERMISSION_DENIED: 3,
  FAILURE: 4,
  BAD_MESSAGE: 5,
  NO_CONNECTION: 6,
  CONNECTION_LOST: 7,
  OP_UNSUPPORTED: 8,
};

/**
 * Modes
 */
export const MODE_FILE =
  fs.constants.S_IFREG |
  fs.constants.S_IRWXU |
  fs.constants.S_IRWXG |
  fs.constants.S_IRWXO;
export const MODE_DIR =
  fs.constants.S_IFDIR |
  fs.constants.S_IRWXU |
  fs.constants.S_IRWXG |
  fs.constants.S_IRWXO;
