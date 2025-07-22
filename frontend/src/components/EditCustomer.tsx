import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
 
 
interface CustomerForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}
 
function EditCustomer() {
 
    const { id }=useParams();
    const [customer, setCustomer] = useState<CustomerForm>({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: ""
    });
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [saving, setSaving] = useState<boolean>(false);
 
    useEffect(() => {
        axios.get(`http://localhost:8000/api/customers/${id}/`)
            .then((res) => {
                setCustomer(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching customer:", err);
                setLoading(false);
                alert("Failed to load customer data.");
                navigate("/customers");
            });
    },[id, navigate]);
 
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    };
 
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault ();
        setSaving(true);
        axios.put(`http://localhost:8000/api/customers/${id}/`, customer)
            .then(() => {
                alert("Customer updated successfully!");
                navigate("/customer/");
            })
            .catch((err) => {
                console.error("Error updating customer:", err);
                alert("Failed to update customer.");
            })
            .finally(() => {
                setSaving(false);
            });
    }
 
 
    if (loading) return <div>Loading...</div>;
    return (
            <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <label className="block font-medium">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={customer.first_name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <label className="block font-medium">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={customer.last_name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <label className="block font-medium">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={customer.phone_number}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                    >
                        {saving ? "Saving..." : "Update Customer"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/customers")}
                        className="text-gray-600 underline"
                    >
                        Cancel
                    </button>
                    </div>
                </form>
            </div>
        )
}
 
export default EditCustomer
 
 