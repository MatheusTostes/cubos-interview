import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário de teste
  const hashedPassword = await bcrypt.hash('password123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'test@example.com',
      name: 'testuser',
      password: hashedPassword,
    },
  })

  // Criar situações
  const situations = await Promise.all([
    prisma.situation.upsert({
      where: { name: 'Lançado' },
      update: {},
      create: { name: 'Lançado' },
    }),
    prisma.situation.upsert({
      where: { name: 'Em Breve' },
      update: {},
      create: { name: 'Em Breve' },
    }),
    prisma.situation.upsert({
      where: { name: 'Em Produção' },
      update: {},
      create: { name: 'Em Produção' },
    }),
    prisma.situation.upsert({
      where: { name: 'Pós-Produção' },
      update: {},
      create: { name: 'Pós-Produção' },
    }),
    prisma.situation.upsert({
      where: { name: 'Cancelado' },
      update: {},
      create: { name: 'Cancelado' },
    }),
    prisma.situation.upsert({
      where: { name: 'Pausado' },
      update: {},
      create: { name: 'Pausado' },
    }),
  ])

  // Criar classificações
  const classifications = await Promise.all([
    prisma.classification.upsert({
      where: { name: 'Livre' },
      update: {},
      create: { name: 'Livre', age: 0 },
    }),
    prisma.classification.upsert({
      where: { name: '10+' },
      update: {},
      create: { name: '10+', age: 10 },
    }),
    prisma.classification.upsert({
      where: { name: '12+' },
      update: {},
      create: { name: '12+', age: 12 },
    }),
    prisma.classification.upsert({
      where: { name: '14+' },
      update: {},
      create: { name: '14+', age: 14 },
    }),
    prisma.classification.upsert({
      where: { name: '16+' },
      update: {},
      create: { name: '16+', age: 16 },
    }),
    prisma.classification.upsert({
      where: { name: '18+' },
      update: {},
      create: { name: '18+', age: 18 },
    }),
  ])

  // Criar idiomas
  const languages = await Promise.all([
    prisma.language.upsert({
      where: { code: 'pt' },
      update: {},
      create: { code: 'pt', name: 'Português' },
    }),
    prisma.language.upsert({
      where: { code: 'en' },
      update: {},
      create: { code: 'en', name: 'English' },
    }),
    prisma.language.upsert({
      where: { code: 'es' },
      update: {},
      create: { code: 'es', name: 'Español' },
    }),
    prisma.language.upsert({
      where: { code: 'fr' },
      update: {},
      create: { code: 'fr', name: 'Français' },
    }),
  ])

  // Criar gêneros em lotes para evitar muitas conexões simultâneas
  const genreNames = [
    'Ação',
    'Aventura',
    'Comédia',
    'Drama',
    'Ficção Científica',
    'Terror',
    'Romance',
    'Suspense',
    'Animação',
    'Fantasia',
    'Documentário',
    'Musical',
    'Crime',
    'Mistério',
    'Guerra',
    'Western',
  ]

  const genres = []
  for (const name of genreNames) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    genres.push(genre)
  }

  const publicBucket = 'https://pub-9ebfed913b894a9480d9ad399ae4d639.r2.dev'

  // Criar alguns filmes de exemplo
  const movies = [
    {
      primaryTitle: 'Matrix',
      originalTitle: 'The Matrix',
      primaryImageUrl: `${publicBucket}/matrix.jpg`,
      secondaryImageUrl: `${publicBucket}/matrix.jpg`,
      plot: 'Um hacker descobre a verdade sobre a realidade e lidera uma rebelião contra as máquinas.',
      subTitle: 'Bem-vindo ao deserto do real',
      releaseDate: new Date('1999-03-31'),
      runtimeSeconds: 8160, // 136 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=Wg7V2_OBXwQ',
      budget: 63000000,
      revenue: 467200000,
      aggregateRating: 8.7,
      voteCount: 1850000,
      classificationId: classifications.find((c) => c.name === '14+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Ação', 'Ficção Científica'],
      languages: ['en', 'pt'],
    },
    {
      primaryTitle: 'A Origem',
      originalTitle: 'Inception',
      primaryImageUrl: `${publicBucket}/a-origem.jpg`,
      secondaryImageUrl: `${publicBucket}/a-origem.jpg`,
      plot: 'Um ladrão especializado em roubar segredos do subconsciente entra nas mentes das pessoas.',
      subTitle: 'Sua mente é a cena do crime',
      releaseDate: new Date('2010-07-16'),
      runtimeSeconds: 8880, // 148 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=R_VX0e0PX90',
      budget: 160000000,
      revenue: 836800000,
      aggregateRating: 8.8,
      voteCount: 2300000,
      classificationId: classifications.find((c) => c.name === '14+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Ação', 'Ficção Científica'],
      languages: ['en', 'pt', 'es'],
    },
    {
      primaryTitle: 'Interestelar',
      originalTitle: 'Interstellar',
      primaryImageUrl: `${publicBucket}/interstellar.png`,
      secondaryImageUrl: `${publicBucket}/interstellar.png`,
      plot: 'Exploradores viajam através de um buraco de minhoca no espaço para garantir a sobrevivência da humanidade.',
      subTitle:
        'A humanidade nasceu na Terra, mas não foi feita para morrer aqui',
      releaseDate: new Date('2014-11-07'),
      runtimeSeconds: 10140, // 169 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=i6avfCqKcQo',
      budget: 165000000,
      revenue: 677400000,
      aggregateRating: 8.6,
      voteCount: 1900000,
      classificationId: classifications.find((c) => c.name === '10+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Aventura', 'Drama', 'Ficção Científica'],
      languages: ['en', 'pt'],
    },
    {
      primaryTitle: 'O Poderoso Chefão',
      originalTitle: 'The Godfather',
      primaryImageUrl: `${publicBucket}/o-poderoso-chefao.webp`,
      secondaryImageUrl: `${publicBucket}/o-poderoso-chefao.webp`,
      plot: 'O patriarca envelhecido de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
      subTitle: 'Uma oferta que você não pode recusar',
      releaseDate: new Date('1972-03-24'),
      runtimeSeconds: 10500, // 175 minutos
      trailerUrl: 'https://youtube.com/godfather',
      budget: 6000000,
      revenue: 250000000,
      aggregateRating: 9.2,
      voteCount: 1800000,
      classificationId: classifications.find((c) => c.name === '16+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Crime', 'Drama'],
      languages: ['en', 'pt'],
    },
    {
      primaryTitle: 'Parasita',
      originalTitle: 'Parasite',
      primaryImageUrl: `${publicBucket}/parasite.jpg`,
      secondaryImageUrl: `${publicBucket}/parasite.jpg`,
      plot: 'Toda a família de Ki-taek está desempregada, vivendo em um porão sujo e apertado, mas uma obra do acaso faz com que o filho consiga um emprego.',
      subTitle: 'Aja como se você pertencesse',
      releaseDate: new Date('2019-05-30'),
      runtimeSeconds: 7920, // 132 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=m4jfE-TxC24',
      budget: 11400000,
      revenue: 258800000,
      aggregateRating: 8.5,
      voteCount: 850000,
      classificationId: classifications.find((c) => c.name === '16+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Drama', 'Suspense', 'Comédia'],
      languages: ['pt', 'es'],
    },
    {
      primaryTitle: 'Coringa',
      originalTitle: 'Joker',
      primaryImageUrl: `${publicBucket}/coringa.webp`,
      secondaryImageUrl: `${publicBucket}/coringa.webp`,
      plot: 'Arthur Fleck trabalha como palhaço para uma agência de talentos e luta para se firmar como comediante, mas descobre que o palco é o crime.',
      subTitle: 'Coloque um sorriso nesse rosto',
      releaseDate: new Date('2019-10-04'),
      runtimeSeconds: 7320, // 122 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=exeVIM3j3y0',
      budget: 55000000,
      revenue: 1074000000,
      aggregateRating: 8.4,
      voteCount: 1300000,
      classificationId: classifications.find((c) => c.name === '18+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Crime', 'Drama', 'Suspense'],
      languages: ['en', 'pt', 'es'],
    },
    {
      primaryTitle: 'Vingadores: Ultimato',
      originalTitle: 'Avengers: Endgame',
      primaryImageUrl: `${publicBucket}/avengers-ultimato.jpg`,
      secondaryImageUrl: `${publicBucket}/avengers-ultimato.jpg`,
      plot: 'Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos.',
      subTitle: 'Parte da jornada é o fim',
      releaseDate: new Date('2019-04-26'),
      runtimeSeconds: 10860, // 181 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=4QRdB4RAQMs',
      budget: 356000000,
      revenue: 2798000000,
      aggregateRating: 8.4,
      voteCount: 1150000,
      classificationId: classifications.find((c) => c.name === '12+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Ação', 'Aventura', 'Ficção Científica'],
      languages: ['en', 'pt', 'es', 'fr'],
    },
    {
      primaryTitle: 'Cidade de Deus',
      originalTitle: 'City of God',
      primaryImageUrl: `${publicBucket}/cidade-de-deus.jpg`,
      secondaryImageUrl: `${publicBucket}/cidade-de-deus.jpg`,
      plot: 'Buscapé é um jovem pobre que cresce em um universo de muita violência. Ele vive na Cidade de Deus, favela carioca conhecida por ser um dos locais mais violentos do Rio.',
      subTitle: 'Lute por você, ou morra tentando',
      releaseDate: new Date('2002-08-30'),
      runtimeSeconds: 7800, // 130 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=fZJUKixyeXM',
      budget: 3300000,
      revenue: 30600000,
      aggregateRating: 8.6,
      voteCount: 770000,
      classificationId: classifications.find((c) => c.name === '18+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Crime', 'Drama'],
      languages: ['pt', 'en', 'es'],
    },
    {
      primaryTitle: 'Procurando Nemo',
      originalTitle: 'Finding Nemo',
      primaryImageUrl: `${publicBucket}/procurando-nemo.webp`,
      secondaryImageUrl: `${publicBucket}/procurando-nemo.webp`,
      plot: 'Um peixe-palhaço superprotetor embarca em uma jornada pelo oceano para encontrar seu filho sequestrado.',
      subTitle: 'Continue nadando',
      releaseDate: new Date('2003-05-30'),
      runtimeSeconds: 6000, // 100 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=lJhvtAt_1Nk',
      budget: 94000000,
      revenue: 940300000,
      aggregateRating: 8.2,
      voteCount: 1050000,
      classificationId: classifications.find((c) => c.name === 'Livre')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Animação', 'Aventura', 'Comédia'],
      languages: ['en', 'pt', 'es', 'fr'],
    },
    {
      primaryTitle: 'O Senhor dos Anéis: A Sociedade do Anel',
      originalTitle: 'The Lord of the Rings: The Fellowship of the Ring',
      primaryImageUrl: `${publicBucket}/lotr.jpg`,
      secondaryImageUrl: `${publicBucket}/lotr.jpg`,
      plot: 'Um anel que foi dado ao jovem hobbit Frodo Bolseiro tem uma história conectada ao Senhor das Trevas, Sauron.',
      subTitle: 'Um anel para a todos governar',
      releaseDate: new Date('2001-12-19'),
      runtimeSeconds: 10680, // 178 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=0i86oM1nHjM',
      budget: 93000000,
      revenue: 871500000,
      aggregateRating: 8.8,
      voteCount: 1900000,
      classificationId: classifications.find((c) => c.name === '12+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Aventura', 'Fantasia', 'Drama'],
      languages: ['en', 'pt', 'es', 'fr'],
    },
    {
      primaryTitle: 'Duna',
      originalTitle: 'Dune',
      primaryImageUrl: `${publicBucket}/dune.jpeg`,
      secondaryImageUrl: `${publicBucket}/dune.jpeg`,
      plot: 'Paul Atreides é um jovem brilhante, dotado de dons além da compreensão humana e que deve viajar para o planeta mais perigoso do universo.',
      subTitle: 'O sonho é real',
      releaseDate: new Date('2021-10-22'),
      runtimeSeconds: 9360, // 156 minutos
      trailerUrl: 'https://www.youtube.com/watch?v=dnBpZuSUISQ',
      budget: 165000000,
      revenue: 402000000,
      aggregateRating: 8.0,
      voteCount: 680000,
      classificationId: classifications.find((c) => c.name === '12+')!.id,
      situationId: situations.find((s) => s.name === 'Lançado')!.id,
      genres: ['Ficção Científica', 'Aventura', 'Drama'],
      languages: ['en', 'pt', 'es', 'fr'],
    },
  ]

  for (const movieData of movies) {
    const {
      genres: movieGenres,
      languages: movieLanguages,
      ...movieInfo
    } = movieData

    const profit = movieInfo.revenue - movieInfo.budget

    // Pegar o primeiro idioma da lista ou english por padrão
    const defaultLanguage = languages.find((l) => l.code === 'en')!
    const finalLanguageId =
      movieLanguages && movieLanguages.length > 0
        ? languages.find((l) => l.code === movieLanguages[0])!.id
        : defaultLanguage.id

    const movie = await prisma.movie.create({
      data: {
        ...movieInfo,
        profit,
        languageId: finalLanguageId,
        userId: user.id,
        genres: {
          create: movieGenres.map((genreName) => {
            const genre = genres.find((g) => g.name === genreName)
            return {
              genre: { connect: { id: genre!.id } },
            }
          }),
        },
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
