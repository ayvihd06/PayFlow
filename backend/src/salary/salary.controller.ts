import { Body, Controller, Post } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';

@Controller('salaries')
export class SalaryController {
constructor(private readonly salaryService: SalaryService) {}

@Post()
create(@Body() createSalaryDto: CreateSalaryDto) {
return this.salaryService.create(createSalaryDto);
}
}
