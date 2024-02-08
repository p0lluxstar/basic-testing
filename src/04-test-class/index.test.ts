// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initBalance = 1000;
    expect(getBankAccount(1000).getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.withdraw(1500)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.transfer(1500, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => {
      account.transfer(500, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(800);
    expect(account.getBalance()).toBe(1800);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(300);
    expect(account.getBalance()).toBe(700);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(2000);
    const account2 = getBankAccount(1000);
    const transferAmount = 400;

    account1.transfer(transferAmount, account2);

    expect(account1.getBalance()).toBe(2000 - transferAmount);
    expect(account2.getBalance()).toBe(1000 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    if (account.fetchBalance() === null) {
      await expect(account.synchronizeBalance()).rejects.toThrow(
        SynchronizationFailedError,
      );
    }
  });
});
