const fs = require('fs');
const https = require('https');

const urls = {
  sam: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_%28cropped_3%29.jpg/250px-Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_%28cropped_3%29.jpg",
  mark: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Mark_Zuckerberg_in_September_2025_%28cropped%29.jpg/250px-Mark_Zuckerberg_in_September_2025_%28cropped%29.jpg",
  xi: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Xi_Jinping_meets_Keir_Starmer_Jan_2026_%28cropped%29.jpg/250px-Xi_Jinping_meets_Keir_Starmer_Jan_2026_%28cropped%29.jpg"
};

function fetchAsBase64(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return resolve(fetchAsBase64(res.headers.location));
            }
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const contentType = res.headers['content-type'] || 'image/jpeg';
                resolve(`data:${contentType};base64,${buffer.toString('base64')}`);
            });
        }).on('error', reject);
    });
}

async function replaceImages() {
  let content = fs.readFileSync('src/components/SlideEstadoLLM.vue', 'utf8');
  
  const samRegex = /<img src="data:image\/jpeg;base64,[^"]*".*?Sam Altman/s;
  const markRegex = /<img src="data:image\/jpeg;base64,[^"]*".*?Mark Zuckerberg/s;
  const xiRegex = /<img src="data:image\/jpeg;base64,[^"]*".*?China<\/p>/s;

  const samB64 = await fetchAsBase64(urls.sam);
  const markB64 = await fetchAsBase64(urls.mark);
  const xiB64 = await fetchAsBase64(urls.xi);

  content = content.replace(/<img src="data:image\/jpeg;base64,[^"]*"([^>]*?)Sam Altman/s, `<img src="${samB64}"$1Sam Altman`);
  content = content.replace(/<img src="data:image\/jpeg;base64,[^"]*"([^>]*?)Mark Zuckerberg/s, `<img src="${markB64}"$1Mark Zuckerberg`);
  content = content.replace(/<img src="data:image\/jpeg;base64,[^"]*"([^>]*?)China<\/p>/s, `<img src="${xiB64}"$1China</p>`);

  fs.writeFileSync('src/components/SlideEstadoLLM.vue', content);
  console.log('Images replaced!');
}

replaceImages();
