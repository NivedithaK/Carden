import crypto from 'crypto';

export const getCardLink = (id) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(id, salt, 10000, 512, 'sha512').toString('hex');
    return hash;
}