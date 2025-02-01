import { json, Router } from "express";
import { addContactHandler, deleteContactHandler, getContactsHandler, updateContactHandler } from "../handlers/contactshandler";
import {body} from 'express-validator';


const router = Router();

router.post('/contacts', json(), body('phoneNumber').isMobilePhone('en-US'), addContactHandler);
router.patch('/contacts/:id', json(), updateContactHandler);
router.delete('/contacts/:id', deleteContactHandler);
router.get('/contacts', getContactsHandler);

export default router;