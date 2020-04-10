interface skillObject {
  title: string;
  experience: number;
}

interface CreateUserData {
  name?: string;
  email: string;
  password: string;
  // Vetor de string
  techs: string[];
  // Vetor misto
  skills: Array<string | skillObject>
}

export default function createUser({ name, email, password, techs, skills }: CreateUserData) {
  const user = {
    name,
    email,
    password,
    techs,
    skills
  }

  return user;
};