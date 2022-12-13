import { Body, Controller, Post, Render } from '@nestjs/common';
import { client } from "./sqlClient";

@Controller('plants')
export class PlantsController {
  @Post()
  create(@Body() body: any): string {
    client.query('INSERT INTO plants(name) VALUES($1)', [body.name]);
    return 'Success';
  }
}
