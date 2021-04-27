import ora from "ora";

class Loading {
  spinner: any;
  public start(message = "loading") {
    this.spinner = ora(message).start();
  }
  /**
   * text
   */
  public text(message = "loading") {
    if (!this.spinner) {
      this.start(message);
    } else {
      this.spinner.text = message;
    }
  }

  /**
   * color
   */
  public color(color = "white") {
    if (!this.spinner) {
      this.start();
    }
    this.spinner.color = color;
  }

  /**
   * property
   */
  public property(message: string, color: string) {
    this.text(message);
    this.color(color);
  }

  /**
   * stop
   */
  public stop() {
    this.spinner?.stop();
  }
}

export default Loading;
