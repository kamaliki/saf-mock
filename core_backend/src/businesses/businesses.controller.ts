import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new business' })
  @ApiResponse({ status: 201, description: 'The business has been successfully created.' })
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessesService.create(createBusinessDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all businesses' })
  @ApiResponse({ status: 200, description: 'A list of businesses is returned.' })
  findAll() {
    return this.businessesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a business by ID' })
  @ApiResponse({ status: 200, description: 'The business is returned.' })
  findOne(@Param('id') id: string) {
    return this.businessesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a business by ID' })
  @ApiResponse({ status: 200, description: 'The business has been updated.' })
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessesService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a business by ID' })
  @ApiResponse({ status: 200, description: 'The business has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.businessesService.remove(id);
  }
}
