import { Astronaut } from "./astronaut";

export type Mission = {
  id: number;
  title: string;
  description: string;
  crew: Astronaut[];
}
