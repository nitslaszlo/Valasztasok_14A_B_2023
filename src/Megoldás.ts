import VálasztásiEredmény from "./VálasztásiEredmény";
import fs from "fs";

export default class Megoldás {
    #ve: VálasztásiEredmény[] = [];

    public get képviselőjelöltekSzáma(): number {
        return this.#ve.length;
    }

    constructor(fájl_neve: string) {
        fs.readFileSync(fájl_neve)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim();
                if (aktSor.length > 0) this.#ve.push(new VálasztásiEredmény(aktSor));
            });
    }
}
