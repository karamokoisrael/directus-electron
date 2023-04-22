//Uses node.js process manager
const child_process = require("child_process");

function runScript(command, args, callback) {
  var child = child_process.spawn(command, args, {
    encoding: "utf8",
    shell: true,
  });
  // You can also use a variable to save the output for when the script closes later
  child.on("error", (error) => {
    // dialog.showMessageBox({
    //   title: "Title",
    //   type: "warning",
    //   message: "Error occured.\r\n" + error,
    // });
  });

  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (data) => {
    //Here is the output
    data = data.toString();
    console.log(data);
  });

  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (data) => {
    // Return some data to the renderer process with the mainprocess-response ID
    // mainWindow.webContents.send("mainprocess-response", data);
    //Here is the output from the command
    console.log(data);
  });

  child.on("close", (code) => {
    //Here you can get the exit code of the script
    switch (code) {
      case 0:
        // dialog.showMessageBox({
        //   title: "Title",
        //   type: "info",
        //   message: "End process.\r\n",
        // });
        break;
    }
  });
  if (typeof callback === "function") callback();
}

runScript("npx directus start");
