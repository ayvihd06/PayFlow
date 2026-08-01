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

  async findAll(
  search?: string,
  department?: string,
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
) {
  const where = {
    isActive: true,

    ...(department && {
      department: {
        equals: department,
        mode: 'insensitive' as const,
      },
    }),

    ...(search && {
      OR: [
        {
          firstName: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
        {
          employeeId: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
        {
          email: {
            contains: search,
            mode: 'insensitive' as const,
          },
        },
      ],
    }),
  };

  const [employees, total] = await Promise.all([
    this.prisma.employee.findMany({
      where,

      orderBy: {
        [sortBy]: sortOrder,
      },

      skip: (page - 1) * limit,
      take: limit,
    }),

    this.prisma.employee.count({
      where,
    }),
  ]);

  return {
    data: employees,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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