const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Data layer - equivalent to data.cob
let storageBalance = 1000.00;

function dataRead() {
  return storageBalance;
}

function dataWrite(balance) {
  storageBalance = balance;
}

// Operations - equivalent to operations.cob
async function operationsTotal() {
  const balance = dataRead();
  console.log(`Current balance: ${balance.toFixed(2).padStart(9, '0')}`);
}

async function operationsCredit() {
  const amountStr = await question("Enter credit amount: ");
  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount < 0) {
    console.log("Invalid amount. Please enter a positive number.");
    return;
  }
  const currentBalance = dataRead();
  const newBalance = currentBalance + amount;
  dataWrite(newBalance);
  console.log(`Amount credited. New balance: ${newBalance.toFixed(2).padStart(9, '0')}`);
}

async function operationsDebit() {
  const amountStr = await question("Enter debit amount: ");
  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount < 0) {
    console.log("Invalid amount. Please enter a positive number.");
    return;
  }
  const currentBalance = dataRead();
  if (currentBalance >= amount) {
    const newBalance = currentBalance - amount;
    dataWrite(newBalance);
    console.log(`Amount debited. New balance: ${newBalance.toFixed(2).padStart(9, '0')}`);
  } else {
    console.log("Insufficient funds for this debit.");
  }
}

// Main program - equivalent to main.cob
async function main() {
  let continueFlag = true;

  while (continueFlag) {
    console.log("--------------------------------");
    console.log("Account Management System");
    console.log("1. View Balance");
    console.log("2. Credit Account");
    console.log("3. Debit Account");
    console.log("4. Exit");
    console.log("--------------------------------");

    const choiceStr = await question("Enter your choice (1-4): ");
    const choice = parseInt(choiceStr);

    switch (choice) {
      case 1:
        await operationsTotal();
        break;
      case 2:
        await operationsCredit();
        break;
      case 3:
        await operationsDebit();
        break;
      case 4:
        continueFlag = false;
        break;
      default:
        console.log("Invalid choice, please select 1-4.");
    }
  }

  console.log("Exiting the program. Goodbye!");
  rl.close();
}

main();