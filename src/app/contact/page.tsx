'use client';

import { useState, ChangeEvent, FormEvent } from 'react'
import { useLanguage } from "@/contexts/language-context";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const { t } = useLanguage();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(t('sending'))

    try {
      // Ici tu appelleras une API pour envoyer le message (ex: /api/contact)
      // Simulons un délai
      await new Promise((r) => setTimeout(r, 1000))
      setStatus(t('messageSent'))
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus(t('sendError'))
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{t('contactUs')}</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-xl p-8 border border-gray-100">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold">
            {t('name')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder={t('yourName')}
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            {t('email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder={t('yourEmail')}
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 font-semibold">
            {t('message')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder={t('yourMessage')}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          {t('send')}
        </button>

        {status && <p className="mt-4 text-gray-700">{status}</p>}
      </form>

      <section className="mt-12 text-gray-700 bg-gray-50 rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-2">{t('contactInfo')}</h2>
        <p>Email : <a href="mailto:support@docsimplify.com" className="text-blue-600">support@docsimplify.com</a></p>
        <p>{t('phone')} : +212 600 000 000</p>
        <p>{t('address')} : Casablanca, Maroc</p>
      </section>
    </main>
  )
} 