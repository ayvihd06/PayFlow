import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaryDto } from './dto/create-salary.dto';

@Injectable()
export class SalaryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSalaryDto: CreateSalaryDto) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id: createSalaryDto.employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException(
        `Employee with ID ${createSalaryDto.employeeId} not found`,
      );
    }

    return this.prisma.salary.create({
      data: {
        employeeId: createSalaryDto.employeeId,
        basicSalary: createSalaryDto.basicSalary,
        allowances: createSalaryDto.allowances ?? 0,
        deductions: createSalaryDto.deductions ?? 0,
        effectiveFrom: new Date(createSalaryDto.effectiveFrom),
      },
    });
  }
}