# Code challenge for ESFX

ESFX is a file transfer solution that uses the SSH2 package to transfer files based on SFTP (Secure File Transfer Protocol).

It will test your ability to understand documentation and working with file systems in Node.JS

## Requirements
- The server runs on localhost on port 22022
- The SFTP server is initialised with a host key for which you will need to generate a ssh-rsa key pair and load that in from the file system.
- A single user can log into the SFTP server acting as a client using password authentication
- The user can list all the files in the directory
- User can navigate to a subdirectory and list all the files there

### Stretch Goals for Extra Points
- Implement public key authorisation alongside password authorisation

## Running the SFTP Server
The Node.JS application is built using TypeScript and has nodemon added so it will restart the application when there are any file changes.

`npm run` will execute `ts-node src/index.ts`

## Running the SFTP Client
If you have the SFTP client in your MacOS bash shell, you can run
`sftp -P 22022 <username>@127.0.0.1 -vv`

Otherwise you can connect using any SFTP client like WinSCP, Cyberduck, FileZilla etc.

## Documentation
Your main source of documentation for creating SFTP servers using SSH2 package is here:
https://github.com/mscdex/ssh2/blob/master/SFTP.md

This is the whitepaper for the SFTP protocol which may help you understand the internal workings of SFTP
https://datatracker.ietf.org/doc/html/draft-ietf-secsh-filexfer-13 

## Hints
There have been several helper functions and constants defined in the utils.ts and constants.ts respectively. These will help you implement the logic required for the SFTP operations.


There is an outstanding bug in the SSH2 code where EOF commands sent by the SFTP client doesn't terminate connections, you may need to make a manual change in your node_modules as per this
https://github.com/mscdex/ssh2/pull/1111/files/3cb7eb4ea0ac4221f1cbc4779c24276b03a2a6d5#diff-1b48bb429de959672dadab9c87c215e19177dd70e3bd932d131ce74294c44cd5
