interface User {
  username: string;
  email: string;
}

class UserValidator {
  validateEmail(email: string): void {
    if (!email.includes("@")) {
      throw new Error("El correo no es valido");
    }
  }
}

class UserRepository {
  private users: User[] = [];

  save(user: User): void {
    this.users.push(user);
  }
}

class EmailService {
  sendWelcomeEmail(email: string): string {
    return `Email enviado a ${email}`;
  }
}

class UserRegistrationService {
  private readonly validator: UserValidator;
  private readonly repository: UserRepository;
  private readonly emailService: EmailService;

  constructor(
    validator: UserValidator,
    repository: UserRepository,
    emailService: EmailService,
  ) {
    this.validator = validator;
    this.repository = repository;
    this.emailService = emailService;
  }

  register(username: string, email: string): string {
    this.validator.validateEmail(email);
    this.repository.save({ username, email });
    return this.emailService.sendWelcomeEmail(email);
  }
}
