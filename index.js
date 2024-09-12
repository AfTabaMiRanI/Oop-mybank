#! /usr/bin/env node
import inquirer from 'inquirer';
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of ${amount} successful. Remaining balance: ${this.balance}`);
        }
        else {
            console.log(`Insufficient Balance`);
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. YOur Balance: $${this.balance}`);
    }
    // Check Balance
    checkBalance() {
        console.log(`Current Balance: $${this.balance}`);
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create Bank Accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
// Create Customers
const customers = [
    new Customer('Mohammad', 'Aftab', 'Male', 24, 3128883541, accounts[0]),
    new Customer('Mohammad', 'Moosa', 'Male', 23, 3000111945, accounts[1]),
    new Customer('Ayeza', 'Khan', 'Female', 7, 300001111, accounts[2])
];
// Fucntion to interact with bank account 
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: 'accountNumber',
            type: 'number',
            message: 'Enter Your account Number:'
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome ${customer.firstName} ${customer.lastName}|\n`);
            const ans = await inquirer.prompt([{
                    name: 'select',
                    type: 'list',
                    message: 'Select an Operation',
                    choices: ['Deoposit', 'Withdraw', 'Check Balance', 'Exit']
                }]);
            switch (ans.select) {
                case 'Deoposit':
                    const depositAmount = await inquirer.prompt({
                        name: 'amount',
                        type: 'number',
                        message: 'Enter the amount to deposit:'
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case 'Withdraw':
                    const WithdrawAmount = await inquirer.prompt({
                        name: 'amount',
                        type: 'number',
                        message: 'Enter the amount to Withdraw:'
                    });
                    customer.account.withdraw(WithdrawAmount.amount);
                    break;
                case 'Check Balance':
                    customer.account.checkBalance();
                    break;
                case 'Exit':
                    console.log('Exiting bank Program...!!!');
                    console.log('Thanks For Visiting OOp-MyBank.!!');
                    return;
            }
        }
        else {
            console.log('Invalid account number....Please Try Again !!!!!!!!');
        }
    } while (true);
}
service();
