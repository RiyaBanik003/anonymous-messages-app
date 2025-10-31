'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/message.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <main className="flex-grow min-h-screen flex flex-col items-center justify-center px-4 md:px-12 py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-white bg-clip-text text-transparent drop-shadow-md">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-4 text-base md:text-md text-gray-300 max-w-xl mx-auto">
            Share and receive honest feedback — where your identity stays hidden, 
            and your voice truly matters.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="bg-gray-900 hover:opacity-60 transition-all shadow-lg text-white font-semibold px-6 py-5 rounded-xl"
            >
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="w-full max-w-3xl">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-gray-200">
            See What Others Are Saying 
          </h2>

          <Carousel
            plugins={[Autoplay({ delay: 2500 })]}
            className="w-full"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-3">
                  <Card className="bg-gray-900/60 border border-gray-700 hover:border-purple-500/60 transition-all rounded-2xl shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">
                        {message.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-start space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-600/20 rounded-full">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-gray-300">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {message.received}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center mt-4 gap-4">
              <CarouselPrevious className="border-gray-600 hover:border-purple-400 text-gray-300" />
              <CarouselNext className="border-gray-600 hover:border-purple-400 text-gray-300" />
            </div>
          </Carousel>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 bg-black text-gray-400 border-t border-gray-800">
        <p>
          © 2025 <span className="text-white font-semibold">True Feedback</span> · 
          Built with 🤍 using Next.js & Resend
        </p>
      </footer>
    </>
  );
}
