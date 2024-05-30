import prisma from '@/lib/prismadb'
import { getCerts } from '@/lib/user'

interface CertificateData {
  id: string
  certificate: string
  ownerEmail: string
}

export default async function CertUsersPage() {
  const certificates = await prisma.certificate.findMany()
  // const certificates = await getCerts()

  return (
    <div>
      <div className="mx-auto max-w-screen-lg">
        <h1 className="text-3xl mb-8 font-bold">
          Certified users (인증서를 발급받은 사용자)
        </h1>

        {certificates.map((cert) => (
          <div key={cert.id} className="mt-4 bg-yellow-100 p-2">
            <p className="font-bold">{cert.ownerEmail}</p>
            <p>{cert.certificate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
