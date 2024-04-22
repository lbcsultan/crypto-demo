'use client'

import React, { useState } from 'react'
import { File } from '../../types'
import computeHash from '@/lib/computeHash'

const FileHashPage: React.FC = () => {
  const algorithms = ['md5', 'sha1', 'sha256', 'sha384', 'sha512']

  const [algorithm, setAlgorithm] = useState('sha256')
  const [file, setFile] = useState<File | null>(null)
  const [hash, setHash] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const calculateHash = async () => {
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = async () => {
      const inputText = reader.result as string
      const result = computeHash(algorithm, inputText)
      setHash(result as string)
    }
    reader.readAsText(file as any)
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="mb-4">
        <h1 className="text-3xl mb-4 font-bold">파일 해시값 계산</h1>
        <input type="file" onChange={handleFileChange} />
      </div>

      <h2 className="mb-2 font-bold">
        Select Hash Algorithm (default to sha256)
      </h2>
      {algorithms.map((algo) => (
        <div key={algo} className="mx-4 ">
          <input
            name="algo"
            className="p-2 outline-none focus:ring-0"
            type="radio"
            id={algo}
            value={algorithm}
            onChange={(e) => setAlgorithm(algo)}
          />
          <label className="p-2" htmlFor={algo}>
            {algo}
          </label>
        </div>
      ))}

      <button
        onClick={calculateHash}
        className="bg-red-100 px-2 py-1 rounded-md mt-4 mb-4"
      >
        해시값 계산
      </button>
      <br />
      {hash && <div>해시값: {hash}</div>}
    </div>
  )
}

export default FileHashPage
