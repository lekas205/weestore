import { S3Client, PutObjectCommand, type PutObjectCommandInput } from '@aws-sdk/client-s3'

const bucket = new S3Client({
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY,
  },
  region: import.meta.env.VITE_AWS_S3_REGION,
})

export function formatAsMoney(amount: number, currency = true): string {
  try {
    const formattedAmount = new Intl.NumberFormat().format(amount)
    return currency ? `₦${formattedAmount}` : formattedAmount
  } catch (error) {
    console.log(error)
    return currency ? `0.00` : `0`
  }
}

export const formatDate = (date?: Date) => {
  const d = new Date(date || Date.now())
  return d.toLocaleString(['en-Us'], {
    weekday: 'long',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export async function handleFileUpload(files: File[]): Promise<string[] | null> {
  const urls: string[] = []

  try {
    const uploadPayloads: PutObjectCommandInput[] = []
    files.forEach(async (file) => {
      const timestampprefix = new Date().getTime()
      const folder = import.meta.env.DEV ? 'morebuy/' : ''
      const Key = `${folder}${timestampprefix}_${file.name.trim().split(' ').join('_')}`
      uploadPayloads.push({
        Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
        Key,
        Body: file,
        ContentType: file.type,
        ContentLength: file.size,
      })
    })

    for (const payload of uploadPayloads) {
      const command = new PutObjectCommand(payload)
      try {
        await bucket.send(command)
        urls.push(`https://fajo-bc.s3.amazonaws.com/${payload.Key}`)
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error)
    return null
  }

  return urls
}
