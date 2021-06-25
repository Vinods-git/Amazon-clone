import {CREATE_CONTACT,GET_CONTACT,UPDATE_CONTACT,DELETE_CONTACT} from '../constant/types';

export const addContact = (contact) =>{
	return {
		type:CREATE_CONTACT,
		payload:contact
	}
}
export const getContact = (id) =>{
	return {
		type:GET_CONTACT,
		payload:id
	}
}
export const updateContact = (contact) =>{
	return {
		type:UPDATE_CONTACT,
		payload:contact
	}
}
export const deleteContact = (id) =>{
	return {
		type:DELETE_CONTACT,
		payload:id
	}
}