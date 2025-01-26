import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      register: jest
        .fn()
        .mockResolvedValue({ accessToken: 'token', refreshToken: 'refresh' }),
      login: jest
        .fn()
        .mockResolvedValue({ accessToken: 'token', refreshToken: 'refresh' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call register and return tokens', async () => {
    const result = await controller.register({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result).toEqual({ accessToken: 'token', refreshToken: 'refresh' });
    expect(service.register).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should call login and return tokens', async () => {
    const result = await controller.login({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result).toEqual({ accessToken: 'token', refreshToken: 'refresh' });
    expect(service.login).toHaveBeenCalledWith('test@example.com', 'password');
  });
});
