import prisma from '@/lib/prismadb'

interface CertificateData {
  id: string
  certificate: string
  ownerEmail: string
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    return user
  } catch (error) {
    return null
  }
}

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    return null
  }
}

export const getCerts = async () => {
  try {
    const certificates = await prisma.certificate.findMany()
    return certificates
  } catch (error) {
    return null
  }
}
