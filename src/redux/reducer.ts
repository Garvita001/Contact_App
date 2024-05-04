// reducer.js
import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from "./actionTypes";

const initialState = {
  contacts: JSON.parse(localStorage.getItem("contacts") || "{}") || [],
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_CONTACT: {
      let flag = 0;
      if (
        action.payload.first_name === "" ||
        action.payload.last_name === "" ||
        action.payload.mob === ""
      ) {
        alert("ohh You Missed Required Input , Please fill");
        flag = 1;
      } else if(state?.contacts?.length > 0) {
        state?.contacts?.forEach((el: any) => {
          if (
            el.first_name === action.payload.first_name &&
            el.last_name === action.payload.last_name
          ) {
            alert("Name Already Exist In Contact");
            flag = 1;
          }
        });
      }

      if (!flag) {
        alert("Contact Saved Successfully!!!");

        let updatedContacts =
          JSON.parse(localStorage.getItem("contacts") || "{}") || [];
        updatedContacts.push({
          id: updatedContacts.length + 1,
          ...action.payload,
        });
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        return {
          ...state,
          contacts: [...updatedContacts],
        };
      }
      break;
    }

    case REMOVE_CONTACT: {
      let Contacts = JSON.parse(localStorage.getItem("contacts") || "{}");
      let updatedContacts = Contacts.filter(
        (el: any) => el.id !== action.payload.id
      );
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      return {
        ...state,

        contacts: [...updatedContacts],
      };
    }

    case EDIT_CONTACT: {
      if (
        action.payload.first_name === "" ||
        action.payload.last_name === "" ||
        action.payload.mob === ""
      ) {
        alert("Input Fields Can Not Be Leave Empty");
        // flag=1
        return state;
      } else {
        let flag = 0;
        let Contacts = JSON.parse(localStorage.getItem("contacts") || "{}");

        Contacts?.forEach((el: any) => {
          if (
            el.id !== action.payload.id &&
            el.first_name === action.payload.first_name &&
            el.last_name === action.payload.last_name
          ) {
            alert("Name Already Exist!!");
            flag = 1;
            return state;
          }
        });

        if (flag) {
          return state;
        } else {
          let updatedContacts = Contacts.map((el: any) => {
            if (el.id === action.payload.id) {
              return (el = { ...action.payload });
            } else {
              return el;
            }
          });
          localStorage.setItem("contacts", JSON.stringify(updatedContacts));
          alert("Contact has been Updated");
          return {
            ...state,
            contacts: state.contacts.map((el: any) => {
              if (el.id === action.payload.id) {
                return (el = { ...action.payload });
              } else {
                return el;
              }
            }),
          };
        }
      }
    }

    default:
      return state;
  }
}
