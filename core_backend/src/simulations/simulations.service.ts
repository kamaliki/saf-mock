import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service';
import { CustomersService } from '../customers/customers.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class SimulationsService {

  // Define thresholds and fixed top-up amounts as constants (or load from config)
  private readonly minBalanceThreshold = 100;  // if balance falls below 100, then top-up
  private readonly topUpAmount = 500;           // fixed amount for top-up

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly customersService: CustomersService,
  ) {}

  /**
   * Simulate an agent's behavior:
   * - If the agent's balance is low, top up their account.
   * - Otherwise, perform a purchase transaction.
   *
   * @param businessId The ID of the business where the agent will make a purchase.
   */
  async simulateAgentBehavior(businessId: string): Promise<any> {
    // Retrieve simulation agents using a known identifier (e.g., msisdn starting with '2547SIM')
    const agents = await this.customersService.findAll();

    if (!agents || agents.length === 0) {
      throw new Error('No simulation agents available.');
    }

    // Select a random agent from the pool
    const agent = faker.helpers.arrayElement(agents);

    // Convert the agent's balance to a number for easier comparisons
    const currentBalance = agent.personalBalance.toNumber();

    if (currentBalance < this.minBalanceThreshold) {
      // Agent's balance is low; top up the agent
      const newBalance = currentBalance + this.topUpAmount;
      await this.customersService.update(agent.id, { personalBalance: newBalance });
      console.log(`Agent ${agent.id} topped up by ${this.topUpAmount}. New balance: ${newBalance}`);
      return { action: 'top-up', agentId: agent.id, amount: this.topUpAmount, newBalance };
    } else {
      // Agent has sufficient funds to perform a purchase
      const purchaseAmount = faker.number.int({ min: 50, max: 300 });

      if (currentBalance < purchaseAmount) {
        console.log(`Agent ${agent.id} has insufficient funds for a purchase of ${purchaseAmount}`);
        return { action: 'none', message: 'Insufficient funds for purchase' };
      }

      // Prepare transaction details with some randomness
      const transactionDto = {
        transID: faker.string.alphanumeric(10),
        transactionType: 'CustomerPayBillOnline' as const,
        transTime: new Date(),
        transAmount: purchaseAmount,
        businessShortCode: businessId, // example value
        billRefNumber: '',          // for CustomerPayBillOnline
        invoiceNumber: faker.string.alphanumeric(10),
        MSISDN: agent.msisdn,       // Use agent's registered details or override with simulated values if needed
        firstName: agent.firstName,
      };

      // Create the transaction; your TransactionsService should handle balance deduction and business balance increment
      const transaction = await this.transactionsService.create(transactionDto);
      console.log(`Agent ${agent.id} made a purchase of ${purchaseAmount}`);
      return { action: 'purchase', agentId: agent.id, amount: purchaseAmount, transaction };
    }
  }
}
