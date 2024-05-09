import { quickSortObjects, paginateResults } from 'sr-nestjs-utils';
import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';

interface People {
  name: string;
  age: number;
}

@Controller()
export class AppController {
  @Get(':user')
  getHello(@Param('user') user: any, @Query('mom') mom: string): any {
    console.log(user);
    console.log(mom);
    const people: People[] = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 22 },
      { name: 'George', age: 28 },
      { name: 'Alice', age: 21 },
    ];
    const sort = quickSortObjects<People>(people, 'age', 'asc');
    const pageable = paginateResults<People>({ limit: 3, page: 1 }, sort);
    throw new InternalServerErrorException('sdffs');
    return pageable;
  }
}
