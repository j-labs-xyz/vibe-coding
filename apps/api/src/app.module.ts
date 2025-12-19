import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LedgerModule } from './ledger/ledger.module';
import { PaymentsModule } from './payments/payments.module';
import { FxModule } from './fx/fx.module';
import { AccountsModule } from './accounts/accounts.module';
import { WorkflowModule } from './workflow/workflow.module';
import { ComplianceModule } from './compliance/compliance.module';
import { ReportingModule } from './reporting/reporting.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [RedisModule, AuthModule, UsersModule, LedgerModule, PaymentsModule, FxModule, AccountsModule, WorkflowModule, ComplianceModule, ReportingModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
