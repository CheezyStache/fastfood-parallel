import { onPack } from "./packingService";
import { onEvent } from "./queueService";

export function onCook(id: number): void {
  onEvent(id, "cookBurger", () => onPack(id, "burgers"));
  onEvent(id, "cookFries", () => onPack(id, "fries"));
  onEvent(id, "cookDrinks", () => onPack(id, "drinks"));
}
