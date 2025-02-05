import e, {RequestHandler} from 'express'
import Contact from '../models/contact'
import CreateContactDTO from '../models/DTOs/createContactDto'
import { dataSource } from '../data/datasource';
import { v4 as uuidv4 } from 'uuid';
import ApiResponse from '../models/DTOs/apiResponse.ts';
import UpdateContactDTO from '../models/DTOs/updateContactDTO.ts';
import { join } from 'node:path';
import archiver from 'archiver';

export const addContactHandler :RequestHandler<unknown, ApiResponse, CreateContactDTO, unknown> = ( async(req, res) =>{
    // make sure contact does not already exist
    // validate input
    // add
    const response :ApiResponse = {
        message: 'failed',
        data: null
    };

    const existingContact :Contact | undefined = await dataSource.getByName(req.body.firstName, req.body.lastName);
    if(existingContact){
        response.message = "This contact already exists";

        res.statusCode = 400;
        res.json(response);
        return;
    }

    const contact :Contact = {
        id: uuidv4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        bookmark: false
    };

    dataSource.add(contact);
    response.message = 'Successful';
    response.data = contact;
    res.json(response);
});

export const updateContactHandler :RequestHandler<{id :string}, ApiResponse, unknown, UpdateContactDTO> = async (req, res) => {
    const response :ApiResponse = {
        message: 'failed',
        data: null
    };

    const existingContact :Contact = await dataSource.getById(req.params.id);
    if(!existingContact){
        response.message = "Contact not found";
        res.statusCode = 400;
        res.json(response);
        return;
    }
    
    let bookmark = false;
    if(req.query.bookmark){
        if(req.query.bookmark == 'true') bookmark = true;
    }

    existingContact.firstName = req.query.firstName ?? existingContact.firstName;
    existingContact.lastName = req.query.lastName ?? existingContact.lastName;
    existingContact.phoneNumber = req.query.phoneNumber ?? existingContact.phoneNumber;
    existingContact.bookmark = req.query.bookmark ? bookmark : existingContact.bookmark;

    dataSource.update(existingContact);
    response.message = 'Successful';
    response.data = existingContact;
    res.json(response);
};

export const deleteContactHandler :RequestHandler<{id :string}, ApiResponse, unknown, unknown> = (async (req, res) => {
    const response :ApiResponse = {
        message: 'failed',
        data: null
    };

    const existingContact :Contact = await dataSource.getById(req.params.id);
    if(!existingContact){
        response.message = "Contact not found";

        res.statusCode = 400;
        res.json(response);
        return;
    }

    dataSource.delete(req.params.id);
    response.message = 'Successful';
    res.json(response);
});

export const getContactsHandler :RequestHandler<unknown, ApiResponse, unknown, unknown> = ((req, res) => {
    const contacts = dataSource.getAll()
        .then((result) => {
            console.log(result)
            
            const response :ApiResponse = {
                message: 'Successful',
                data: result
            };
        
            res.json(response);
        });
});

export const exportContactsHandler :RequestHandler<unknown, string, unknown, unknown> = (async (req, res) => {
    const exportPath = await dataSource.export();

    const zip = archiver('zip');

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=contacts.zip');

    zip.pipe(res);
    zip.directory(exportPath, false);
    zip.finalize();
});