import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editContact } from '../redux/action';


function EditContact() {


    const { id } = useParams()

    const dispatch = useDispatch()

    const AllContact = useSelector((store: any) => store?.contacts)
    console.log("AllContact", id, AllContact)
   


    const [form, setForm] = useState<any>({})
    console.log("form", form)
    const handleChange = (e: any) => {
     
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })


    }




    function handleSave() {



        dispatch(editContact({ id, ...form }))

    }

    useEffect(() => {

        AllContact.filter((el: any) => el.id === Number(id) && setForm(el))
    }, [AllContact, id])

    return (
        <div className="lg:w-1/2 md:w-1/2 mx-auto my-4 pt-16 bg-gray-200 mt-20 xs:w-1/4">
            <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
            <div className="mb-4 w-60 m-auto">
                <label className="block font-bold mb-2" htmlFor="first-name">
                    First Name
                </label>
                <input
                    className="w-full border border-gray-400 p-2 rounded-md"
                    id="first-name"
                    type="text"
                    name="first_name"
                    value={form?.first_name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4 w-60 m-auto">
                <label className="block font-bold mb-2" htmlFor="last-name">
                    Last Name
                </label>
                <input
                    className="w-full border border-gray-400 p-2 rounded-md"
                    id="last-name"
                    type="text"
                    name="last_name"
                    value={form?.last_name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4 w-60 m-auto">
                <label className="block font-bold mb-2" htmlFor="last-name">
                    Mobile Number
                </label>
                <input
                    className="w-full border border-gray-400 p-2 rounded-md"
                    id="last-name"
                    type="number"
                    name="mob"
                    value={form.mob}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4 w-60 m-auto">
                <label className="block font-bold mb-2" htmlFor="status">
                    Status
                </label>
                <input type="radio" id="status" name="status" value="active"  onChange={handleChange}></input>
                <label htmlFor="status">Active</label><br></br>
                <input type="radio" id="status" name="status" value="inactive"  onChange={handleChange}></input>
                <label htmlFor="status">Inactive</label><br></br>
            </div>
            <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSave}
            >
                Save Contact
            </button>
        </div>
    );
}


export default EditContact