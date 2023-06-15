import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { SubmitAnswersDto } from 'src/common/dto/questions.dto';
import { UserParams } from 'src/common/dto/user-params.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async submitQuestions(@Body() submitAnswers: SubmitAnswersDto) {
    return await this.profileService.submitAnswers(submitAnswers);
  }

  @Get('recommendations/:userId')
  async getRecommendations(@Param() params: UserParams) {
    const { userId } = params;
    return await this.profileService.getRecommendations(userId);
  }
}
