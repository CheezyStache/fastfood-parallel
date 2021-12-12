export class RandomUtils {
  static randomIntFromInterval(min: number, max: number) {
    if (min === max) return min;

    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
