export class CreateUserDto {
  name: string;
  score: number;
}

export class UpdateUserDto {
  name?: string;
  score?: number;
}
