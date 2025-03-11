const { faker } = require("@faker-js/faker");

function selectRandomCustomer(context, events, done) {
  console.log("Fetching customers...");
  console.log("Raw customers data:", JSON.stringify(context.vars.customers, null, 2)); // Debugging log

  let customers = context.vars.customers;

  // Ensure `customers` is an array
  if (!Array.isArray(customers)) {
    console.log("Error: Expected an array of customers but got something else!");
    throw new Error("Customer data is not an array");
  }

  if (customers.length > 0) {
    const randomIndex = Math.floor(Math.random() * customers.length);
    const selectedCustomer = customers[randomIndex].id; // Extract just the ID

    if (!selectedCustomer) {
      console.log("Error: Selected customer ID is undefined!");
      throw new Error("Selected customer is invalid");
    }

    context.vars.selectedCustomer = selectedCustomer;
    console.log(`✅ Selected customer ID: ${context.vars.selectedCustomer}`);
  } else {
    console.log("❌ No customers available!");
    throw new Error("Customer pool is empty");
  }

  return done();
}

function generateBusinessName(context, events, done) {
  const businessCategories = [
    "Food & Beverages",
    "Electronics",
    "Clothing & Fashion",
    "Pharmacy",
    "Supermarket",
    "Auto Repair",
    "Bakery",
    "Salon & Spa",
    "Furniture",
    "Hardware Store",
  ];

  const category = faker.helpers.arrayElement(businessCategories);
  const name = `${faker.company.name()} ${category}`;

  context.vars.businessName = name;

  console.log(`Generated Business Name: ${context.vars.businessName}`);
  return done();
}

module.exports = { selectRandomCustomer, generateBusinessName };
