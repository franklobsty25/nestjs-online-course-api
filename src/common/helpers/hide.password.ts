import { UserSerializer } from 'src/user/serialization/user.serialize';

export function excludeUserPassword(user: any): UserSerializer {
  const serializeUser: UserSerializer = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    organization: user.organization,
    phoneNumber: user.phoneNumber,
    email: user.email,
    isDeleted: user.isDeleted,
    isActive: user.isActive,
  };

  return serializeUser;
}
