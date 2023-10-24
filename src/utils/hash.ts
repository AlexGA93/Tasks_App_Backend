import bcrypt from 'bcryptjs';

export const hashPasswordFunction = async (psswd: string, salt: number): Promise<string> => {
    const generatedSalt = await bcrypt.genSalt(salt);
    return bcrypt.hashSync(psswd, generatedSalt);
}

export const comparePasswords = async (loginPass: string, storedPass: string): Promise<boolean> => {
    return bcrypt.compareSync(loginPass, storedPass);
};