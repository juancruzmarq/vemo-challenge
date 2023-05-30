import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { URL_API } from 'src/constants';
import { Paises } from 'src/interfaces/pais.response';
const prisma = new PrismaClient();

async function getPaises() {
  const response = await axios.get<Paises>(URL_API);
  const paises = response.data;
  return paises;
}

async function main() {
  
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@admin.com',
      name: 'admin',
      surname: 'admin',
      password: await hashedPassword('asd123'),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('seeding done');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
