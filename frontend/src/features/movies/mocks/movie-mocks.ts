import { Movie, MovieDetails } from '../types/movie-types'

export const movieMocks: Movie[] = [
  {
    id: 'tt7130300',
    primaryTitle: 'The Woman in Cabin 10',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNDY0YmEyNDMtNTQ0Yi00MWVmLWFiYjMtODM5NmUzZWQ5MDMxXkEyXkFqcGc@._V1_.jpg',
    genres: ['Drama', 'Mystery', 'Thriller'],
    rating: {
      aggregateRating: 5.9,
      voteCount: 37350,
    },
  },
  {
    id: 'tt13207736',
    primaryTitle: 'Monster',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BZGY2OTcxYWItZDgxNi00Y2E1LTk0YTgtZDcwZjZkNzU4OTJjXkEyXkFqcGc@._V1_.jpg',

    genres: ['Biography', 'Crime', 'Drama', 'Thriller'],
    rating: {
      aggregateRating: 7.8,
      voteCount: 211080,
    },
  },
  {
    id: 'tt30144839',
    primaryTitle: 'One Battle After Another',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BMzBkZmQ0NjMtNTZlMy00ZjdlLTg5ODUtYWFlNGM0YzE3MTg0XkEyXkFqcGc@._V1_.jpg',

    genres: ['Action', 'Crime', 'Drama', 'Thriller'],
    rating: {
      aggregateRating: 8.2,
      voteCount: 120710,
    },
  },
  {
    id: 'tt27987047',
    primaryTitle: 'Boots',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNjQ5ODViMGItMTFmMy00Y2NiLTk4NDYtMGY3ZWFhNDZiODM2XkEyXkFqcGc@._V1_.jpg',

    genres: ['Comedy', 'Drama', 'History', 'War'],
    rating: {
      aggregateRating: 8,
      voteCount: 11466,
    },
  },
  {
    id: 'tt28013708',
    primaryTitle: 'Task',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BMmM4ZDUxNDctNjg0ZS00NWM4LTk4YzctYzAzZDJhMzRiYzE5XkEyXkFqcGc@._V1_.jpg',

    genres: ['Crime', 'Drama'],
    rating: {
      aggregateRating: 8,
      voteCount: 27818,
    },
  },
  {
    id: 'tt29644189',
    primaryTitle: 'Black Phone 2',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTVjMzNmZGYtOWU5NS00NDYzLThhZTktZGNlODIwYWVhMDRmXkEyXkFqcGc@._V1_.jpg',

    genres: ['Horror'],
    rating: {
      aggregateRating: 6.6,
      voteCount: 12824,
    },
  },
  {
    id: 'tt17491088',
    primaryTitle: 'The Diplomat',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNWRlNGE3MjAtMGQ2NC00NGNiLWFiM2QtYjRlNmQ1MmI2ZjhiXkEyXkFqcGc@._V1_.jpg',

    genres: ['Drama', 'Thriller'],
    rating: {
      aggregateRating: 8,
      voteCount: 87075,
    },
  },
  {
    id: 'tt6604188',
    primaryTitle: 'Tron: Ares',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BYzk0NjE4NzYtZjc5Ni00MTkxLTgyY2QtZjliOTA5N2U2YzM1XkEyXkFqcGc@._V1_.jpg',

    genres: ['Action', 'Adventure', 'Sci-Fi'],
    rating: {
      aggregateRating: 6.7,
      voteCount: 27565,
    },
  },
  {
    id: 'tt0121955',
    primaryTitle: 'South Park',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNTBlMzA3ZTUtODZjNi00NTM0LWExMjMtNjJhYzA3YTkwMWYwXkEyXkFqcGc@._V1_.jpg',

    genres: ['Animation', 'Comedy'],
    rating: {
      aggregateRating: 8.7,
      voteCount: 434457,
    },
  },
  {
    id: 'tt26862142',
    primaryTitle: 'The Last Frontier',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BMmU1ZDg2MmEtNDY1OC00MDA1LWI3YTAtYzI0NGI4MTg1OTRkXkEyXkFqcGc@._V1_.jpg',

    genres: ['Action', 'Drama', 'Thriller'],
    rating: {
      aggregateRating: 7,
      voteCount: 3348,
    },
  },
  {
    id: 'tt32246771',
    primaryTitle: 'Bring Her Back',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BZTlhYTk1ZTEtOWY3NC00NWQ5LTlkOTctNjQ3ZDYyZGE5ZWNlXkEyXkFqcGc@._V1_.jpg',

    genres: ['Horror', 'Mystery'],
    rating: {
      aggregateRating: 7.2,
      voteCount: 86541,
    },
  },
  {
    id: 'tt14205554',
    primaryTitle: 'KPop Demon Hunters',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNTBiYWJlMjQtOTIyMy00NTY4LWFhOWItOWZhNzc3NGMyMjc2XkEyXkFqcGc@._V1_.jpg',

    genres: [
      'Animation',
      'Action',
      'Adventure',
      'Comedy',
      'Family',
      'Fantasy',
      'Music',
      'Musical',
    ],
    rating: {
      aggregateRating: 7.6,
      voteCount: 90411,
    },
  },
  {
    id: 'tt31449991',
    primaryTitle: 'Chad Powers',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BODU0MGFiNTgtZWNiNy00MTkwLWExMjYtYzE1ODJmNTQ1OTU1XkEyXkFqcGc@._V1_.jpg',

    genres: ['Comedy', 'Sport'],
    rating: {
      aggregateRating: 7.5,
      voteCount: 3916,
    },
  },
  {
    id: 'tt1493274',
    primaryTitle: 'Caught Stealing',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BYTk0YTIyYmMtMTJjOC00NmNiLTkxMTktYTU0ZDFhNjJlMTJiXkEyXkFqcGc@._V1_.jpg',

    genres: ['Comedy', 'Crime', 'Thriller'],
    rating: {
      aggregateRating: 7,
      voteCount: 39155,
    },
  },
  {
    id: 'tt19244304',
    primaryTitle: 'It: Welcome to Derry',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BZWE0ZWM1MjUtNmYzYS00NzU3LTkxYmQtNmI3NTc0ZTY1NmVlXkEyXkFqcGc@._V1_.jpg',

    genres: ['Horror'],
    rating: {
      aggregateRating: 0,
      voteCount: 0,
    },
  },
  {
    id: 'tt33550053',
    primaryTitle: '9-1-1: Nashville',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BMTAzNjNmOWEtYTE1OC00MmJkLTkzYjktNTgxMzY5NWQyYmJkXkEyXkFqcGc@._V1_.jpg',

    genres: ['Action', 'Drama'],
    rating: {
      aggregateRating: 5.2,
      voteCount: 1321,
    },
  },
  {
    id: 'tt31193180',
    primaryTitle: 'Sinners',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg',

    genres: ['Action', 'Drama', 'Horror', 'Music', 'Thriller'],
    rating: {
      aggregateRating: 7.6,
      voteCount: 298863,
    },
  },
  {
    id: 'tt0413573',
    primaryTitle: "Grey's Anatomy",
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BYTVjNWVhYTctMGJkMS00NWFjLWE2N2QtNmQ1Y2FhZDFkNzUwXkEyXkFqcGc@._V1_.jpg',

    genres: ['Drama', 'Romance'],
    rating: {
      aggregateRating: 7.6,
      voteCount: 366771,
    },
  },
  {
    id: 'tt12300742',
    primaryTitle: 'Bugonia',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNzIzNWQxMjEtZmQ3MS00OTk2LWFlZjktZDUyYWRkM2M3NWVlXkEyXkFqcGc@._V1_.jpg',

    genres: ['Comedy', 'Crime', 'Sci-Fi'],
    rating: {
      aggregateRating: 7.5,
      voteCount: 3585,
    },
  },
  {
    id: 'tt32376165',
    primaryTitle: 'A House of Dynamite',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNjAzMjQ4YTUtOGI1Yy00YTFkLTlkMDQtMDEwOWNjYmE3MTU1XkEyXkFqcGc@._V1_.jpg',

    genres: ['Drama', 'Thriller'],
    rating: {
      aggregateRating: 6.8,
      voteCount: 17181,
    },
  },
  {
    id: 'tt26743210',
    primaryTitle: 'How to Train Your Dragon',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BODA5Y2M0NjctNWQzMy00ODRhLWE0MzUtYmE1YTAzZjYyYmQyXkEyXkFqcGc@._V1_.jpg',

    genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Family', 'Fantasy'],
    rating: {
      aggregateRating: 7.8,
      voteCount: 103748,
    },
  },
  {
    id: 'tt11214558',
    primaryTitle: 'The Smashing Machine',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BOWYxZTM1ZGMtMjg5MC00NzcyLTk0ZTEtZWI0ZThkNDJiYjZmXkEyXkFqcGc@._V1_.jpg',

    genres: ['Action', 'Biography', 'Drama', 'History', 'Sport'],
    rating: {
      aggregateRating: 6.7,
      voteCount: 36620,
    },
  },
  {
    id: 'tt3402138',
    primaryTitle: 'The Naked Gun',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNGFlNDhkNzItZjgxNC00OGYzLWFjZDAtZTJmNDY5ZmEyZDc0XkEyXkFqcGc@._V1_.jpg',

    genres: ['Action', 'Comedy', 'Crime'],
    rating: {
      aggregateRating: 6.4,
      voteCount: 81655,
    },
  },
  {
    id: 'tt32315888',
    primaryTitle: 'Riot Women',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BMmJkYjRmNzQtMWJhNC00Y2VkLWI5ZTYtOTVmZjZkZGQwZmVmXkEyXkFqcGc@._V1_.jpg',

    genres: ['Drama'],
    rating: {
      aggregateRating: 8.7,
      voteCount: 1120,
    },
  },
  {
    id: 'tt13623632',
    primaryTitle: 'Alien: Earth',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BOGIyNGRiNzgtOWQxZC00YzJmLThlZTYtYTMyMDk0YWZjMTk5XkEyXkFqcGc@._V1_.jpg',

    genres: ['Horror', 'Sci-Fi', 'Thriller'],
    rating: {
      aggregateRating: 7.2,
      voteCount: 80900,
    },
  },
  {
    id: 'tt13964560',
    primaryTitle: 'The Astronaut',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BZGRlMDA5NGYtOWNmYy00YWI3LWFlMzMtYjlhMTkxZmI1NDRjXkEyXkFqcGc@._V1_.jpg',

    genres: ['Horror', 'Sci-Fi', 'Thriller'],
    rating: {
      aggregateRating: 4.7,
      voteCount: 2225,
    },
  },
  {
    id: 'tt32549601',
    primaryTitle: 'Caramelo',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNTRlMzI4MDItZDJiNS00YmNmLWE1MmQtNjZjYTVhNDdmYjQ1XkEyXkFqcGc@._V1_.jpg',

    genres: ['Comedy', 'Drama', 'Family'],
    rating: {
      aggregateRating: 7.2,
      voteCount: 4613,
    },
  },
  {
    id: 'tt0107120',
    primaryTitle: 'Hocus Pocus',
    primaryImageUrl:
      'https://m.media-amazon.com/images/M/MV5BYWRhOThjM2UtNmRhMi00YzFiLWI4MDYtOGQwNGY0ZjFlOGFkXkEyXkFqcGc@._V1_.jpg',

    genres: ['Comedy', 'Family', 'Fantasy'],
    rating: {
      aggregateRating: 6.9,
      voteCount: 168710,
    },
  },
]

