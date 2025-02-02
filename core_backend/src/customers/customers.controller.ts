import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'The customer has been successfully created.' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all customers' })
  @ApiResponse({ status: 200, description: 'A list of customers is returned.' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a customer by ID' })
  @ApiResponse({ status: 200, description: 'The customer is returned.' })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  //get customer by msidn
  @Get('msisdn/:msisdn')
  @ApiOperation({ summary: 'Retrieve a customer by phone number' })
  @ApiResponse({ status: 200, description: 'The customer is returned.' })
  findByMsisdn(@Param('msisdn') msisdn: string) {
    return this.customersService.findByMsisdn(msisdn);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiResponse({ status: 200, description: 'The customer has been updated.' })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiResponse({ status: 200, description: 'The customer has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
