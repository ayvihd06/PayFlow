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
  async findByEmployee(employeeId: number) {
    const employee = await this.prisma.employee.findUnique({
    where: {
    id: employeeId,
    },
    });

    if (!employee) {
    throw new NotFoundException(
    `Employee with ID ${employeeId} not found`,
    );
    }

    return this.prisma.salary.findMany({
    where: {
    employeeId,
    },
    orderBy: {
    effectiveFrom: 'desc',
    },
    });
    }

    async findCurrentByEmployee(employeeId: number) {
    const employee = await this.prisma.employee.findUnique({
        where: {
        id: employeeId,
        },
    });

    if (!employee) {
        throw new NotFoundException(
        `Employee with ID ${employeeId} not found`,
        );
    }

    const currentSalary = await this.prisma.salary.findFirst({
        where: {
        employeeId,
        effectiveFrom: {
            lte: new Date(),
        },
        },
        orderBy: {
        effectiveFrom: 'desc',
        },
    });

    if (!currentSalary) {
        throw new NotFoundException(
        `No current salary found for employee with ID ${employeeId}`,
        );
    }

    return currentSalary;
    }

}