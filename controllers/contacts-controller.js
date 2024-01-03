import Contact, { contactUpdateFavoriteSchema, contactUpdateSchema } from '../models/Contact.js';
import {HttpError} from '../helpers/index.js';
import {ctrlWrapper} from '../decorators/index.js';

const getListContacts = async(req, res) => {
    const result = await Contact.find();
    res.json(result);  
  }

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if(!result) {
            throw HttpError(404);
        }
  res.json(result);
  }


const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result)  
  }

const updateContactsById = async (req, res) => {   
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if(!result) {
      throw HttpError(404, `Not found`);
  }
  res.json(result);        
}

// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Movie.findByIdAndUpdate(id, req.body);
//   if (!result) {
//       throw HttpError(404, `Movie with id=${id} not found`);
//   }

//   res.json(result);
// }


const deleteContact = async (req, res) => { 
  const { id } = req.params;
      const result = await Contact.findByIdAndDelete(id);
      if(!result) {
          throw HttpError(404, `Not found`);
      }
      res.json({ message: 'Contact deleted successfully' })
  }  

    export default {
        getListContacts: ctrlWrapper(getListContacts),
        getById: ctrlWrapper(getById),
        addContact: ctrlWrapper(addContact),
        updateContactsById: ctrlWrapper(updateContactsById),
        deleteContact: ctrlWrapper(deleteContact),
    }