const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const authService = {
  async register({email, password, role}) {

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error('EMAIL_ALREADY_EXISTS');
    }

    if (role === 'ADMIN') {
        throw new Error('FORBIDDEN_ROLE');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await userRepository.create({ 
        email, 
        password: hashedPassword, 
        role: role || 'USER',
    });

    return { id: newUser.id, email: newUser.email, role: newUser.role };
  },
    
  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const accesToken = jwt.sign(
        { userId: user.id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { userId: user.id }, 
        process.env.JWT_REFRESH_SECRET, 
        { expiresIn: '7d' }
    );

    await userRepository.update(user.id, { refreshToken });

    return { accesToken, refreshToken };
  },

  async refreshToken(token) {
    if (!token) throw new Error('TOKEN_REQUIRED');

    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await userRepository.findById(decoded.userId);
      
      if (!user || user.refreshToken !== token) {
        throw new Error('INVALID_REFRESH_TOKEN');
      }

      const newAccessToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
        );

      return { accesToken: newAccessToken };
    } catch (error) {
      if (error.message === 'INVALID_REFRESH_TOKEN') throw error;
      throw new Error('TOKEN_EXPIRED_OR_INVALID');
    }
  },  
  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('USER_NOT_FOUND');
    
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) throw new Error('INVALID_OLD_PASSWORD');

    const hashedNew = await bcrypt.hash(newPassword, 12);
    await userRepository.update(user.id, { password: hashedNew });

    return { message: 'Password berhasil diubah.' };
  },
};

module.exports = authService;