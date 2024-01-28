import { Body, Controller, Get, Param, Post, Patch, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()                                               // 'localhost:3000/users?param1=value1&param2=value2'>>>we can have multiple query
    findall(@Query('role')role?:'INTERN' | 'ENGINEER' | 'ADMIN'){            //Gets at >>     /users------Returns all users
        return this.usersService.findAll(role);
    }

    @Get(':id')                                //>> /users/:id ---return that particular user (DYNAMIC ROUTE)
    findById(@Param('id', ParseIntPipe)id: number){
        return this.usersService.findById(id);                       // unary plus(+)--- parsh to number
    }

    @Post()                                           // Posts at >>   /users
    createUser(@Body(ValidationPipe) user:UserDto){                            // user:{}              
        return this.usersService.createUser(user);                                 // We can reture things like >> console.log('user added successfully')
    }

    @Patch(':id')                                 // Patch at >> /users/:id
    updateUser(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate:UpdateUserDto){                  // We will find by id,, and update that user so we need body
     return this.usersService.updateUser(id, userUpdate)                                       // We can just return the userUpdate object (without id)
    }

    @Delete(':id')                                //Delete at >> /users/:id
    delete(@Param('id', ParseIntPipe)id:number){
        return this.usersService.delete(id);
    }
   
}
