import "dotenv/config";
import fs from "fs";
import { Server, Session, SFTPWrapper } from "ssh2";
import { checkValue } from "./utils";

// The username and password for your login
const allowedUser = Buffer.from(process.env.USERNAME);
const allowedPassword = Buffer.from(process.env.PASSWORD);

new Server(
  {
    hostKeys: [], // TODO You need to load in a host key
    debug: console.log, // Include to see SFTP operations called by the client
  },
  (client) => {
    console.log("Client connected!");
    client
      .on("authentication", (ctx) => {
        let allowed = true;
        if (!checkValue(Buffer.from(ctx.username), allowedUser))
          allowed = false;

        switch (ctx.method) {
          case "password":
            console.log(ctx.password);
            if (!checkValue(Buffer.from(ctx.password), allowedPassword))
              return ctx.reject();
            break;
          default:
            return ctx.reject();
        }

        if (allowed) ctx.accept();
        else ctx.reject();
      })
      .on("ready", () => {
        console.log("Client authenticated!");
        client.on("session", (accept, reject) => {
          const session: Session = accept();
          session.on("sftp", (accept, reject) => {
            const sftp: SFTPWrapper = accept();
            // TODO Some required variables might need to be included here
            sftp
              .on("CLOSE", (reqid, _handle) => {
                // TODO Not really used as we aren't opening and closing files, but lets return OK here.
              })
              .on("REALPATH", (reqid, path) => {
                // TODO REALPATH request can be used to have the server canonicalize any given path name to an absolute path
                // This will be fired once the authentication is complete.
                // Check the documentation for what is going to be returned from REALPATH
              })
              .on("READDIR", (reqid, handle) => {
                // TODO This will be the most complicated implementation
                // The REALPATH will be called once to get the files, and the client
                // will continue to call REALPATH until they recieve an EOF from the SERVER
                // Might need some variables to handle the read state
              })
              .on("OPENDIR", function (reqid, path) {
                // TODO You can have this one for free :-)
                return sftp.handle(reqid, Buffer.from(path));
              })
              .on("STAT", onSTAT)
              .on("LSTAT", onSTAT);

            function onSTAT(reqid, path) {
              // TODO You need to return the stats when the STAT or LSTAT command is received.
            }
          });
        });
      })
      .on("close", () => {
        console.log("Client disconnected");
      });
  }
)
// TODO Listen down here as per the requirements
