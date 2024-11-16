import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class LoginDto {

	@IsNotEmpty()
	@IsString()
	readonly emailOrUsername: string;
	
	@IsNotEmpty()
	@IsString()
	readonly password: string;
}
