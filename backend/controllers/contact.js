const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel'); 


const getContacts = asyncHandler(async(req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async(req, res) => {
  const { name, email, phone } = req.body; 
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('Please provide name, email, and phone');
  }
  const contact = await Contact.create({
    name,
    email,
    phone
  });
  res.status(201).json(contact);
});

const getContact = asyncHandler(async(req, res) => {
    res.status(200).json({ message: 'Get contact for ${req.params.id} ' });
});

const updateContact = asyncHandler(async(req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Update contact with ID: ${id}` });
});

const deleteContact = asyncHandler(async(req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Delete contact with ID: ${id}` });
});

module.exports = {
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact
};  