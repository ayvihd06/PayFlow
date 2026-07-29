import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @MinLength(3)
  employeeId: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  designation: string;

  @IsString()
  department: string;

  @IsDateString()
  dateOfJoining: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}