import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PortfolioService } from '../service/portfolio.service';
import { ISerializeResponse } from '../../shared/services/serilizer.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenerateEntryDto } from '../dto/generate-entry.dto';
import { PortfolioListDTO } from '../dto/generate-response.dto';

@ApiTags()
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Generate a portfolio',
    description:
      'This operation generates a portfolio and returns how the volume is separated.',
  })
  @ApiResponse({
    status: 200,
    description: 'Portfolio generated successfully.',
    type: PortfolioListDTO, // TODO: solve how to set interface as a type
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. The desired volume must be a positive number.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
  })
  @ApiBody({
    description: 'Data needed to generate the portfolio.',
    type: GenerateEntryDto,
  })
  async generatePortfolio(
    @Body() dto: GenerateEntryDto,
  ): Promise<ISerializeResponse> {
    if (isNaN(dto.desiredVolumeInTons) || dto.desiredVolumeInTons <= 0) {
      throw new BadRequestException(
        'Desired tons should be a positive number.',
      );
    }

    return await this.portfolioService.generatePortfolio(
      dto.desiredVolumeInTons,
    );
  }

  // @Get(':id')
  // async getPortfolio(@Param('id') id: number): Promise<ISerializeResponse> {
  //
  //   return await this.portfolioService.generatePortfolio(requestedTons);
  // }
}