export const movieMock: MovieDetails = {
  id: 'tt32549601',
  primaryTitle: 'Caramelo',
  originalTitle: 'Caramelo',
  primaryImageUrl:
    'https://m.media-amazon.com/images/M/MV5BNTRlMzI4MDItZDJiNS00YmNmLWE1MmQtNjZjYTVhNDdmYjQ1XkEyXkFqcGc@._V1_.jpg',
  secondaryImageUrl:
    'https://m.media-amazon.com/images/M/MV5BNTRlMzI4MDItZDJiNS00YmNmLWE1MmQtNjZjYTVhNDdmYjQ1XkEyXkFqcGc@._V1_.jpg',
  plot: 'After a life-changing diagnosis, a promising chef finds hope and humor with the help of a fur-midable dog friend.',
  effectPhrase: 'A promise of hope and humor',
  releaseDate: '2025-10-26',
  classification: '13',
  situation: 'Released',
  language: {
    id: 1,
    code: 'PT',
    name: 'Português',
  },
  runtimeSeconds: 6060,
  genres: [
    { id: 1, name: 'Comedy' },
    { id: 2, name: 'Drama' },
    { id: 3, name: 'Family' },
  ],
  rating: {
    aggregateRating: 7.2,
    voteCount: 4671,
  },
  budget: 122234223.0,
  revenue: 2123.0,
  profit: 56454556465.0,
  trailerUrl: 'https://www.youtube.com/watch?v=wVqwoGwmR_I',
}
