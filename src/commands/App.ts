/* eslint-disable prefer-const */
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
/**
 *
 */
@Command({
  command: "home",
  description: "open homepage",
})
export class HomeCommand extends JKModule {
  public action = async () => {
    await this.ctx?.Website?.Home();
  };
}
