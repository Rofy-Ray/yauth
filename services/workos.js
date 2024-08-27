require('dotenv').config();
const WorkOS = require('@workos-inc/node').WorkOS;

const workos = new WorkOS(process.env.WORKOS_API_KEY);

module.exports.createUser = async (userData) => {
  try {
    const createUserPayload = {};

    if ('email' in userData) createUserPayload.email = userData.email;
    if ('password' in userData) createUserPayload.password = userData.password;
    if ('firstName' in userData) createUserPayload.firstName = userData.firstName;
    if ('lastName' in userData) createUserPayload.lastName = userData.lastName;

    return await workos.userManagement.createUser(createUserPayload);
  } catch (error) {
    throw error;
  }
};

module.exports.updateUser = async (userId, updateData) => {
  try {
    const updatePayload = {
      userId: userId, 
    };

    if ('email' in updateData) updatePayload.email = updateData.email;
    if ('password' in updateData) updatePayload.password = updateData.password;
    if ('firstName' in updateData) updatePayload.firstName = updateData.firstName;
    if ('lastName' in updateData) updatePayload.lastName = updateData.lastName;
    if ('emailVerified' in updateData) updatePayload.emailVerified = updateData.emailVerified;

    return await workos.userManagement.updateUser(updatePayload);
  } catch (error) {
    throw error;
  }
};

module.exports.deleteUser = async (userId) => {
  try {
    return await workos.userManagement.deleteUser({
      userId
    });
  } catch (error) {
    throw error;
  }
};

module.exports.listUsers = async (email) => {
    const filter = email ? { email } : {};
    try {
      const users = await workos.userManagement.listUsers({
        filter,
        limit: 1
      });
      return users.data;
    } catch (error) {
        throw error;
    }
};

module.exports.authenticateUser = async (clientId, email, password) => {
  try {
    return await workos.userManagement.authenticateWithPassword({
      clientId,
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.sendVerificationEmail = async (userId) => {
    try {
        return await workos.userManagement.sendVerificationEmail({ userId });
    } catch (error) {
        throw error;
    }
};

module.exports.verifyEmail = async (userId, code) => {
  try {
    return await workos.userManagement.verifyEmail({ userId, code });
  } catch (error) {
    throw error;
  }
};

module.exports.sendPasswordResetEmail = async (email) => {
  try {
    return await workos.userManagement.createPasswordReset({
      email,
      passwordResetUrl: `http://localhost:3000/reset-password?email=${email}`,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.resetPassword = async (token, newPassword) => {
  try {
    return await workos.userManagement.resetPassword({ token, newPassword });
  } catch (error) {
    throw error;
  }
};

module.exports.getJwksUrl = async (clientId) => {
    try {    
    return await workos.userManagement.getJwksUrl(clientId);
    } catch (error) {
    throw error;
  }
};

module.exports.signOut = async (sessionId) => {
    try {    
    return await workos.userManagement.getLogoutUrl({
      sessionId
    });
    } catch (error) {
    throw error;
  }
};