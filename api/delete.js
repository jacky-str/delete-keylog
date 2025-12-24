import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed')
  }

  const { webhook, secret } = req.body

  // 🔒 Pengaman
  if (secret !== process.env.SECRET_KEY) {
    return res.status(401).send('❌ Secret key salah')
  }

  // 🔍 Validasi webhook Discord
  if (!webhook?.startsWith('https://discord.com/api/webhooks/')) {
    return res.status(400).send('❌ Webhook tidak valid')
  }

  try {
    await axios.delete(webhook)
    res.send('✅ Webhook berhasil dihapus')
  } catch {
    res.status(500).send('❌ Gagal menghapus webhook')
  }
}
