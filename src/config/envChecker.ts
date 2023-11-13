import { ENV } from "../../env";

class EnvironmentChecker {
  constructor() {}

  async check() {
    try {
      this.checkEnvVariable("MONGO_URI");
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
