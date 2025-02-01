import {RequestHandler} from 'express'
import Contact from '../models/contact'
import CreateContactDTO from '../models/DTOs/createContactDto'
import { dataSource } from '../data/datasource';
import { v4 as uuidv4 } from 'uuid';
import ApiResponse from '../models/DTOs/apiResponse.ts';

export const addContactHandler :RequestHandler<unknown, ApiResponse, CreateContactDTO, unknown> = ((req, res) =>{
    // make sure contact does not already exist
    // validate input
    // add
    const response :ApiResponse = {
        message: 'failed',
        successful: false,
        data: null
    };

    const existingContact :Contact | undefined = dataSource.getByName(req.body.firstName, req.body.lastName);
    if(existingContact){
        response.message = "This contact already exists";
        response.successful = false;

        res.statusCode = 400;
        res.json(response);
        return;
    }

    console.log("hit")
    const contact :Contact = {
        id: uuidv4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        picture: req.body.picture
    };

    dataSource.add(contact);
    response.message = 'Successful';
    response.data = contact;
    res.json(response);
});