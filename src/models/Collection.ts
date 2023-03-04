import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public roortUrl: string, public deserialsize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.roortUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialsize(value));
      });

      this.trigger("change");
    });
  }
}
