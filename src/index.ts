#!/usr/bin/env node

import program from "commander";

process.title = "jkt";

program.version(require("../package").version).usage("<command> [options]");

require("./libs/Bootstrap");

program.parse(process.argv);
