// App.jsx
import React, { useEffect, useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import VendorForm from './components/VendorForm';
import MailForm from './components/MailForm';
import {
    fetchEmployees,
    addEmployee,
    fetchVendors,
    addVendor,
    sendEmailsToVendors,
    fetchSentEmail
} from './Services/apiService';

function App() {
    const [employees, setEmployees] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [sentEmails, setSentEmails] = useState([]);

    useEffect(() => {
        fetchEmployees().then((response) => setEmployees(response.data));
        fetchVendors().then((response) => setVendors(response.data));
        fetchSentEmail().then((response) => setSentEmails(response.data));
    }, []);

    const handleAddEmployee = (employee) => {
        addEmployee(employee).then((response) => {
            setEmployees([...employees, response.data]);
        });
    };

    const handleAddVendor = (vendor) => {
        addVendor(vendor).then((response) => {
            setVendors([...vendors, response.data]);
        });
    };

    const handleSendEmails = (selectedVendors) => {
        sendEmailsToVendors(selectedVendors).then(() => {
            fetchSentEmail().then((response) => setSentEmails(response.data));
        });
    };

    return (
        <div className="App">
            <h1>Employee Management</h1>
            <EmployeeForm onAddEmployee={handleAddEmployee} />
            <h1>Vendor Management</h1>
            <VendorForm onAddVendor={handleAddVendor} />
            <h1>Send Emails</h1>
            <MailForm vendors={vendors} onSendEmails={handleSendEmails} />
            <h2>Sent Emails</h2>
            <ul>
                {sentEmails.map((email) => (
                    <li key={email.id}>
                        {email.vendorName} - {email.emailContent} at {email.sentTime}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
