import { UserSerializer } from 'src/user/serialization/user.serialize';

export function excludeUserPassword(user: any): UserSerializer {
  const serializeUser: UserSerializer = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    organization: user.organization,
    phoneNumber: user.phoneNumber,
    email: user.email,
    emailVerification: user.emailVerification,
    isDeleted: user.isDeleted,
    isActive: user.isActive,
    role: user.role,
  };

  return serializeUser;
}
