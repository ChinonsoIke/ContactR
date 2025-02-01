import { join } from "node:path";
import Contact from "../models/contact";
import { readFileSync, writeFileSync } from "node:fs";


class DataSource {
    // instance :DataSource;
    #contacts :Contact[];
    #path = join(__dirname, 'contacts.json');

    constructor() {
        this.#contacts = JSON.parse(readFileSync(this.#path).toString());
    }

    add (contact :Contact) {
        this.#contacts.push(contact);
        this.#persist();
    }

    getByName (firstName: string, lastName:string) :Contact | undefined {
        return this.#contacts.find(c => c.firstName === firstName && c.lastName === lastName);
    }

    getAll ()  {
        return this.#contacts;
    }

    update (updatedContact :Contact) {
        const contact = this.#contacts.find(c => c.id === updatedContact.id);
        contact!.firstName = updatedContact.firstName;
        contact!.lastName = updatedContact.lastName;
        contact!.phoneNumber = updatedContact.phoneNumber;
        contact!.picture = updatedContact.picture;

        this.#persist();
    }

    delete (id :string) {
        this.#contacts = this.#contacts.filter(c => c.id !== id);
        this.#persist();
    }

    #persist () {
        writeFileSync(this.#path, JSON.stringify(this.#contacts));
    }
}

export const dataSource = new DataSource();