'use client';

import { useState } from 'react';
import { Footer } from './components/home/Footer';
import { Header } from './components/home/Header';
import { Hero } from './components/home/Hero';
import { InfoSection } from './components/home/InfoSection';
import { ResultSection } from './components/home/ResultSection';
import { SearchSection } from './components/home/SearchSection';
import { ResultState, TinRecord } from './components/home/types';

// TIN validation: must be exactly 12 digits
function isValidTIN(tin: string): boolean {
  return /^\d{12}$/.test(tin.trim());
}

export default function Home() {
  const [tin, setTin] = useState('');
  const [result, setResult] = useState<ResultState>('idle');
  const [match, setMatch] = useState<TinRecord | null>(null);
  const [suggestions, setSuggestions] = useState<TinRecord[]>([]);

  async function runExactCheck(trimmedTin: string) {
    setResult('loading');
    const res = await fetch(`/api/search?tin=${trimmedTin}`);
    const data = await res.json();
    setMatch(data.match ?? null);
    setResult(data.found ? 'found' : 'not-found');
  }

  async function handleTinChange(value: string) {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 12);
    setTin(digitsOnly);
    setResult('idle');
    setMatch(null);

    if (!digitsOnly) {
      setSuggestions([]);
      return;
    }

    if (digitsOnly.length === 12 && isValidTIN(digitsOnly)) {
      await runExactCheck(digitsOnly);
      setSuggestions([]);
      return;
    }

    const res = await fetch(`/api/search?q=${digitsOnly}`);
    const data = await res.json();
    setSuggestions(data.suggestions ?? []);
  }

  return (
    <main className="main">
      <Header />
      <p className="hero__badge" aria-label="Data source: Official NBR data, 72,196 returns">
        ● Official NBR data · 72,196 returns
      </p>
      <Hero />
      <SearchSection
        tin={tin}
        result={result}
        suggestions={suggestions}
        onTinChange={(value) => void handleTinChange(value)}
        onSuggestionSelect={(item) => {
          setTin(item.tin);
          setSuggestions([]);
          void runExactCheck(item.tin);
        }}
      />
      <ResultSection result={result} tin={tin} match={match} />
      <InfoSection />
      <Footer />

    </main>
  );
}