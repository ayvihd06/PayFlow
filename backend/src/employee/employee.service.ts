import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        ...createEmployeeDto,
        dateOfJoining: new Date(createEmployeeDto.dateOfJoining),
      },
    });
  }

  async findAll() {
  return this.prisma.employee.findMany({
    where: {
      isActive: true,
    },
  });
 }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.findOne(id);

    return this.prisma.employee.update({
        where: { id },
        data: {
        ...updateEmployeeDto,
        ...(updateEmployeeDto.dateOfJoining && {
            dateOfJoining: new Date(updateEmployeeDto.dateOfJoining),
        }),
        },
    });
  }
  async remove(id: number) {
  await this.findOne(id);

  return this.prisma.employee.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
 }
}