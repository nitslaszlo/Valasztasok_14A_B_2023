import VálasztásiEredmény from "./VálasztásiEredmény";
import fs from "fs";

export default class Megoldás {
    #ve: VálasztásiEredmény[] = [];

    get képviselőjelöltekSzáma(): number {
        return this.#ve.length;
    }

    get #megjelentekSzáma(): number {
        let szumMegjelent: number = 0;
        for (const e of this.#ve) {
            szumMegjelent += e.szavazatok;
        }
        return szumMegjelent;
    }

    get #megjelentekAránya(): string {
        const arány: number = this.#megjelentekSzáma / 12345;
        return `${(arány * 100).toFixed(2)}%`;
    }

    get részvételiStatisztika(): string {
        return `A választáson ${this.#megjelentekSzáma} állampolgár, a jogosultak ${this.#megjelentekAránya}-a vett részt.`;
    }

    get #pártStat(): Map<string, number> {
        const stat: Map<string, number> = new Map<string, number>();
        this.#ve.forEach(e => {
            if (stat.has(e.párt)) {
                // Ha a párt már szerepel a szótár kulcsai között:
                const régiÉrték: number = stat.get(e.párt) as number;
                const újÉrték: number = régiÉrték + e.szavazatok;
                stat.set(e.párt, újÉrték);
            } else {
                // Ha a párt még nincs a szótárban
                stat.set(e.párt, e.szavazatok);
            }
        });
        return stat;
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

    szavazatokSzáma(név: string): string {
        for (const e of this.#ve) {
            if (e.nev == név) {
                return `${név} ${e.szavazatok} szavazatot kapott.`;
            }
        }
        return "Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban.";
    }
}
