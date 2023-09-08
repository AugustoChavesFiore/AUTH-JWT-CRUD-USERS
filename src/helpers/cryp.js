import bcrypt from 'bcrypt';

export const hash=async (string)=>{
    return await bcrypt.hash(string, 10);
}

export const matchCompare=async (string, hash)=>{
    return await bcrypt.compare(string, hash);
}