
const Customer = require('../../Models/Customer')


//Get all customers

const getAllCustomers = async (req, res) => {
    try {
        const users = await Customer.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No customers found' });
        }

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};




// Get a single customer by ID
const getById = async (req, res) => {
    const { Id } = req.params; 
    console.log(Id);
    
    try {
        const user = await Customer.findById(Id);
        if (!user) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching customer by ID:', error);
        res.status(500).json({ error: 'Failed to fetch customer, please try again' });
    }
};
// Delete a customer by ID
const deleteById = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
    } catch (error) {
        
        console.error('Error deleting customer by ID:', error);
        res.status(500).json({ error: 'Failed to delete customer, please try again' });
    }

}

module.exports ={
    getAllCustomers,
    getById,
    deleteById,
}

