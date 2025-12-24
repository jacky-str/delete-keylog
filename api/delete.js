import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('[ERROR] Method tidak diizinkan')
  }

  const { webhook } = req.body

  if (!webhook || !webhook.startsWith('https://discord.com/api/webhooks/')) {
    return res.status(400).send('[ERROR] Webhook tidak valid')
  }

  try {
    await axios.delete(webhook)
    res.send('[SUCCESS] Webhook berhasil dihapus')
  } catch (err) {
    res.status(500).send('[ERROR] Gagal menghapus webhook')
  }
}
