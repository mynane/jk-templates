/* eslint-disable prefer-const */
// import { Command } from "../utils/Bootstrap";
import { Command, JKModule } from "../libs/Application";

/**
 * check
 */
@Command({
  command: "check",
  description: "check the npm version",
  alias: "c",
})
export class CheckCommand extends JKModule {
  public action = async () => {
    await this.ctx?.Version?.check(false);
  };
}
