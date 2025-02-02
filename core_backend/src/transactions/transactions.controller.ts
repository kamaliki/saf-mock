import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'The transaction has been successfully created.' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    console.log('createTransactionDto here :::::::::: ');
    console.log(createTransactionDto);
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all transactions' })
  @ApiResponse({ status: 200, description: 'A list of transactions is returned.' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a transaction by ID' })
  @ApiResponse({ status: 200, description: 'The transaction is returned.' })
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction by ID' })
  @ApiResponse({ status: 200, description: 'The transaction has been updated.' })
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction by ID' })
  @ApiResponse({ status: 200, description: 'The transaction has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
