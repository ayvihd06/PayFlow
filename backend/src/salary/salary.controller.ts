import {
Body,
Controller,
Get,
Param,
ParseIntPipe,
Post,
} from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';

@Controller('salaries')
export class SalaryController {
constructor(private readonly salaryService: SalaryService) {}

@Get('employee/:employeeId/summary')
getSalarySummary(
  @Param('employeeId', ParseIntPipe) employeeId: number,
) {
  return this.salaryService.getSalarySummary(employeeId);
}

@Get('employee/:employeeId/current')
findCurrentByEmployee(
@Param('employeeId', ParseIntPipe) employeeId: number,
) {
return this.salaryService.findCurrentByEmployee(employeeId);
}

@Get('employee/:employeeId')
findByEmployee(
@Param('employeeId', ParseIntPipe) employeeId: number,
) {
return this.salaryService.findByEmployee(employeeId);
}

@Post()
create(@Body() createSalaryDto: CreateSalaryDto) {
return this.salaryService.create(createSalaryDto);
}
}
