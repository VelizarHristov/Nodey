import { client } from "./sqlClient";

export async function createPlant(name: String) {
    client.query('INSERT INTO plants(name) VALUES($1)', [name]);
}
