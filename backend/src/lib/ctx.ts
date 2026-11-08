import {PrismaClient} from '@prisma/client'


export const createAppContext = () => {
  const prisma = new PrismaClient()
  
  return {
    prisma: prisma,
    stop: async () => {
      await prisma.$disconnect()
    }
  }
}

export type AppContext = ReturnType<typeof createAppContext>