// src/components/BankAccount.js

import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  List, 
  ListItem, 
  ListItemText, 
  Alert 
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BankAccount = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [ifsc, setIfsc] = useState('');
  const [branch, setBranch] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdateAccount = () => {
    setError('');
    setSuccess('');

    if (!ifsc || !branch || !bankName || !accountNumber || !accountHolderName) {
      setError('All fields are required.');
      return;
    }

    const newAccount = {
      ifsc,
      branch,
      bankName,
      accountNumber,
      accountHolderName,
    };

    if (editingIndex !== null) {
      // Update existing account
      const updatedAccounts = [...accounts];
      updatedAccounts[editingIndex] = newAccount;
      setAccounts(updatedAccounts);
      setSuccess('Bank account updated successfully!');
      setEditingIndex(null); // Reset editing index
    } else {
      // Add new account
      setAccounts([...accounts, newAccount]);
      setSuccess('Bank account added successfully!');
    }

    clearForm();
  };

  const handleDeleteAccount = (index) => {
    setAccounts(accounts.filter((_, i) => i !== index));
    setSuccess('Bank account deleted successfully!');
  };

  const handleEditAccount = (index) => {
    const accountToEdit = accounts[index];
    setIfsc(accountToEdit.ifsc);
    setBranch(accountToEdit.branch);
    setBankName(accountToEdit.bankName);
    setAccountNumber(accountToEdit.accountNumber);
    setAccountHolderName(accountToEdit.accountHolderName);
    setEditingIndex(index);
  };

  const clearForm = () => {
    setIfsc('');
    setBranch('');
    setBankName('');
    setAccountNumber('');
    setAccountHolderName('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Bank Account Details
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="IFSC Code"
        fullWidth
        margin="normal"
        value={ifsc}
        onChange={(e) => setIfsc(e.target.value)}
      />
      <TextField
        label="Branch Name"
        fullWidth
        margin="normal"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />
      <TextField
        label="Bank Name"
        fullWidth
        margin="normal"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <TextField
        label="Account Number"
        type="number"
        fullWidth
        margin="normal"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <TextField
        label="Account Holder Name"
        fullWidth
        margin="normal"
        value={accountHolderName}
        onChange={(e) => setAccountHolderName(e.target.value)}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddOrUpdateAccount} 
        style={{ marginTop: '20px' }}
      >
        {editingIndex !== null ? 'Update Account' : 'Add Account'}
      </Button>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={() => navigate('/dashboard')} // Redirect to Dashboard
        style={{ marginLeft: '10px', marginTop: '20px' }}
      >
        Go to Dashboard
      </Button>

      <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>
        Your Bank Accounts
      </Typography>
      {accounts.length > 0 ? (
        <List>
          {accounts.map((account, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`${account.bankName} - ${account.accountHolderName}`}
                secondary={`IFSC: ${account.ifsc}, Branch: ${account.branch}, Account Number: ${account.accountNumber}`}
              />
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => handleEditAccount(index)}
                style={{ marginRight: '10px' }}
              >
                Edit
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => handleDeleteAccount(index)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No bank accounts found. Please add one.</Typography>
      )}
    </Container>
  );
};

export default BankAccount;
