import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMuseumDTO } from './dto/museum.dto';
import { MuseumService } from './museum.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Museum')
@Controller('museum')
export class MuseumController {
  constructor(private museumService: MuseumService) {}
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'museums in Database.',
  })
  async getMuseums(@Res() res) {
    const museums = await this.museumService.getMuseums();

    return res.status(HttpStatus.OK).send({
      message: 'museums In Database',
      museums,
    });
  }

  @Get(':museumIdParam')
  @ApiResponse({
    status: 200,
    description: 'Searched museum by ID.',
  })
  @ApiResponse({
    status: 406,
    description: 'The ID must be an legal ID museum.',
  })
  async getmuseum(@Res() res, @Param('museumIdParam') museumIdParam: string) {
    if (!museumIdParam.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${museumIdParam} must be an legal ID museum`,
      });
    }
    const museum = await this.museumService.getMuseumById(museumIdParam);
    if (!museum) throw new NotFoundException('museum Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Searched museum is :',
      museum,
    });
  }

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'The museum has been succefully created.',
  })
  async createmuseum(@Res() res, @Body() createmuseumDTO: CreateMuseumDTO) {
    const createmuseum = await this.museumService.createMuseum(createmuseumDTO);
    return res.status(HttpStatus.OK).send({
      message: 'The museum has been succefully created',
      createmuseum,
    });
  }

  @Put('/update/:museumIdParam')
  @ApiResponse({
    status: 200,
    description: 'museum Edited Succefully.',
  })
  @ApiResponse({
    status: 406,
    description: 'museum Does not exists in Database.',
  })
  async updateMuseumById(
    @Res() res,
    @Body() createMuseumDTO: CreateMuseumDTO,
    @Param('museumIdParam') museumIdParam: string,
  ) {
    const updateMuseum = await this.museumService.updatemuseumById(
      createMuseumDTO,
      museumIdParam,
    );
    if (!updateMuseum) throw new NotFoundException('museum Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'museum Edited Succefully',
      updateMuseum,
    });
  }

  @Delete('/delete/:MuseumIdParam')
  @ApiResponse({
    status: 200,
    description: 'Museum Deleted Succefully.',
  })
  @ApiResponse({
    status: 406,
    description: 'Museum Does not exists in Database.',
  })
  async deleteMuseumById(
    @Res() res,
    @Param('MuseumIdParam') MuseumIdParam: string,
  ) {
    const deleteMuseum = await this.museumService.deleteMuseumById(
      MuseumIdParam,
    );

    if (!deleteMuseum) throw new NotFoundException('Museum Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Museum Deleted succefully',
      deleteMuseum,
    });
  }
}
