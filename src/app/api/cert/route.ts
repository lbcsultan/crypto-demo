import { NextResponse } from 'next/server'

import forge from 'node-forge'

const rsa = forge.pki.rsa
const pki = forge.pki

const caCertPem = process.env.CA_CERT
const caPrivateKeyPem = process.env.CA_PRIVATE
const caCert = pki.certificateFromPem(caCertPem as string)
const caPrivateKey = pki.privateKeyFromPem(caPrivateKeyPem as string)

export async function POST(request: any) {
  const { serial, cn, country, state, locality, org, orgUnit, publicKeyPem } =
    await request.json()
  const publicKey = pki.publicKeyFromPem(publicKeyPem)

  let cert = forge.pki.createCertificate()
  cert.publicKey = publicKey
  cert.serialNumber = serial
  cert.validity.notBefore = new Date()
  cert.validity.notAfter = new Date()
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)
  var userAttrs = [
    {
      shortName: 'CN',
      value: cn,
    },
    {
      shortName: 'C',
      value: country,
    },
    {
      shortName: 'ST',
      value: state,
    },
    {
      shortName: 'L',
      value: locality,
    },
    {
      shortName: 'O',
      value: org,
    },
    {
      shortName: 'OU',
      value: orgUnit,
    },
  ]
  cert.setSubject(userAttrs)

  var caAttrs = [
    {
      shortName: 'CN',
      value: caCert.subject.getField('CN').value,
    },
    {
      shortName: 'C',
      value: caCert.subject.getField('C').value,
    },
    {
      shortName: 'ST',
      value: caCert.subject.getField('ST').value,
    },
    {
      shortName: 'L',
      value: caCert.subject.getField('L').value,
    },
    {
      shortName: 'O',
      value: caCert.subject.getField('O').value,
    },
    {
      shortName: 'OU',
      value: caCert.subject.getField('OU').value,
    },
  ]
  cert.setIssuer(caAttrs)

  cert.setExtensions([
    {
      name: 'basicConstraints',
      cA: true,
    },
    {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true,
    },
    {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true,
    },
    {
      name: 'nsCertType',
      client: true,
      server: true,
      email: true,
      objsign: true,
      sslCA: true,
      emailCA: true,
      objCA: true,
    },
    {
      name: 'subjectAltName',
      altNames: [
        {
          type: 6, // URI
          value: 'http://example.org/webid#me',
        },
        {
          type: 7, // IP
          ip: '127.0.0.1',
        },
      ],
    },
    {
      name: 'subjectKeyIdentifier',
    },
  ])

  // self-sign certificate
  cert.sign(caPrivateKey)

  let certPem = forge.pki.certificateToPem(cert)
  let caCertPem = forge.pki.certificateToPem(caCert)

  let result = caCert.verify(cert)
  console.log('Verification: ', result)

  return NextResponse.json({ certPem, caCertPem }, { status: 200 })
}
