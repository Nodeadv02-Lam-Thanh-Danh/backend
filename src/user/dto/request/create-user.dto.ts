import { IsEmail, IsPhoneNumber, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {

	@IsNotEmpty()
	@IsString()
	readonly first_name: string;

	@IsNotEmpty()
	@IsString()
	readonly last_name: string;
	
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	readonly username: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsPhoneNumber('VN')
	readonly phone: string;

	@IsString()
	readonly address: string
}
