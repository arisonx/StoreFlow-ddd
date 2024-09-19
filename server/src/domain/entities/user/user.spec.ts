import { randomUUID } from "crypto";
import CPF from "./cpf";
import Email from "./email";
import { Password } from "./password";
import RG from "./rg";
import User from "./user.entity";
import Usermame from "./username";
describe("User unit tests", () => {
  it("Should throw error if usermame is more than 255 caracteres", () => {
    expect(() => {
      new User({
        id: randomUUID(),
        name: new Usermame("Luis".repeat(150)),
        cpf: new CPF("63067078080"),
        password: new Password("S3curityP@ssw0rd"),
        email: new Email("teste@email.com"),
        rg: new RG("435144820"),
      });
    }).toThrow("The name must have between 1 and 255 characters");
  });

  it("Should throw error if usermame has special chars", () => {
    expect(() => {
      new User({
        id: randomUUID(),
        name: new Usermame("Luizin@##"),
        cpf: new CPF("63067078080"),
        password: new Password("S3curityP@ssw0rd"),
        email: new Email("teste@email.com"),
        rg: new RG("435144820"),
      });
    }).toThrow("The name must not contain special characters");
  });

  it("Should create a user with valid name", () => {
    const user = new User({
      id: randomUUID(),
      name: new Usermame("Luis Fernando"),
      cpf: new CPF("63067078080"),
      password: new Password("S3curityP@ssw0rd"),
      email: new Email("teste@email.com"),
      rg: new RG("435144820"),
    });
    expect(user.name).toBe("Luis Fernando");
  });

  it("Should throw error if CPF is invalid ", () => {
    expect(() => {
      new User({
        id: randomUUID(),
        name: new Usermame("Luis Fernando"),
        cpf: new CPF("12345678"),
        password: new Password("S3curityP@ssw0rd"),
        email: new Email("teste@email.com"),
        rg: new RG("435144820"),
      });
    }).toThrow("Invalid CPF");
  });

  it("Should create user if CPF is valid ", () => {
    const user = new User({
      id: randomUUID(),
      name: new Usermame("Luis Fernando"),
      cpf: new CPF("63067078080"),
      password: new Password("S3curityP@ssw0rd"),
      email: new Email("teste@email.com"),
      rg: new RG("435144820"),
    });
    expect(user.cpf).toBe("63067078080");
  });

  it("Should throw error if password dont contain at least one special character", () => {
    expect(() => {
      new User({
        id: randomUUID(),
        name: new Usermame("Luis Fernando"),
        cpf: new CPF("63067078080"),
        password: new Password("S3curityPssw0rd"),
        email: new Email("teste@email.com"),
        rg: new RG("435144820"),
      });
    }).toThrow("Password must contain at least one special character.");
  });

  it("Should throw error if password dont contain at least one number.", () => {
    expect(() => {
      new User({
        id: randomUUID(),
        name: new Usermame("Luis Fernando"),
        cpf: new CPF("63067078080"),
        password: new Password("SecurityPs@sword"),
        email: new Email("teste@email.com"),
        rg: new RG("435144820"),
      });
    }).toThrow("Password must contain at least one number.");
  });

  it("It should generate error if the password does not have at least 8 characters.", () => {
    expect(() => {
      new User({
        id: randomUUID(),
        name: new Usermame("Luis Fernando"),
        cpf: new CPF("63067078080"),
        password: new Password("12#356"),
        email: new Email("teste@email.com"),
        rg: new RG("435144820"),
      });
    }).toThrow("Password must be at least 8 characters long.");
  });

  it("Should create user if password is valid ", () => {
    const user = new User({
      id: randomUUID(),
      name: new Usermame("Luis Fernando"),
      cpf: new CPF("63067078080"),
      password: new Password("S3curityP@ssw0rd"),
      email: new Email("teste@email.com"),
      rg: new RG("435144820"),
    });
    expect(user.password).toBe("S3curityP@ssw0rd");
  });

  it("Should throw error if email is invalid.", () => {
    expect(() => {
      new User({
        id: randomUUID(),
        name: new Usermame("Luis Fernando"),
        cpf: new CPF("63067078080"),
        password: new Password("S3curityP@ssw0rd"),
        email: new Email("testeemail.com"),
        rg: new RG("435144820"),
      });
    }).toThrow("Invalid email format");
  });

  it("Should create user if email is valid.", () => {
    const user = new User({
      id: randomUUID(),
      name: new Usermame("Luis Fernando"),
      cpf: new CPF("63067078080"),
      password: new Password("S3curityP@ssw0rd"),
      email: new Email("teste@email.com"),
      rg: new RG("435144820"),
    });
    expect(user.email).toBe("teste@email.com");
  });

  it("Should throw error if rg is invalid.", () => {
    expect(() => {
      new User({
        id: randomUUID(),
        name: new Usermame("Luis Fernando"),
        cpf: new CPF("63067078080"),
        password: new Password("S3curityP@ssw0rd"),
        email: new Email("test@eemail.com"),
        rg: new RG("12345678"),
      });
    }).toThrow("Invalid RG");
  });

  it("Should create user if email is valid.", () => {
    const user = new User({
      id: randomUUID(),
      name: new Usermame("Luis Fernando"),
      cpf: new CPF("63067078080"),
      password: new Password("S3curityP@ssw0rd"),
      email: new Email("teste@email.com"),
      rg: new RG("435144820"),
    });
    expect(user.rg).toBe("435144820");
  });
});
