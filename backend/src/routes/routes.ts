import { json, Router } from "express";
import { addContactHandler } from "../handlers/contactshandler";
import {body} from 'express-validator';


const router = Router();

router.post('/contacts', json(), body('phoneNumber').isMobilePhone('en-US'), addContactHandler);

export default router;