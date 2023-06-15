import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService as HomeService } from './home.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './common/entities/answers.entity';
import { User } from './common/entities/user.entity';
import { Gpt3Repo } from './common/repos/gpt3.repo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'eatright',
      entities: [User, Answers],
      // synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Answers]),
  ],
  controllers: [HomeController, ProfileController],
  providers: [HomeService, ProfileService, Gpt3Repo],
})
export class HomeModule {}
