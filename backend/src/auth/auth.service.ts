import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private tokenService: TokenService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const passwordHashed = await bcrypt.hash(createUserDto.password, 10);
    // console.log('type of createUserDto.email', typeof createUserDto.email);
    this.emailService.sendMail(createUserDto.email as string);
    return this.userService.create({
      ...createUserDto,
      password: passwordHashed,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async TokenVerification(email: string, tokenInput: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Email!');
    }
    const token = await this.tokenService.findOne(email);
    if (tokenInput === token?.token && token?.type === 'EMAIL_VERIFICATION' && token?.expiresAt > new Date()) {
      await this.userService.verifyUser(email);
      await this.tokenService.deleteToken(email);
    }
    throw new UnauthorizedException('Invalid Token!');   
  }
}
