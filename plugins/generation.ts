import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      nameGenerationFunc: (name: string): string => {
        const characters: string =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result: string = "";

        for (let i: number = 0; i < name.length; i++) {
          let y: number = Math.floor(Math.random() * characters.length);
          if (y > 7) y = y - 5;
          result += name.substring(i, i + 1) + characters.substring(y, y + 4);
        }

        result = name.length + "_" + result;
        return result;
      },
      nameRegenerationFunc: (name: string): string => {
        let result: string = "";
        let length: number = +name.split("_")[0];
        name = name.split("_")[1];
        let index: number = 0;
        for (let i: number = 0; i < length; i++) {
          result += name.substring(index, index + 1);
          index += 5;
        }
        return result;
      },
    },
  };
});
