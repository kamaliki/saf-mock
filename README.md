# Transaction Simulation System

This is a NestJS-based API designed to simulate a high-frequency transaction environment, capable of simulating up to 1000 transactions per second. The project currently supports the management of customers, businesses, and transactions, while ensuring transaction validity and balance checks. Redis and BullMQ will be integrated in the future to handle high transaction volumes and improve scalability.
Its is a mock of an mpesa backend

## Features

- **Customer Management**: 
  - Create, update, and delete customer records.
  - Maintain customer balances for transactions.

- **Business Management**: 
  - Create, update, and delete businesses.
  - Each business has a unique shortcode and is linked to an owner.

- **Transaction Simulation**: 
  - Simulate transactions from customers to businesses.
  - Each transaction is processed only if the customer has enough balance.
  - Tracks transaction details including business shortcodes, customer identities, amounts, and timestamps.

- **Scalability**: 
  - Designed to simulate high-frequency transactions (up to 1000 transactions per second).
  - Future integration of **Redis** and **BullMQ** to handle transaction queues and improve performance.

- **Swagger Documentation**: 
  - Interactive API documentation using Swagger UI for easy testing of endpoints.

## Technologies Used

- **NestJS**: A powerful framework for building scalable server-side applications.
- **Prisma ORM**: Type-safe database access for Node.js applications.
- **PostgreSQL**: Relational databases for data storage.
- **TypeScript**: A statically typed superset of JavaScript.
- **Swagger**: API documentation and testing tool.

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/kamaliki/saf-mock.git
cd saf-mock
