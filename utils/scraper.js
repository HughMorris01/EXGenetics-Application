let cachedSignatureCount = 0;
let lastScrapedTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
const PETITION_URL = 'https://c.org/HrGp2jzv8B';

export const getSignatureCount = async () => {
  const now = Date.now();
  if (now - lastScrapedTime < CACHE_DURATION && cachedSignatureCount > 0) {
    return cachedSignatureCount;
  }

  try {
    const response = await fetch(PETITION_URL, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
      }
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const html = await response.text();
    const match = html.match(/"signatureCount":\s*(\d+)/) || 
                  html.match(/"signatureCount":\{"total":(\d+)/) ||
                  html.match(/<strong>([\d,]+)<\/strong>\s*signatures/i);
    
    if (match && match[1]) {
      cachedSignatureCount = parseInt(match[1].replace(/,/g, ''), 10);
      lastScrapedTime = now;
      console.log(`Successfully scraped new signature count: ${cachedSignatureCount}`);
    }
  } catch (err) {
    console.error('Error fetching signature count:', err.message);
  }
  
  return cachedSignatureCount;
};
