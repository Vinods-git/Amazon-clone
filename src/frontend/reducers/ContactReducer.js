import {CREATE_CONTACT,GET_CONTACT,UPDATE_CONTACT,DELETE_CONTACT} from '../constant/types';
import {initialState} from '../constant/data';

export const ContactReducer = (state=initialState,action) =>{
  switch(action.type){
    case CREATE_CONTACT:
      return {...state,contacts:[action.payload,...state.contacts]};
    
    case GET_CONTACT:
       return {
        ...state,contact:state.contacts.filter((contact)=>contact.id == action.payload)[0]
      };
    case UPDATE_CONTACT:
       var i;
      for(i=0; i<state.contacts.length;i++){
          if(state.contacts[i].id==action.payload.id){
            state.contacts.splice(i,1,action.payload)
            return {
              ...state,contacts:state.contacts                                                                                                                                                    
            };    
          }
      }
    case DELETE_CONTACT:
        return { ...state,
            contacts:state.contacts.filter((contact)=>contact.id!=action.payload)
          };

    default:
    return state;
  }
}