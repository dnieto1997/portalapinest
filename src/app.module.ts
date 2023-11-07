import { Module } from '@nestjs/common';
import { LoginDashModule } from './login_dash/login_dash.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AliadoModule } from './aliado/merchant.module';
import { BancosModule } from './bancos/bancos.module';
import { DispersionesModule } from './dispersiones/dispersiones.module';
import { PaisesModule } from './paises/paises.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UtiliesModule } from './utilities/utilities.module';
import { BalancesModule } from './balances/balances.module';
import { PayoutModule } from './payout/payout.module';
import { MasivaModule } from './masiva/masiva.module';
import { MovimientosColombiaModule } from './movimientos_colombia/movimientos_colombia.module';
import { MovimientosPeruModule } from './movimientos_peru/movimientos_peru.module';
import { MovimientosMexicoModule } from './movimientos_mexico/movimientos_mexico.module';
import { TrmModule } from './trm/trm.module';
import { ChangestatusModule } from './changestatus/changestatus.module';
import { MovimientosUserModule } from './movimientos_user/movimientos_user.module';
import { PayinModule } from './payin/payin.module';
import { CallbackModule } from './callback/callback.module';
import { LogsCallbackModule } from './logs_callback/logs_callback.module';
import { TopupNequiModule } from './topup_nequi/topup_nequi.module';
import { ConfNequiModule } from './conf_nequi/conf_nequi.module';
import { PermissionModule } from './permission/permission.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { ChangepasswordModule } from './changepassword/changepassword.module';
import { PaymentlinkModule } from './paymentlink/paymentlink.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "151.106.110.1",
      port: 3306,
      username: "u293118005_root",
      password: "Toppay12345",
      database: "u293118005_toppay_nest",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    LoginDashModule,
    AuthModule,
    AliadoModule,
    BancosModule,
    DispersionesModule,
    PaisesModule,
    DashboardModule,
    UtiliesModule,
    BalancesModule,
    PayoutModule,
    MasivaModule,
    MovimientosColombiaModule,
    MovimientosPeruModule,
    MovimientosMexicoModule,
    TrmModule,
    ChangestatusModule,
    MovimientosUserModule,
    PayinModule,
    CallbackModule,
    LogsCallbackModule,
    TopupNequiModule,
    ConfNequiModule,
    PermissionModule,
    BlacklistModule,
    ChangepasswordModule,
    PaymentlinkModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
