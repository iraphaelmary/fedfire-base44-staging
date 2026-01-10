import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Headquarters Address',
    details: ['Federal Fire Service Headquarters', 'Central Business District', 'Abuja, FCT, Nigeria'],
  },
  {
    icon: Phone,
    title: 'Phone Numbers',
    details: ['Emergency: 112', 'Office: +234-xxx-xxx-xxxx', 'Hotline: +234-xxx-xxx-xxxx'],
  },
  {
    icon: Mail,
    title: 'Email Addresses',
    details: ['info@fedfire.gov.ng', 'complaints@fedfire.gov.ng', 'media@fedfire.gov.ng'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Emergency: 24/7'],
  },
];

const stateCommands = [
  { state: 'FCT Abuja', phone: '+234-xxx-xxx-xxxx' },
  { state: 'Lagos', phone: '+234-xxx-xxx-xxxx' },
  { state: 'Kano', phone: '+234-xxx-xxx-xxxx' },
  { state: 'Rivers', phone: '+234-xxx-xxx-xxxx' },
  { state: 'Kaduna', phone: '+234-xxx-xxx-xxxx' },
  { state: 'Enugu', phone: '+234-xxx-xxx-xxxx' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data) => base44.entities.ContactMessage.create(data),
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')`
          }}
        >
          <div className="absolute inset-0 bg-[#1E3A5F]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Get in touch with the Federal Fire Service. We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-[#C41E3A] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <AlertTriangle className="w-8 h-8 text-white" />
            <p className="text-white text-lg font-semibold">
              For fire emergencies, call <span className="text-2xl font-bold">112</span> immediately!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-[#C41E3A]/10 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-[#C41E3A]" />
                </div>
                <h3 className="font-bold text-[#1E3A5F] mb-3">{info.title}</h3>
                <ul className="space-y-1">
                  {info.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-gray-600 text-sm">{detail}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600">
                    Thank you for contacting us. We will get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="mt-6"
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Message subject"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      placeholder="How can we help you?"
                      rows={5}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-[#C41E3A] hover:bg-[#A01830] w-full md:w-auto"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">Our Location</h2>
              <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center mb-8">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#C41E3A] mx-auto mb-2" />
                  <p className="text-gray-600">Federal Fire Service Headquarters</p>
                  <p className="text-gray-600">Central Business District, Abuja</p>
                </div>
              </div>

              {/* State Commands Quick Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-[#1E3A5F] mb-4">State Command Contacts</h3>
                <div className="grid grid-cols-2 gap-3">
                  {stateCommands.map((cmd) => (
                    <div key={cmd.state} className="flex items-center gap-2 text-sm">
                      <Phone className="w-3 h-3 text-[#C41E3A]" />
                      <span className="text-gray-600">
                        <strong>{cmd.state}:</strong> {cmd.phone}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}