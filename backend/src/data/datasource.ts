import { join } from "node:path";
import Contact from "../models/contact";
import { mkdir, readFileSync, rm, rmdir, rmdirSync, writeFileSync } from "node:fs";
import VCard from 'vcard-creator';
import archiver from 'archiver';
import { createWriteStream } from 'node:fs';

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

    getByName (firstName :string, lastName :string) :Contact | undefined {
        return this.#contacts.find(c => c.firstName === firstName && c.lastName === lastName);
    }

    getById (id :string) :Contact | undefined {
        return this.#contacts.find(c => c.id === id);
    }

    getAll ()  {
        return this.#contacts;
    }

    update (updatedContact :Contact) {
        const contact = this.#contacts.find(c => c.id === updatedContact.id);
        contact!.firstName = updatedContact.firstName;
        contact!.lastName = updatedContact.lastName;
        contact!.phoneNumber = updatedContact.phoneNumber;
        contact!.bookmark = updatedContact.bookmark;

        this.#persist();
    }

    delete (id :string) {
        this.#contacts = this.#contacts.filter(c => c.id !== id);
        this.#persist();
    }

    export (){
        rm(join(__dirname, 'exports'), { recursive: true }, ()=> {});
        mkdir(join(__dirname, 'exports'), ()=>{}); //remove stale exports

        this.#contacts.forEach(contact => {
            const card = new VCard();
            card.addName(contact.lastName, contact.firstName);
            card.addPhoneNumber(contact.phoneNumber);
            const cardContent = card.getOutput();
            writeFileSync(join(__dirname, 'exports', `${contact.firstName}_${contact.lastName}.vcf`), cardContent);
        });
        
        return join(__dirname, 'exports');
    }

    #persist () {
        writeFileSync(this.#path, JSON.stringify(this.#contacts));
    }
}

export const dataSource = new DataSource();