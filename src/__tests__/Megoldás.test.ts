import fs from "fs";
import Megoldás from "../Megoldás";

describe("Megoldás osztály UNIT tesztek", () => {
    const m1: Megoldás = new Megoldás("szavazatok.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(m1).toBeInstanceOf(Megoldás);
    });

    it("képviselölt jelöltek száma jellemző", async () => {
        expect(m1.képviselőjelöltekSzáma).toBe(40);
    });

    it("kepviselok.txt állományok összehasonlítása", async () => {
        m1.állománybaÍr("kepviselok.txt");
        expect(fs.readFileSync("kepviselok.txt").toString()).toBe(fs.readFileSync("kepviselok_OH.txt").toString());
    });
});
