#!/usr/bin/env node

import program from "commander";

process.title = "jkt";

program.version(require("../package").version).usage("<command> [options]");

require("./modules");

program.parse(process.argv);
