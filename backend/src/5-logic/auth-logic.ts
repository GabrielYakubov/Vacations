import { generateToken } from "../2-utils/jwtAuth";
import dal from "../2-utils/dal";
import User from "../4-models/User";
import { compareHash, hash } from "../2-utils/bcrypt";
import Credentials from "../4-models/Credentials";
import { UnauthorizedError, ValidationError, Error } from "../4-models/Error";

export const register = async (user: User): Promise<string> => {
  const error = user.validate();
  if (error) throw new ValidationError(error);

  const { password, firstName, lastName, email } = user;

  const isTaken = await isEmailTaken(email);
  if (isTaken) throw new ValidationError(`Email ${email} already taken`);

  try {
    const hashedPass = await hash(password);

    //prepared statements
    const sql = "INSERT INTO users VALUES(DEFAULT,?,?,?,?,DEFAULT)";

    await dal.execute(sql, [firstName, lastName, email, hashedPass]);

    return generateToken(user);
  } catch (err: any) {
    throw new Error(err, 500);
  }
};

export const login = async (credentials: Credentials): Promise<string> => {
  const error = credentials.validate();
  if (error) throw new ValidationError(error);

  try {
    const sql = "SELECT * FROM users WHERE email = ?";

    const users = await dal.execute<User[]>(sql, [credentials.email]);
    if (users.length === 0)
      throw new UnauthorizedError("Email does not exist.");

    const user = users[0];
    const match = await compareHash(credentials.password, user.password);
    if (!match) {
      throw new UnauthorizedError("Incorrect email or password");
    }

    // return generateToken(user);
    return generateToken(user);
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message, 500);
  }
};

async function isEmailTaken(email: string): Promise<boolean> {
  const sql = "SELECT * FROM users;";
  const result = await dal.execute<User[]>(sql, [email]);

  if (result.some((user) => user.email === email)) {
    throw new ValidationError(`Email ${email} already taken`);
  }
  return false;
}
