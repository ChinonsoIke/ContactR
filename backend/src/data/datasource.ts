import { join } from "node:path";
import Contact from "../models/contact";
import { mkdir, readFileSync, rm, rmdir, rmdirSync, writeFileSync } from "node:fs";
import VCard from 'vcard-creator';
import archiver from 'archiver';
import { createWriteStream } from 'node:fs';
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class DataSource {
    // instance :DataSource;
    #contacts :Contact[];
    #path = join(__dirname, 'contacts.json');

    constructor() {
        this.#contacts = JSON.parse(readFileSync(this.#path).toString());
    }

    async add (contact :Contact) {
        // this.#contacts.push(contact);
        // this.#persist();
        
        try {
            await setDoc(doc(db, "contacts", contact.id),contact);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    async findExisting (phoneNumber :string) {
        const contactsResponse = (await this.getAll()) as Contact[];
        return contactsResponse.find(c => c.phoneNumber === phoneNumber);
    }

    async getById (id :string) {
        // return this.#contacts.find(c => c.id === id);
        const data = await getDoc(doc(db, "contacts", id))
        return data.data() as Contact;
    }

    async getAll ()  {
        // return this.#contacts;
        const query = await getDocs(collection(db, "contacts"));
        const contacts = query.docs.map(d => d.data());
        return contacts;
    }

    async update (updatedContact :Contact) {
        // const contact = this.#contacts.find(c => c.id === updatedContact.id);
        // contact!.firstName = updatedContact.firstName;
        // contact!.lastName = updatedContact.lastName;
        // contact!.phoneNumber = updatedContact.phoneNumber;
        // contact!.bookmark = updatedContact.bookmark;

        // this.#persist();
        await updateDoc(doc(db, "contacts", updatedContact.id), {...updatedContact});
    }

    async delete (id :string) {
        // this.#contacts = this.#contacts.filter(c => c.id !== id);
        // this.#persist();
        await deleteDoc(doc(db, "contacts", id));
    }

    async export (){
        rm(join(__dirname, 'exports'), { recursive: true }, ()=> {});
        mkdir(join(__dirname, 'exports'), ()=>{}); //remove stale exports
        const contactsResponse = (await this.getAll()) as Contact[];

        contactsResponse.forEach(contact => {
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