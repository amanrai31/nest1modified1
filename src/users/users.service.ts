import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
    private users=[
        {
            "id":1,
            "name":"Aman",
            "email":"aman@gmail.com",
            "role":"INTERN",
        },
        {
            "id":2,
            "name":"Rahul",
            "email":"ry@gmail.com",
            "role":"ENGINEER",
        },
        {
            "id":3,
            "name":"Sahil",
            "email":"ss@gmail.com",
            "role":"ADMIN",
        }
    ]

    findAll(role?:'INTERN'|'ENGINEER'|'ADMIN'){
        if(role){
           const rolesArray= this.users.filter(user=> user.role === role)       // callback--- return this.users.filter((user)=> user.role === role) 
        if(rolesArray.length===0) throw new NotFoundException('User role not found');
        return rolesArray;
        }
        return this.users
    }

    findById(id:number){
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User not found bro')
        return user;
    }

    createUser(user:UserDto){
        const usersByHighestId = [...this.users].sort((a,b)=> b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id +1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    updateUser(id:number, userUpdate:UpdateUserDto){    // Mking optional update by ?
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user, ...userUpdate}
            }
            return user
        })
        return this.findById(id);
    }

    delete(id:number){
        const removedUser = this.findById(id)
        this.users=this.users.filter(user => user.id !==id)
        return removedUser
    }
}
