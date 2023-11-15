import { ENV } from "../../env";

class EnvironmentChecker {
  constructor() {}

  async check() {
    try {
      this.checkEnvVariable("MONGO_URI");
      this.checkEnvVariable("DB_NAME");
      this.checkEnvVariable("SMTP_EMAIL");
      this.checkEnvVariable("SMTP_PASS");
      this.checkEnvVariable("DATABASE_TYPE");
      this.checkEnvVariable("JWT_SECRET");
      
    } catch (error: any) {
      console.log(error.message);
      process.exit(1);
    }
  }

  private checkEnvVariable(variable: string) {
    if (!ENV[variable]) {
      console.log(`${variable} must be defined`);
      process.exit(1);
    }
  }
}

export { EnvironmentChecker };
