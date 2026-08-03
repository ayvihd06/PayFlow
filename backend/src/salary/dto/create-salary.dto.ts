import { Type } from 'class-transformer';
import {
IsDateString,
IsInt,
IsNumber,
IsOptional,
Min,
} from 'class-validator';

export class CreateSalaryDto {
@Type(() => Number)
@IsInt()
@Min(1)
employeeId: number;

@Type(() => Number)
@IsNumber()
@Min(0)
basicSalary: number;

@IsOptional()
@Type(() => Number)
@IsNumber()
@Min(0)
allowances?: number = 0;

@IsOptional()
@Type(() => Number)
@IsNumber()
@Min(0)
deductions?: number = 0;

@IsDateString()
effectiveFrom: string;
}
