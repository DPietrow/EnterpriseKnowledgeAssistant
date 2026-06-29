export default class StreamBatcher {
  constructor(onFlush, delay = 50) {
    this.onFlush = onFlush;
    this.delay = delay;
    this.buffer = "";
    this.timer = null;
  }

  push(chunk) {
    this.buffer += chunk;

    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.onFlush(this.buffer);
        this.buffer = "";
        this.timer = null;
      }, this.delay);
    }
  }

  reset() {
    this.buffer = "";
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }
}