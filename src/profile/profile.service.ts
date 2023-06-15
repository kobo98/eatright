import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitAnswersDto } from 'src/common/dto/questions.dto';
import { Answers } from 'src/common/entities/answers.entity';
import { User } from 'src/common/entities/user.entity';
import { Gpt3Repo } from 'src/common/repos/gpt3.repo';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Answers) private answersRepository: Repository<Answers>,
    private readonly gpt3Repo: Gpt3Repo,
  ) {}

  async submitAnswers(submitAnswers: SubmitAnswersDto): Promise<Answers> {
    const payloadToRepo: Answers = {
      userId: submitAnswers.userId,
      diet: submitAnswers.answers.diet.join(','),
      medicalConditions: submitAnswers.answers.medicalConditions,
      intolerances: submitAnswers.answers.intolerances,
      healthGoals: submitAnswers.answers.healthGoals,
      budget: submitAnswers.answers.budget,
      datetime: new Date(),
    };

    return await this.answersRepository.save(payloadToRepo);
  }

  async getRecommendations(userId: string) {
    const answers = await this.answersRepository.find({
      where: { userId },
      order: {
        numeric_id: 'ASC',
      },
    });

    if (answers.length === 0) {
      return { error: 'No answers found for this user' };
    }

    const selectedAnswer = answers[answers.length - 1];

    const promptToGpt = `Give me a plan for the following diet parameters - Diet preferance: ${selectedAnswer.diet}, Budget: ${selectedAnswer.budget} USD weekly, Health Goals: ${selectedAnswer.healthGoals}, Intolerances: ${selectedAnswer.intolerances}, Medical Condition: ${selectedAnswer.medicalConditions}. make sure you also return the parameters in the response in a natural language format.`;

    const response = await this.gpt3Repo.generateText(promptToGpt);

    return response;
  }
}
