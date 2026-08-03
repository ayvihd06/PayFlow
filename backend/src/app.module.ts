import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { SalaryModule } from './salary/salary.module';

@Module({
  imports: [PrismaModule, EmployeeModule, SalaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}