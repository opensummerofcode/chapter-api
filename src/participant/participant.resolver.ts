import { Resolver, Args } from '@nestjs/graphql';
import { Query, Mutation } from '@nestjs/graphql';
import { Participant } from './types/participant.type';
import { NewParticipantInput } from './inputs/new.particpant.input';
import { ParticipantService } from './participant.service';
import { UpdateParticipantInput } from './inputs/update.participant.input';
import { SocialMediaInput } from './inputs/social.media.input';

@Resolver('Participant')
export class ParticipantResolver {
  constructor(private readonly participantService: ParticipantService) {}
  @Query(returns => [Participant], { nullable: true })
  participants() {
    return this.participantService.findAll();
  }

  @Query(returns => Participant, { nullable: true })
  participant(@Args('id') id: string): Promise<Participant> {
    return this.participantService.findOne(id);
  }

  @Mutation(returns => Participant)
  async addParticipant(
    @Args('input') input: NewParticipantInput,
  ): Promise<Participant> {
    return this.participantService.create(input);
  }

  @Mutation(returns => Participant)
  async updateParticipant(
    @Args('id') id: string,
    @Args('input') input: UpdateParticipantInput,
  ): Promise<Participant> {
    return this.participantService.update(id, input);
  }

  @Mutation(returns => Participant)
  async addStatus(@Args('id') id: string, @Args('status') status: string) {
    return this.participantService.addStatus(id, status);
  }

  @Mutation(returns => Participant)
  async removeStatus(@Args('id') id: string, @Args('status') status: string) {
    return this.participantService.removeStatus(id, status);
  }

  @Mutation(returns => Participant)
  async updateSocials(
    @Args('id') id: string,
    @Args('socials') socials: SocialMediaInput,
  ) {
    return this.participantService.updateSocials(id, socials);
  }
}
